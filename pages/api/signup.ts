import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Try to use Vercel KV if available, fallback to file storage for local dev
let kv: any = null;
try {
  kv = require('@vercel/kv').kv;
} catch (e) {
  // KV not available
}

const DATA_FILE = path.join(process.cwd(), 'signups.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    // Check if we're in production with Vercel KV
    const hasKvCredentials = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
    
    if (kv && hasKvCredentials) {
      // Use Vercel KV in production
      const existingEmail = await kv.get(`signup:${email}`);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const signupData = {
        email,
        timestamp: new Date().toISOString(),
      };

      await kv.set(`signup:${email}`, signupData);
      await kv.lpush('signups:all', email);
    } else {
      // Use file storage for local development
      let signups = [];
      
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        signups = JSON.parse(data);
      }

      if (signups.find((signup: any) => signup.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      signups.push({
        email,
        timestamp: new Date().toISOString(),
      });

      fs.writeFileSync(DATA_FILE, JSON.stringify(signups, null, 2));
    }

    res.status(200).json({ success: true, message: 'Email registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}