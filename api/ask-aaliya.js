export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt, mode } = req.body;

  if (!prompt || !mode) {
    return res.status(400).json({ error: 'Missing prompt or mode in request body.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key missing from environment variables.' });
  }

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are Ask Aaliya, a soft, intuitive, feminine AI assistant. Your current mode is "${mode}". Respond with clarity, warmth, and wisdom based on this tone.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return res.status(openaiResponse.status).json({
        error: data?.error?.message || 'OpenAI API error occurred.',
      });
    }

    const reply = data.choices?.[0]?.message?.content || 'No reply received.';
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Ask Aaliya API error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
