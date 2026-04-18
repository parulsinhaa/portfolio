export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 300,
        messages
      })
    });

    const data = await response.json();

    const reply = data.content?.[0]?.text || "No response";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "AI temporarily unavailable" });
  }
}
