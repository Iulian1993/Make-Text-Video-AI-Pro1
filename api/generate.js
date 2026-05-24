export default async function handler(req, res) {
  try {
    const key = process.env.OPENAI_API_KEY;

    if (!key) {
      return res.status(200).json({
        error: "NO API KEY IN VERCEL"
      });
    }

    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        "Authorization": Bearer ${key}
      }
    });

    const data = await response.json();

    return res.status(200).json({
      status: response.status,
      models: data
    });

  } catch (err) {
    return res.status(500).json({
      crash: err.message
    });
  }
}
