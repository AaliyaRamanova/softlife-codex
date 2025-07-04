// /api/ask-aaliya.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, mode } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are Ask Aaliya, a poetic, grounded, intuitive soft life coach who blends feminine energy and emotional depth. Respond in a clear, soft, feminine tone with practical glow-up wisdom. Current mode: ${mode || 'Creative'}`,
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No reply returned.';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Error contacting OpenAI' });
  }
}
