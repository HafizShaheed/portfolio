// api/match.js
// Job description ko Hafiz ke resume se compare karta hai

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { jobDescription } = req.body;

  if (!jobDescription || jobDescription.trim().length < 20) {
    return res.status(400).json({ error: 'Please provide a valid job description' });
  }

  const resumeData = `
HAFIZ SHAHEED UL ISLAM - Full Stack Developer Resume

SKILLS: Laravel, PHP (OOP/MVC), React.js, Next.js, Nuxt.js, Node.js, Express.js, 
JavaScript ES6+, HTML5, CSS3, Tailwind CSS, MySQL, MongoDB, PostgreSQL, Oracle,
REST API Development, Stripe, PayPal integration, AWS (EC2, S3, RDS), Docker, 
CI/CD Pipelines, cPanel, Git, GitHub, Postman, JWT Authentication, RBAC

EXPERIENCE: 4+ years
- Senior Full Stack Developer at Hamdard University (May 2024-Present): Built Q-Bank system 
  for 500+ users, ERP modules (HR/Payroll/Finance), RBAC with 100+ roles, JWT auth
- Full Stack Developer at Kdys Lab (Aug 2023-May 2024): eCommerce/CRM systems, 
  Stripe/PayPal integration, background job queues, Node.js backend services
- PHP Laravel Developer at Midline Presence (Apr 2022-Aug 2023): REST APIs, 
  AWS infrastructure, SQL optimization
- Junior Laravel Developer at DivsnPixel (Oct 2021-Apr 2022): Backend modules, RBAC

PROJECTS: 28+ projects including ERP systems, SaaS dashboards, multi-tenant platforms,
eCommerce stores, CRM systems, booking platforms, HR systems, chat applications,
background verification systems, logistics platforms

EDUCATION: BS Computer Science (2022), ACCP-Pro Software Engineering (2018)
LOCATION: Karachi, Pakistan. Open to Remote, Hybrid, Onsite, Contract, Full-time, Part-time.
`;

  const prompt = `You are a technical recruiter analyzing job fit. Compare this candidate's resume against the job description below.

CANDIDATE RESUME:
${resumeData}

JOB DESCRIPTION:
${jobDescription}

Respond ONLY in this exact JSON format, no markdown, no extra text:
{
  "matchScore": <number 0-100>,
  "matchingSkills": ["skill1", "skill2", ...],
  "missingSkills": ["skill1", "skill2", ...],
  "summary": "<2-3 sentence honest assessment>"
}`;

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
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq error:', data);
      return res.status(500).json({ error: 'AI service error' });
    }

    let raw = data.choices[0].message.content.trim();
    // Kabhi AI markdown code block mein wrap kar deta hai, usko clean karo
    raw = raw.replace(/```json|```/g, '').trim();

    const result = JSON.parse(raw);
    return res.status(200).json(result);

  } catch (error) {
    console.error('Match error:', error);
    return res.status(500).json({ error: 'Failed to analyze. Please try again.' });
  }
}
