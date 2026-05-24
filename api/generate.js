export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ error: "Use POST from frontend" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ result: "Missing OPENAI_API_KEY" });
    }

    const { idea } = req.body || {};

    if (!idea) {
      return res.status(400).json({ result: "No idea provided" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Ești expert TikTok viral. Dai HOOK + SCRIPT + TWIST scurt."
          },
          {
            role: "user",
            content: idea
          }
        ],
        temperature: 0.9
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        result: "OpenAI error: " + JSON.stringify(data)
      });
    }

    const result = data.choices?.[0]?.message?.content;

    return res.status(200).json({ result });

  } catch (err) {
    return res.status(500).json({
      result: "Server crash: " + err.message
    });
  }
}
