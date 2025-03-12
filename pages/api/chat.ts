// pages/api/chat.ts (for Next.js)
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'system', content: 'You are AuntyAI, a kind and wise mentor.' }, { role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0]?.message?.content || "I'm here for you!" });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
