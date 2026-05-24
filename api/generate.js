export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { idea } = req.body || {};

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Ești expert în TikTok viral content. Generează HOOK + SCRIPT + TWIST scurt."
          },
          {
            role: "user",
            content: idea || "Dă-mi o idee virală"
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: data
      });
    }

    return res.status(200).json({
      result: data.choices?.[0]?.message?.content
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
