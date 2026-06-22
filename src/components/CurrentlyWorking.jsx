// src/components/CurrentlyWorking.jsx
import { useIsMobile } from '../hooks/useIsMobile'

// Yahan apna current work update karte raho - simple array hai
const currentWork = [
  {
    icon: 'ti-stack-2',
    title: 'MERN Stack Development',
    detail: 'Building full-stack apps with MongoDB, Express, React & Node.js',
  },
  {
    icon: 'ti-brand-laravel',
    title: 'Advanced Laravel & PHP',
    detail: 'Deepening backend architecture and API design patterns',
  },
  {
    icon: 'ti-robot',
    title: 'AI Automation',
    detail: 'Learning to build AI-powered workflows and integrations',
  },
]

export default function CurrentlyWorking({ theme: t }) {
  const isMobile = useIsMobile()

  return (
    <div style={{
      background: t.card, border: `0.5px solid ${t.cardBorder}`,
      borderRadius: '12px', padding: isMobile ? '16px' : '18px 20px',
      marginTop: '20px',
    }}>
      {/* Header with live dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: t.green, display: 'inline-block',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{
          fontSize: '11px', fontFamily: 'monospace', color: t.green,
          textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
        }}>
          Currently Working On
        </span>
      </div>

      {/* Work items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {currentWork.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: t.accentFade, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: t.accent, fontSize: '14px',
              flexShrink: 0,
            }}>
              <i className={`ti ${item.icon}`} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: t.text, marginBottom: '2px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.5 }}>
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes pulse { 50% { opacity: 0.3; } }`}</style>
    </div>
  )
}