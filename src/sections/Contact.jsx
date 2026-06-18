import { useState } from 'react'
import { motion } from 'framer-motion'

const contacts = [
  { label: 'WhatsApp', value: '+92 341 2427229', sub: 'Direct message — fastest response', icon: 'ti-brand-whatsapp', href: 'https://wa.me/923412427229', iconColor: '#25D366', iconBg: 'rgba(37,211,102,0.1)' },
  { label: 'LinkedIn',  value: 'hafiz-shaheed',   sub: 'Connect professionally', icon: 'ti-brand-linkedin', href: 'https://linkedin.com/in/hafiz-shaheed-b17796141', iconColor: '#0A66C2', iconBg: 'rgba(10,102,194,0.12)' },
  { label: 'GitHub',    value: 'HafizShaheed',     sub: 'Check out my code', icon: 'ti-brand-github', href: 'https://github.com/HafizShaheed' },
  { label: 'Alt No.',   value: '+92 307 2241918',  sub: 'WhatsApp / Call', icon: 'ti-phone', href: 'https://wa.me/923072241918' },
]

export default function Contact({ theme: t }) {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('shaheedkhan336@gmail.com').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const cardStyle = {
    background: t.card, border: `0.5px solid ${t.cardBorder}`,
    borderRadius: '12px', padding: '18px 20px',
    display: 'flex', alignItems: 'center', gap: '14px',
    textDecoration: 'none', color: 'inherit',
    transition: 'border-color 0.25s, transform 0.2s',
    cursor: 'pointer',
  }

  return (
    <section id="contact" style={{ padding: '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        06 — Contact
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Let's Work Together
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: '28px', maxWidth: '480px', lineHeight: 1.7 }}>
        Open to new opportunities — full-time, remote, or freelance. Reach out directly on any platform.
      </p>

      {/* Available badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontFamily: 'monospace', color: t.green, background: t.greenFade, border: `0.5px solid ${t.greenBorder}`, padding: '5px 14px', borderRadius: '20px', marginBottom: '32px' }}>
        <span style={{ width: '6px', height: '6px', background: t.green, borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
        Immediately Available — Karachi / Remote
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '680px' }}>
        {contacts.map((c, i) => (
          <motion.a key={i} href={c.href} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            viewport={{ once: true }}
            style={cardStyle}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.hoverBorder; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.cardBorder; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: c.iconBg || t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.iconColor || t.accent, fontSize: '20px', flexShrink: 0 }}>
              <i className={`ti ${c.icon}`} aria-hidden="true" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: t.textDim, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace', marginBottom: '3px' }}>{c.label}</div>
              <div style={{ fontSize: '13px', color: t.text, fontWeight: 500 }}>{c.value}</div>
              <div style={{ fontSize: '11px', color: t.textSub, marginTop: '2px' }}>{c.sub}</div>
            </div>
            <i className="ti ti-arrow-right" style={{ color: t.textDim, fontSize: '15px' }} aria-hidden="true" />
          </motion.a>
        ))}

        {/* Email - full width, copy on click */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32 }}
          viewport={{ once: true }}
          onClick={copyEmail}
          style={{ ...cardStyle, gridColumn: '1 / -1' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.hoverBorder; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.cardBorder; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.accent, fontSize: '20px', flexShrink: 0 }}>
            <i className="ti ti-mail" aria-hidden="true" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: t.textDim, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace', marginBottom: '3px' }}>Email</div>
            <div style={{ fontSize: '13px', color: t.text, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              shaheedkhan336@gmail.com
              {copied && <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: t.accentFade, color: t.accent, fontFamily: 'monospace' }}>copied!</span>}
            </div>
            <div style={{ fontSize: '11px', color: t.textSub, marginTop: '2px' }}>Click to copy address</div>
          </div>
          <i className="ti ti-copy" style={{ color: t.textDim, fontSize: '15px' }} aria-hidden="true" />
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `0.5px solid ${t.border}`, marginTop: '48px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '12px', color: t.textDim }}>
          &lt;hafiz.dev /&gt; — Built with <span style={{ color: t.accent }}>React.js</span> + Tailwind
        </div>
        <div style={{ fontSize: '11px', color: t.textDim }}>© 2025 Hafiz Shaheed</div>
      </div>

      <style>{`@keyframes pulse { 50% { opacity: 0.3; } }`}</style>
    </section>
  )
}
