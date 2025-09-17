import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'signups.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    let signups = [];
    
    // Read existing signups if file exists
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      signups = JSON.parse(data);
    }

    // Check if email already exists
    if (signups.find((signup: any) => signup.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Add new signup
    signups.push({
      email,
      timestamp: new Date().toISOString(),
    });

    // Write back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(signups, null, 2));

    res.status(200).json({ success: true, message: 'Email registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}