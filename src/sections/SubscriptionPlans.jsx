// src/sections/SubscriptionPlans.jsx
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const plans = [
  {
    name: 'Maintenance Lite',
    price: '$79',
    period: '/month',
    tagline: 'Keep your website running smoothly',
    icon: 'ti-tools',
    features: [
      'Bug fixes (up to 3 issues/month)',
      'Security updates',
      'Monthly health check report',
      '24-48hr response time',
    ],
  },
  {
    name: 'Growth Partner',
    price: '$249',
    period: '/month',
    tagline: 'Continuous improvements to your platform',
    icon: 'ti-trending-up',
    popular: true,
    features: [
      'Everything in Lite',
      '1 new small feature/month',
      'Performance optimization',
      'Priority support (same-day)',
      'Monthly 15-min strategy call',
    ],
  },
  {
    name: 'Dedicated Hours',
    price: '$799',
    period: '/month',
    tagline: 'Your part-time developer, on retainer',
    icon: 'ti-clock-hour-8',
    features: [
      '20 dedicated hours/month',
      'Direct WhatsApp access',
      'Sprint planning',
      'Use for features, fixes, or consulting',
    ],
  },
]

export default function SubscriptionPlans({ theme: t }) {
  const isMobile = useIsMobile()

  return (
    <section id="subscriptions" style={{ padding: isMobile ? '40px 20px' : '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        12 — Ongoing Support
      </div>
      <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Need Ongoing Development Support?
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: isMobile ? '24px' : '32px', maxWidth: isMobile ? '100%' : '550px', lineHeight: 1.7 }}>
        For businesses that need continuous maintenance, regular improvements, or a dedicated developer on retainer — instead of one-off projects.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            style={{
              background: t.card,
              border: `0.5px solid ${plan.popular ? t.accent : t.cardBorder}`,
              borderRadius: '12px', padding: isMobile ? '18px' : '22px',
              position: 'relative',
            }}
          >
            {plan.popular && (
              <div style={{ position: 'absolute', top: '-10px', right: '20px', background: t.accent, color: t.bg, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '10px', fontFamily: 'monospace' }}>
                MOST POPULAR
              </div>
            )}

            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.accent, fontSize: '20px', marginBottom: '14px' }}>
              <i className={`ti ${plan.icon}`} aria-hidden="true" />
            </div>

            <div style={{ fontSize: '15px', fontWeight: 700, color: t.text, marginBottom: '4px' }}>{plan.name}</div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, color: t.accent, fontFamily: 'monospace' }}>{plan.price}</span>
              <span style={{ fontSize: '12px', color: t.textDim }}>{plan.period}</span>
            </div>

            <p style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.6, marginBottom: '16px' }}>{plan.tagline}</p>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {plan.features.map((f, fi) => (
                <li key={fi} style={{ fontSize: '12px', color: t.textSub, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <i className="ti ti-check" style={{ color: t.accent, fontSize: '14px', marginTop: '1px', flexShrink: 0 }} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#hire-me"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('hire-me')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'block', textAlign: 'center',
                background: plan.popular ? t.btnBg : 'transparent',
                color: plan.popular ? '#fff' : t.accent,
                border: plan.popular ? 'none' : `0.5px solid ${t.accentFade}`,
                padding: '10px', borderRadius: '7px', fontSize: '13px',
                fontWeight: 500, textDecoration: 'none', cursor: 'pointer',
              }}
            >
              Discuss This Plan
            </a>
          </motion.div>
        ))}
      </div>

      <p style={{ fontSize: '11px', color: t.textDim, marginTop: '20px', textAlign: 'center' }}>
        All plans are flexible — cancel anytime, no long-term lock-in.
      </p>
    </section>
  )
}