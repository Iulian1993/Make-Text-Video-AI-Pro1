export default async function handler(req, res) {
  try {
    console.log("REQ METHOD:", req.method);

    if (req.method !== "POST") {
      return res.status(200).json({ ok: "Use POST" });
    }

    const idea = req.body?.idea;

    if (!idea) {
      return res.status(400).json({
        error: "No idea received",
        body: req.body
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: idea
      })
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      openai: data
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
}
