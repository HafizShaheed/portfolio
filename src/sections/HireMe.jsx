// src/sections/HireMe.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const packages = [
  {
    name: 'Basic',
    price: '$50 - $150',
    desc: 'Quick fixes, small features, or bug resolution',
    features: ['Bug fixes', 'Small feature addition', 'Code review', '1-3 days delivery'],
    icon: 'ti-bolt',
  },
  {
    name: 'Standard',
    price: '$200 - $500',
    desc: 'Complete module or feature with API integration',
    features: ['Full module (auth, CRUD, dashboard)', 'API integration', 'Database design', '1-2 weeks delivery'],
    icon: 'ti-stack-2',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$500+',
    desc: 'End-to-end web application development',
    features: ['Full-stack application', 'Custom architecture', 'Deployment & hosting setup', 'Ongoing support available'],
    icon: 'ti-rocket',
  },
]

export default function HireMe({ theme: t }) {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, sending, success, error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setStatus('success')
        setForm({ name: '', email: '', projectType: '', budget: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="hire-me" style={{ padding: '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        07 — Hire Me
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Let's Build Something Together
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: '32px', maxWidth: '550px', lineHeight: 1.7 }}>
        Available for freelance projects — from quick fixes to complete applications. Choose a package or send a custom inquiry.
      </p>

      {/* Pricing packages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {packages.map((pkg) => (
          <div key={pkg.name} style={{
            background: t.card,
            border: `0.5px solid ${pkg.popular ? t.accent : t.cardBorder}`,
            borderRadius: '12px', padding: '22px',
            position: 'relative',
          }}>
            {pkg.popular && (
              <div style={{ position: 'absolute', top: '-10px', right: '20px', background: t.accent, color: t.bg, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '10px', fontFamily: 'monospace' }}>
                POPULAR
              </div>
            )}
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.accent, fontSize: '20px', marginBottom: '14px' }}>
              <i className={`ti ${pkg.icon}`} aria-hidden="true" />
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: t.text, marginBottom: '4px' }}>{pkg.name}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: t.accent, marginBottom: '10px', fontFamily: 'monospace' }}>{pkg.price}</div>
            <p style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.6, marginBottom: '16px' }}>{pkg.desc}</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pkg.features.map((f, i) => (
                <li key={i} style={{ fontSize: '12px', color: t.textSub, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <i className="ti ti-check" style={{ color: t.accent, fontSize: '14px', marginTop: '1px' }} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Inquiry form */}
      <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: '14px', padding: '28px', maxWidth: '600px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: t.text, marginBottom: '18px' }}>
          Send a Project Inquiry
        </h3>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '30px 0' }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
            <p style={{ color: t.green, fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Message sent successfully!</p>
            <p style={{ color: t.textSub, fontSize: '13px' }}>I'll get back to you within 24 hours.</p>
            <button onClick={() => setStatus('idle')} style={{ marginTop: '16px', background: 'transparent', border: `0.5px solid ${t.cardBorder}`, color: t.textSub, padding: '8px 18px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input
                name="name" value={form.name} onChange={handleChange}
                placeholder="Your name" required
                style={inputStyle(t)}
              />
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="Your email" required
                style={inputStyle(t)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <select name="projectType" value={form.projectType} onChange={handleChange} style={inputStyle(t)}>
                <option value="">Project type</option>
                <option value="Bug fix / Small task">Bug fix / Small task</option>
                <option value="Full module">Full module</option>
                <option value="Complete web app">Complete web app</option>
                <option value="Ongoing/Long-term">Ongoing / Long-term</option>
              </select>
              <select name="budget" value={form.budget} onChange={handleChange} style={inputStyle(t)}>
                <option value="">Budget range</option>
                <option value="$50-150">$50 - $150</option>
                <option value="$150-500">$150 - $500</option>
                <option value="$500-1000">$500 - $1000</option>
                <option value="$1000+">$1000+</option>
              </select>
            </div>

            <textarea
              name="message" value={form.message} onChange={handleChange}
              placeholder="Tell me about your project..." required
              style={{ ...inputStyle(t), minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                background: t.btnBg, color: '#fff', border: 'none',
                padding: '12px 24px', borderRadius: '7px', fontSize: '13px',
                fontWeight: 500, cursor: status === 'sending' ? 'default' : 'pointer',
                opacity: status === 'sending' ? 0.6 : 1,
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
            </button>

            {status === 'error' && (
              <p style={{ color: '#F87171', fontSize: '12px' }}>Something went wrong. Please try again or email directly.</p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

function inputStyle(t) {
  return {
    padding: '10px 14px', borderRadius: '8px',
    border: `0.5px solid ${t.cardBorder}`, background: t.bg,
    color: t.text, fontSize: '13px', outline: 'none',
  }
}