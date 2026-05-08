const apiKey = "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";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messageType, notes, language, messageTypeLabel } = req.body;

  const prompt = `You are a luxury hotel brand copywriter for Click Clack Hotels (Medellín, Bogotá).

BRAND DNA:
- Tone: Curious, vanguardist, daring, with double meanings
- Style: Sophisticated yet playful, fresh but elegant
- Approach: Focus on experiences, not services
- Personality: Unapologetic, creative, inviting wandering minds

Examples: "Match the mood, vibe with your room" / "Extraordinary things happen to those who look for them"

TASK: Generate 3 SHORT copy options for a handwritten card message.
Message Type: ${messageTypeLabel}
Language: ${language === 'es' ? 'Spanish' : 'English'}
${notes ? `Details: ${notes}` : ''}

CONSTRAINTS:
- Length: 20-40 words
- Plain text only
- Maintain Click Clack tone

Return ONLY 3 options numbered 1, 2, 3.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    return res.status(200).json({ success: true, content: data.content[0].text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
