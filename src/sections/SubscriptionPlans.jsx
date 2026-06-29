// src/sections/SubscriptionPlans.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const openModal = (plan) => {
    setSelectedPlan(plan)
    setForm({
      name: '', email: '',
      message: `Hi, I'm interested in discussing the "${plan.name}" subscription plan (${plan.price}${plan.period}). `,
    })
    setStatus('idle')
  }

  const closeModal = () => {
    setSelectedPlan(null)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: `Subscription: ${selectedPlan.name}`,
          budget: `${selectedPlan.price}${selectedPlan.period}`,
          message: form.message,
        }),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

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

            <button
              onClick={() => openModal(plan)}
              style={{
                display: 'block', width: '100%', textAlign: 'center',
                background: plan.popular ? t.btnBg : 'transparent',
                color: plan.popular ? '#fff' : t.accent,
                border: plan.popular ? 'none' : `0.5px solid ${t.accentFade}`,
                padding: '10px', borderRadius: '7px', fontSize: '13px',
                fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Discuss This Plan
            </button>
          </motion.div>
        ))}
      </div>

      <p style={{ fontSize: '11px', color: t.textDim, marginTop: '20px', textAlign: 'center' }}>
        All plans are flexible — cancel anytime, no long-term lock-in.
      </p>

      {/* Modal popup */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
              zIndex: 2000, display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '440px', background: t.bg,
                border: `0.5px solid ${t.cardBorder}`, borderRadius: '14px',
                padding: isMobile ? '20px' : '26px',
                maxHeight: '90vh', overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: t.accent, fontFamily: 'monospace', textTransform: 'uppercase' }}>
                    {selectedPlan.name}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: t.text }}>
                    {selectedPlan.price}{selectedPlan.period}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{ background: 'none', border: 'none', color: t.textDim, fontSize: '20px', cursor: 'pointer', padding: '2px' }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: '12px', color: t.textSub, marginBottom: '18px' }}>
                Fill in your details and I'll get back to you to discuss this plan.
              </p>

              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
                  <p style={{ color: t.green, fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>Sent successfully!</p>
                  <p style={{ color: t.textSub, fontSize: '12px', marginBottom: '16px' }}>I'll get back to you within 24 hours.</p>
                  <button
                    onClick={closeModal}
                    style={{ background: t.btnBg, color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="Your name" required
                    style={modalInputStyle(t)}
                  />
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="Your email" required
                    style={modalInputStyle(t)}
                  />
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me more..." required
                    style={{ ...modalInputStyle(t), minHeight: '90px', resize: 'vertical', fontFamily: 'inherit' }}
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background: t.btnBg, color: '#fff', border: 'none',
                      padding: '11px', borderRadius: '7px', fontSize: '13px',
                      fontWeight: 500, cursor: status === 'sending' ? 'default' : 'pointer',
                      opacity: status === 'sending' ? 0.6 : 1,
                    }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                  </button>

                  {status === 'error' && (
                    <p style={{ color: '#F87171', fontSize: '11px' }}>Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function modalInputStyle(t) {
  return {
    padding: '10px 14px', borderRadius: '8px',
    border: `0.5px solid ${t.cardBorder}`, background: t.card,
    color: t.text, fontSize: '13px', outline: 'none', width: '100%',
  }
}