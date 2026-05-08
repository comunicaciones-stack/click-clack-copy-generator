export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();

  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing' });
  }

  const { messageType, notes, language, messageTypeLabel } = req.body;

  const prompt = `Generate 3 short copy options (20-40 words each) for Click Clack Hotels in ${language === 'es' ? 'Spanish' : 'English'}.
Message type: ${messageTypeLabel}
${notes ? `Details: ${notes}` : ''}

Click Clack tone: sophisticated, playful, vanguardist, experiential.
Return ONLY 3 options numbered 1, 2, 3 on separate lines.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'API error');

    res.status(200).json({ success: true, content: data.content[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
