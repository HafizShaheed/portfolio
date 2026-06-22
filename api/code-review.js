// api/code-review.js
// User ka code snippet leke AI se review karwata hai

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { code, language } = req.body;

  if (!code || code.trim().length < 10) {
    return res.status(400).json({ error: 'Please paste a valid code snippet (at least 10 characters)' });
  }

  // Bahut bada code allow nahi karte - cost aur abuse prevent karne ke liye
  if (code.length > 3000) {
    return res.status(400).json({ error: 'Code too long. Please paste a smaller snippet (max 3000 characters)' });
  }

  const prompt = `You are Hafiz Shaheed, a senior Full Stack Developer with 4+ years experience in Laravel, React.js, and Node.js. Review this ${language || 'code'} snippet the way you'd review a teammate's pull request — direct, practical, focused on real issues.

CODE TO REVIEW:
\`\`\`
${code}
\`\`\`

Respond ONLY in this exact JSON format, no markdown, no extra text:
{
  "overallRating": "<one of: Excellent, Good, Needs Improvement, Has Issues>",
  "issues": [
    {"severity": "<high|medium|low>", "title": "<short issue title>", "description": "<1-2 sentence explanation>"}
  ],
  "goodPractices": ["<thing done well, if any>"],
  "summary": "<2-3 sentence overall verdict in a friendly, professional tone>"
}

If the code has no real issues, return an empty issues array and praise it in goodPractices. Be honest, not overly harsh or overly nice.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 700,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq error:', data);
      return res.status(500).json({ error: 'AI service error' });
    }

    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/```json|```/g, '').trim();

    const result = JSON.parse(raw);
    return res.status(200).json(result);

  } catch (error) {
    console.error('Code review error:', error);
    return res.status(500).json({ error: 'Failed to analyze code. Please try again.' });
  }
}