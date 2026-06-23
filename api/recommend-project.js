// api/recommend-project.js
// User ki requirement ke hisab se relevant projects suggest karta hai
// Frontend se projects ka data bhi aata hai (Vercel serverless mein cross-folder import safe nahi hota)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { requirement, projectSummaries } = req.body;

  if (!requirement || requirement.trim().length < 5) {
    return res.status(400).json({ error: 'Please describe what you need (at least 5 characters)' });
  }

  if (!projectSummaries || !Array.isArray(projectSummaries)) {
    return res.status(400).json({ error: 'Project data missing' });
  }

  const prompt = `A potential client described what they need. Based on this list of past projects, recommend the 2-3 MOST relevant ones and explain briefly why each fits.

CLIENT NEEDS:
"${requirement}"

AVAILABLE PROJECTS:
${JSON.stringify(projectSummaries)}

Respond ONLY in this exact JSON format, no markdown, no extra text:
{
  "recommendations": [
    {"slug": "<project slug from the list>", "reason": "<1 sentence why this fits their need>"}
  ],
  "summary": "<1-2 sentence friendly intro to the recommendations>"
}

Only recommend slugs that exist in the provided list. If nothing fits well, return an empty recommendations array and explain in summary.`;

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
        temperature: 0.4,
        max_tokens: 500,
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
    console.error('Recommend error:', error);
    return res.status(500).json({ error: 'Failed to get recommendations. Please try again.' });
  }
}