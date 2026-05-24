export default async function handler(req, res) {
  try {
    console.log("METHOD:", req.method);

    if (req.method !== "POST") {
      return res.status(200).json({ ok: "Use POST" });
    }

    let body = req.body;

    // FIX IMPORTANT: dacă body vine ca string
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const idea = body?.idea || "idee virală";

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
      result: data.output_text || data
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
}
