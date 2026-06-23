// src/sections/Availability.jsx
import { useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Availability({ theme: t }) {
  const isMobile = useIsMobile()

  // Calendly ka widget script load karo (sirf ek baar)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Component hatne par script bhi clean kar do
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="availability" style={{ padding: isMobile ? '40px 20px' : '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        — Book a Call
      </div>
      <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Let's Talk About Your Project
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: isMobile ? '20px' : '28px', maxWidth: isMobile ? '100%' : '550px', lineHeight: 1.7 }}>
        Pick a time that works for you — a free 30-minute call to discuss your project, requirements, or just say hi.
      </p>

      {/* Calendly inline widget */}
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/shaheedkhan336/30min"
        style={{
          minWidth: '280px',
          height: isMobile ? '650px' : '700px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: `0.5px solid ${t.cardBorder}`,
        }}
      />
    </section>
  )
}