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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const hasKvCredentials = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
    
    if (kv && hasKvCredentials) {
      // Use Vercel KV in production
      const emailList = await kv.lrange('signups:all', 0, -1);
      const signups = [];
      
      for (const email of emailList.reverse()) { // Reverse to show newest first
        const signupData = await kv.get(`signup:${email}`);
        if (signupData) {
          signups.push(signupData);
        }
      }
      
      res.status(200).json({ signups });
    } else {
      // Use file storage for local development
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const signups = JSON.parse(data);
        res.status(200).json({ signups: signups.reverse() }); // Show newest first
      } else {
        res.status(200).json({ signups: [] });
      }
    }
  } catch (error) {
    console.error('Error fetching signups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}