export default async function handler(req, res) {
  try {
    const { message, history } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 300,
        messages: [
          ...history,
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.content?.[0]?.text || "No response"
    });

  } catch (err) {
    res.status(500).json({
      reply: "AI temporarily unavailable"
    });
  }
}
