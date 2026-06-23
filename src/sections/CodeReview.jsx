// src/sections/CodeReview.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const languages = ['JavaScript', 'PHP', 'React/JSX', 'Python', 'SQL', 'Other']

export default function CodeReview({ theme: t }) {
  const isMobile = useIsMobile()
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('JavaScript')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reviewCode = async () => {
    if (code.trim().length < 10) {
      setError('Please paste a code snippet (at least 10 characters)')
      return
    }
    if (code.length > 3000) {
      setError('Code too long — please paste a smaller snippet (max 3000 characters)')
      return
    }

    setError('')
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const ratingColor = (rating) => {
    if (rating === 'Excellent') return t.green
    if (rating === 'Good') return t.accent
    if (rating === 'Needs Improvement') return '#FBBF24'
    return '#F87171'
  }

  const severityColor = (sev) => {
    if (sev === 'high') return '#F87171'
    if (sev === 'medium') return '#FBBF24'
    return t.textDim
  }

  return (
    <section id="code-review" style={{ padding: isMobile ? '40px 20px' : '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        — AI Code Review
      </div>
      <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Try My Code Review Style
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: isMobile ? '20px' : '28px', maxWidth: isMobile ? '100%' : '550px', lineHeight: 1.7 }}>
        Paste a code snippet and get an honest review — issues, best practices, and an overall verdict, in the style I'd give a teammate.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: (result && !isMobile) ? '1fr 1fr' : '1fr', gap: '24px', maxWidth: isMobile ? '100%' : '900px' }}>
        {/* Input side */}
        <div>
          {/* Language pills */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  fontSize: '11px', fontFamily: 'monospace', padding: '4px 12px',
                  borderRadius: '5px', cursor: 'pointer',
                  border: `0.5px solid ${language === lang ? t.accent : t.cardBorder}`,
                  color: language === lang ? t.accent : t.textSub,
                  background: language === lang ? t.accentFade : 'transparent',
                }}
              >
                {lang}
              </button>
            ))}
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Paste your ${language} code here...\n\nfunction example() {\n  // your code\n}`}
            style={{
              width: '100%', minHeight: isMobile ? '160px' : '220px', padding: '14px',
              borderRadius: '10px', border: `0.5px solid ${t.cardBorder}`,
              background: t.card, color: t.text, fontSize: '13px',
              fontFamily: 'monospace', resize: 'vertical', outline: 'none',
              lineHeight: 1.6,
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {error ? (
              <div style={{ color: '#F87171', fontSize: '12px' }}>{error}</div>
            ) : <div />}
            <div style={{ fontSize: '11px', color: code.length > 3000 ? '#F87171' : t.textDim, fontFamily: 'monospace' }}>
              {code.length}/3000
            </div>
          </div>

          <button
            onClick={reviewCode}
            disabled={loading}
            style={{
              marginTop: '14px', background: t.btnBg, color: '#fff',
              border: 'none', padding: '11px 28px', borderRadius: '7px',
              fontSize: '13px', fontWeight: 500, cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.6 : 1,
              width: isMobile ? '100%' : 'auto',
            }}
          >
            {loading ? 'Reviewing...' : 'Review My Code'}
          </button>
        </div>

        {/* Result side */}
        {result && (
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: '12px', padding: isMobile ? '18px' : '24px' }}
          >
            {/* Rating badge */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                display: 'inline-block', fontSize: isMobile ? '15px' : '17px', fontWeight: 700,
                color: ratingColor(result.overallRating),
                background: `${ratingColor(result.overallRating)}15`,
                padding: '8px 20px', borderRadius: '8px',
                fontFamily: 'monospace',
              }}>
                {result.overallRating}
              </div>
            </div>

            {/* Summary */}
            <p style={{ fontSize: '13px', color: t.textSub, lineHeight: 1.7, marginBottom: '20px' }}>
              {result.summary}
            </p>

            {/* Issues */}
            {result.issues?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', color: t.textDim, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px', fontFamily: 'monospace' }}>
                  Issues Found ({result.issues.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {result.issues.map((issue, i) => (
                    <div key={i} style={{
                      padding: '10px 12px', borderRadius: '8px',
                      background: t.bg, border: `0.5px solid ${t.cardBorder}`,
                      borderLeft: `3px solid ${severityColor(issue.severity)}`,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: t.text }}>{issue.title}</span>
                        <span style={{
                          fontSize: '9px', fontFamily: 'monospace', textTransform: 'uppercase',
                          padding: '2px 7px', borderRadius: '4px', color: severityColor(issue.severity),
                          background: `${severityColor(issue.severity)}15`,
                        }}>
                          {issue.severity}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: t.textSub, lineHeight: 1.5 }}>{issue.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Good practices */}
            {result.goodPractices?.length > 0 && (
              <div>
                <div style={{ fontSize: '11px', color: t.green, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px', fontFamily: 'monospace' }}>
                  ✓ Good Practices
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {result.goodPractices.map((practice, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: t.textSub }}>
                      <i className="ti ti-check" style={{ color: t.green, fontSize: '14px', marginTop: '1px', flexShrink: 0 }} aria-hidden="true" />
                      {practice}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}