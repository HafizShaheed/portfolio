// api/chat.js
// Yeh function Vercel par automatically backend endpoint ban jata hai
// URL: https://yoursite.vercel.app/api/chat

export default async function handler(req, res) {
  // Step 1: Sirf POST request allow karo (security)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  // Step 2: User ka message nikalo jo frontend se aaya
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  // Step 3: Hafiz ka resume data - AI ko context dene ke liye
  const resumeContext = `
You are an AI assistant representing Hafiz Shaheed Ul Islam, a Full Stack Developer.
Answer questions about him professionally and concisely based ONLY on this information:

PROFESSIONAL SUMMARY:
Full Stack Developer with 4+ years experience in Laravel, React.js, Node.js. 
Specialized in REST APIs, multi-tenant SaaS systems, ERP/CRM platforms, database optimization.
Based in Karachi, Pakistan. Open to Remote, Hybrid, Full-Time, Part-Time, Contract.
Immediate joiner.

TECHNICAL SKILLS:
Frontend: React.js, Next.js, Nuxt.js, JavaScript ES6+, HTML5, CSS3, Tailwind CSS
Backend: Laravel, PHP OOP/MVC, Node.js, Express.js
Database: MySQL, MongoDB, PostgreSQL, Oracle
APIs: REST API, Stripe, PayPal integration
DevOps: AWS (EC2, S3, RDS), Docker, CI/CD, cPanel
Tools: Git, GitHub, Postman, VS Code, Jira

EXPERIENCE:
1. Senior Full Stack Developer at Hamdard University (May 2024-Present)
   - Built nationwide Q-Bank system for 500+ users
   - Built ERP modules (HR, Payroll, Finance), improved efficiency by 40%
   - JWT auth, RBAC with 100+ roles

2. Full Stack Developer at Kdys Lab (Aug 2023-May 2024)
   - Built eCommerce/CRM systems, 1000+ records daily
   - Stripe/PayPal integration

3. PHP Laravel Developer at Midline Presence (Apr 2022-Aug 2023)
   - REST APIs for web/mobile apps
   - AWS infrastructure management

4. Junior Laravel Developer at DivsnPixel (Oct 2021-Apr 2022)

KEY PROJECTS: ERP Systems, SaaS Dashboards, eCommerce platforms, CRM systems, 
DevBook (room booking), iScreening (background verification), 28+ total projects.

EDUCATION: BS Computer Science (2022), ACCP-Pro Software Engineering (2018)

CONTACT: shaheedkhan336@gmail.com, +92 341 2427229
LinkedIn: linkedin.com/in/hafiz-shaheed-b17796141
GitHub: github.com/HafizShaheed

Rules:
- Keep answers SHORT (2-4 sentences max)
- Be professional but friendly
- If asked something not in this data, say you don't have that info and suggest contacting Hafiz directly
- Never make up information
`;

  try {
    // Step 4: Groq ko API call karo
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Secret key environment variable se aati hai - kabhi expose nahi hoti
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Free, fast Groq model
        messages: [
          { role: 'system', content: resumeContext },
          { role: 'user', content: message },
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    // Step 5: Agar Groq se error aaya
    if (!response.ok) {
      console.error('Groq error:', data);
      return res.status(500).json({ error: 'AI service error' });
    }

    // Step 6: AI ka jawab nikalo aur frontend ko bhejo
    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}