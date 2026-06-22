// src/sections/ResumeMatch.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

export default function ResumeMatch({ theme: t }) {
  const isMobile = useIsMobile()
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyzeMatch = async () => {
    if (jobDescription.trim().length < 20) {
      setError('Please paste a more detailed job description (at least 20 characters)')
      return
    }

    setError('')
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
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

  const getScoreColor = (score) => {
    if (score >= 75) return t.green
    if (score >= 50) return '#FBBF24'
    return '#F87171'
  }

  return (
    <section id="resume-match" style={{ padding: isMobile ? '40px 20px' : '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        05 — AI Match Score
      </div>
      <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Am I a Good Fit for Your Role?
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: isMobile ? '20px' : '28px', maxWidth: isMobile ? '100%' : '500px', lineHeight: 1.7 }}>
        Paste your job description below and let AI instantly calculate how well my skills match your requirements.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: (result && !isMobile) ? '1fr 1fr' : '1fr', gap: '24px', maxWidth: isMobile ? '100%' : '900px' }}>
        {/* Input side */}
        <div>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            style={{
              width: '100%', minHeight: isMobile ? '140px' : '180px', padding: '14px',
              borderRadius: '10px', border: `0.5px solid ${t.cardBorder}`,
              background: t.card, color: t.text, fontSize: '13px',
              fontFamily: 'inherit', resize: 'vertical', outline: 'none',
              lineHeight: 1.6,
            }}
          />
          {error && (
            <div style={{ color: '#F87171', fontSize: '12px', marginTop: '8px' }}>
              {error}
            </div>
          )}
          <button
            onClick={analyzeMatch}
            disabled={loading}
            style={{
              marginTop: '14px', background: t.btnBg, color: '#fff',
              border: 'none', padding: '11px 28px', borderRadius: '7px',
              fontSize: '13px', fontWeight: 500, cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.6 : 1,
              width: isMobile ? '100%' : 'auto',
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze Match'}
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
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                fontSize: isMobile ? '36px' : '42px', fontWeight: 700, fontFamily: 'monospace',
                color: getScoreColor(result.matchScore),
              }}>
                {result.matchScore}%
              </div>
              <div style={{ fontSize: '11px', color: t.textDim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Match Score
              </div>
            </div>

            <div style={{ height: '6px', background: t.accentFade, borderRadius: '3px', marginBottom: '20px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.matchScore}%` }}
                transition={{ duration: 0.8 }}
                style={{ height: '100%', background: getScoreColor(result.matchScore), borderRadius: '3px' }}
              />
            </div>

            <p style={{ fontSize: '13px', color: t.textSub, lineHeight: 1.7, marginBottom: '20px' }}>
              {result.summary}
            </p>

            {result.matchingSkills?.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: t.green, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px', fontFamily: 'monospace' }}>
                  ✓ Matching Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {result.matchingSkills.map((skill, i) => (
                    <span key={i} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '4px', background: t.greenFade, color: t.green, border: `0.5px solid ${t.greenBorder}` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.missingSkills?.length > 0 && (
              <div>
                <div style={{ fontSize: '11px', color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px', fontFamily: 'monospace' }}>
                  ⚠ Skills to Discuss
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {result.missingSkills.map((skill, i) => (
                    <span key={i} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '4px', background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '0.5px solid rgba(251,191,36,0.3)' }}>
                      {skill}
                    </span>
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
