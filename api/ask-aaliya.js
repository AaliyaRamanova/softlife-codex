export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt, mode } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key missing' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: `You are AskAaliya, an intuitive, feminine AI with mode: ${mode}.` },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      res.status(response.status).json({ error: data.error || "Something went wrong" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
