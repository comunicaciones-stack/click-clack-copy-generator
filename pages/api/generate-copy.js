export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messageType, notes, language, messageTypeLabel } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return res.status(500).json({ error: 'API key not configured. Please check Environment Variables in Vercel.' });
  }

  const prompt = `You are a luxury hotel brand copywriter for Click Clack Hotels (Medellín, Bogotá). 

BRAND DNA:
- Tone: Curious, vanguardist, daring, with double meanings
- Style: Sophisticated yet playful, fresh but elegant
- Approach: Focus on experiences, not services. Use poetic language with conversational flair
- Personality: Unapologetic, creative, inviting wandering minds
- Key Traits: ASSERTIVE (confidently approachable), POSITIVE (always sees potential), CURIOUS (explores the unknown), VANGUARDIST (breaks conventions), ERUDITE (cultured, thoughtful)

Examples of Click Clack tone:
- "Match the mood, vibe with your room"
- "Extraordinary things happen to those who look for them"
- "There's a place where no boredom can be found"
- "From bath-tub to bar-hop: there are plenty of ways to refresh yourself behind our doors"
- "Let the middle of the week taste the sweet of the weekend!"

TASK: Generate 3 SHORT, DISTINCT copy options for a handwritten card message.
Message Type: ${messageTypeLabel}
Language: ${language === 'es' ? 'Spanish' : 'English'}
${notes ? `Additional context/details: ${notes}` : ''}

CONSTRAINTS:
- Length: 20-40 words (short paragraph, handwriteable)
- Format: Plain text only, NO formatting, NO logos, NO bullet points, NO emojis
- Style: Maintain Click Clack's vanguardist, sophisticated, playful tone
- Each option should feel DIFFERENT but equally on-brand
- Each option must be SHORT and suitable for writing by hand on a physical card

Return ONLY the 3 options, numbered 1, 2, 3. Each on its own line. NO explanations, NO meta-commentary, NO additional text.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey.trim(),
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Failed to generate copy' });
    }

    const content = data.content[0].text;
    return res.status(200).json({ success: true, content });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}
