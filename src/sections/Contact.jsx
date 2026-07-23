


// src/sections/Contact.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import VisitorStats from '../components/VisitorStats'

const contacts = [
  { label: 'Email', value: 'shaheedkhan336@gmail.com', icon: 'ti-mail', href: 'mailto:shaheedkhan336@gmail.com', color: '#6366f1' },
  { label: 'Phone', value: '+92 307 2241918', icon: 'ti-phone', href: 'https://wa.me/923072241918', color: '#22c55e' },
  { label: 'Phone', value: '+92 341 2427229', icon: 'ti-phone', href: 'https://wa.me/923412427229', color: '#22c55e' },
  { label: 'Location', value: 'Karachi, Pakistan', icon: 'ti-map-pin', href: '#', color: '#f59e0b' },
]

const socials = [
  { icon: 'ti-brand-linkedin', href: 'https://linkedin.com/in/hafiz-shaheed-b17796141', label: 'LinkedIn' },
  { icon: 'ti-brand-github', href: 'https://github.com/HafizShaheed', label: 'GitHub' },
  { icon: 'ti-mail', href: 'mailto:shaheedkhan336@gmail.com', label: 'Email' },
  { icon: 'ti-brand-whatsapp', href: 'https://wa.me/923412427229', label: 'WhatsApp' },
]

export default function Contact({ theme: t }) {
  const isMobile = useIsMobile()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, projectType: 'Contact Form', budget: 'N/A' }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" style={{
      padding: isMobile ? '64px 20px' : '100px 40px',
      maxWidth: '1280px', margin: '0 auto',
      borderTop: `0.5px solid ${t.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 600 }}>
          LET'S WORK TOGETHER
        </span>
        <div style={{ flex: 1, height: '0.5px', background: t.border }} />
      </div>

      <h2 style={{
        fontSize: isMobile ? '28px' : '40px', fontWeight: 800,
        letterSpacing: '-0.03em', marginBottom: '12px',
      }}>
        Have a project in mind?
      </h2>
      <p style={{ fontSize: '15px', color: t.textSub, marginBottom: '48px', maxWidth: '500px', lineHeight: 1.7 }}>
        I'm currently available for freelance or full-time opportunities. Let's build something amazing together.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '48px',
      }}>
        {/* Left — Contact info */}
        <div>
          {/* Contact items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
            {contacts.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  textDecoration: 'none', color: 'inherit',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: `${c.color}14`, border: `0.5px solid ${c.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color, fontSize: '18px', flexShrink: 0,
                }}>
                  <i className={`ti ${c.icon}`} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: t.textDim, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace', marginBottom: '2px' }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 500 }}>{c.value}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Socials */}
          <div>
            <div style={{ fontSize: '11px', color: t.textDim, fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '14px' }}>
              CONNECT WITH ME
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  title={s.label}
                  style={{
                    width: '42px', height: '42px', borderRadius: '10px',
                    background: t.card, border: `0.5px solid ${t.cardBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: t.textDim, fontSize: '18px', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = t.accent
                    e.currentTarget.style.color = t.accent
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = t.cardBorder
                    e.currentTarget.style.color = t.textDim
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}>
                  <i className={`ti ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div>
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: t.card, border: `0.5px solid ${t.cardBorder}`,
                borderRadius: '14px', padding: '40px', textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Message Sent!</div>
              <div style={{ fontSize: '14px', color: t.textSub, marginBottom: '20px' }}>I'll get back to you within 24 hours.</div>
              <button onClick={() => setStatus('idle')} style={{
                background: t.accentFade, color: t.accent, border: `0.5px solid ${t.tagBorder}`,
                padding: '10px 24px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
              }}>Send Another</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your Name" required
                style={inputStyle(t)}
              />
              <input
                type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="Your Email" required
                style={inputStyle(t)}
              />
              <textarea
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Your Message" required rows={5}
                style={{ ...inputStyle(t), resize: 'vertical', fontFamily: 'inherit' }}
              />
              <button type="submit" disabled={status === 'sending'} style={{
                background: t.accent, color: '#fff', border: 'none',
                padding: '13px 28px', borderRadius: '8px', fontSize: '14px',
                fontWeight: 600, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '8px',
                opacity: status === 'sending' ? 0.6 : 1, transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = t.btnHover}
              onMouseLeave={e => e.currentTarget.style.background = t.accent}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <i className="ti ti-send" />
              </button>
              {status === 'error' && (
                <p style={{ color: '#f87171', fontSize: '12px' }}>Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '64px', paddingTop: '28px', borderTop: `0.5px solid ${t.border}`,
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
        gap: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '6px',
              background: t.accent, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: 800, fontSize: '11px', color: '#fff',
            }}>HS</div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Hafiz Shaheed</span>
          </div>
          <div style={{ fontSize: '12px', color: t.textDim }}>
            Full Stack Developer · Crafting Scalable Systems. Delivering Real Impact.
          </div>
          <div style={{ fontSize: '11px', color: '#1a1a2e', marginTop: '4px' }}>
            © 2026 Hafiz Shaheed Ul Islam. All rights reserved.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: '8px' }}>
          <VisitorStats theme={t} />
          <div style={{ fontSize: '11px', color: t.textDim, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', background: t.green, borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            Available for new opportunities
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  )
}

function inputStyle(t) {
  return {
    padding: '12px 16px', borderRadius: '8px',
    border: `0.5px solid ${t.cardBorder}`, background: t.card,
    color: '#fff', fontSize: '14px', outline: 'none', width: '100%',
    transition: 'border-color 0.2s', fontFamily: 'inherit',
  }
}
