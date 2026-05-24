export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { idea } = req.body;

  try {
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
            content: "Ești un expert în TikTok viral content. Generează HOOK + SCRIPT + TWIST."
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

    const result = data.choices?.[0]?.message?.content || "Eroare AI";

    res.status(200).json({ result });

  } catch (err) {
    res.status(500).json({ result: "Eroare server" });
  }
}
