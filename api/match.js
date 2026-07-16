// api/match.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { jobDescription } = req.body;
  if (!jobDescription || jobDescription.trim().length < 20) {
    return res.status(400).json({ error: 'Please provide a valid job description' });
  }

  const resumeData = `
HAFIZ SHAHEED UL ISLAM — Senior Full Stack Developer

SKILLS:
Frontend: React.js, Next.js, Nuxt.js, Vue.js, JavaScript ES6+, TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap
Backend: Laravel (Expert), PHP OOP/MVC, Node.js, Express.js, CodeIgniter
Database: MySQL, MongoDB, PostgreSQL, Oracle
APIs: REST API, GraphQL, Socket.io, Pusher
Payments: Stripe, PayPal, HelloSign
DevOps: AWS (EC2, S3, RDS), Docker, CI/CD Pipelines, cPanel
Auth: JWT Authentication, RBAC (100+ roles managed)
Tools: Git, GitHub, Postman, VS Code, Jira

EXPERIENCE: 4+ years
1. Senior Full Stack Developer — Hamdard University (May 2024–Present)
   Built Q-Bank system for 500+ users. ERP modules (HR/Payroll/Finance).
   40% efficiency improvement. JWT + RBAC with 100+ roles.

2. Full Stack Developer — Kdys Lab (Aug 2023–May 2024)
   eCommerce & CRM systems, 1000+ daily records.
   Stripe/PayPal integration. Node.js backend services.

3. PHP Laravel Developer — Midline Presence (Apr 2022–Aug 2023)
   REST APIs for web/mobile. AWS infrastructure. SQL optimization.

4. Junior Laravel Developer — DivsnPixel (Oct 2021–Apr 2022)
   Backend modules, REST APIs, student CRM system.

5. Intern/Junior Developer — Connect Marketing Communication (Dec 2019–Sep 2021)
   Laravel & PHP web applications.

PROJECTS: 42+ including ERP, SaaS, multi-tenant platforms, eCommerce, CRM,
booking systems, HR systems, real-time chat apps, medical lab systems, logistics platforms.

EDUCATION:
- BSc Computer Science (2018–2022)
- ACCP Pro Software Engineering (2016–2018)

AVAILABILITY: Remote, Hybrid, Onsite, Contract, Full-time, Part-time. Immediate joiner.
LOCATION: Karachi, Pakistan.
`;

  const prompt = `You are a senior technical recruiter. Analyze how well this candidate matches the job description.

CANDIDATE RESUME:
${resumeData}

JOB DESCRIPTION:
${jobDescription}

Respond ONLY in this exact JSON format, no markdown, no extra text:
{
  "matchScore": <number 0-100>,
  "matchingSkills": ["skill1", "skill2", "skill3"],
  "missingSkills": ["skill1", "skill2"],
  "summary": "<2-3 sentence honest, specific assessment mentioning key strengths and gaps>"
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
    if (!response.ok) return res.status(500).json({ error: 'AI service error' });

    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/```json|```/g, '').trim();

    const result = JSON.parse(raw);
    return res.status(200).json(result);

  } catch (error) {
    console.error('Match error:', error);
    return res.status(500).json({ error: 'Failed to analyze. Please try again.' });
  }
}