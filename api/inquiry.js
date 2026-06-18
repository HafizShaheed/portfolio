// api/inquiry.js
// Client ka project inquiry form submit hone par email bhejta hai

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { name, email, projectType, budget, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  try {
    // Resend API ko call karo
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Inquiry <onboarding@resend.dev>', // Resend ka default sender
        to: ['shaheedkhan336@gmail.com'], // Aapki email - yahan aayegi
        reply_to: email, // Aap reply karenge toh seedha client ko jayega
        subject: `New Project Inquiry from ${name}`,
        html: `
          <h2>New Project Inquiry 🎉</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Inquiry error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}