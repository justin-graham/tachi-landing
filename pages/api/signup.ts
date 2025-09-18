import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    // Check if email already exists
    const existingEmail = await kv.get(`signup:${email}`);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Store email with timestamp
    const signupData = {
      email,
      timestamp: new Date().toISOString(),
    };

    await kv.set(`signup:${email}`, signupData);
    
    // Also add to a list for easy retrieval
    await kv.lpush('signups:all', email);

    res.status(200).json({ success: true, message: 'Email registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}