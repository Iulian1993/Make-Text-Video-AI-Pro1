export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ error: "Use POST" });
  }

  try {
    const { idea } = req.body || {};

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: "Generează un script TikTok viral: " + (idea || "idee virală")
      })
    });

    const data = await response.json();

    return res.status(200).json({
      result: data.output_text || "Fără răspuns"
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
