export default async function handler(req, res) {
  try {
    return res.status(200).json({
      step: "1-ok-function-runs"
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message
    });
  }
}
