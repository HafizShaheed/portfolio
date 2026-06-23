// src/sections/ProjectRecommender.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { useIsMobile } from '../hooks/useIsMobile'

export default function ProjectRecommender({ theme: t }) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const [requirement, setRequirement] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getRecommendations = async () => {
    if (requirement.trim().length < 5) {
      setError('Please describe what you need in a bit more detail')
      return
    }

    setError('')
    setLoading(true)
    setResult(null)

    // Sirf zaroori fields bhejo - poora image/github data nahi chahiye AI ko
    const projectSummaries = projects.map(p => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      desc: p.desc,
      tags: p.tags,
    }))

    try {
      const response = await fetch('/api/recommend-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirement, projectSummaries }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        // Slugs ko actual project objects se merge karo (image, links waghera ke liye)
        const enriched = data.recommendations
          .map(rec => {
            const project = projects.find(p => p.slug === rec.slug)
            return project ? { ...project, reason: rec.reason } : null
          })
          .filter(Boolean)
        setResult({ recommendations: enriched, summary: data.summary })
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const examples = [
    'I need an eCommerce store with payment integration',
    'Looking for a CRM with lead management',
    'Need an HR system with attendance tracking',
  ]

  return (
    <section id="project-finder" style={{ padding: isMobile ? '40px 20px' : '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        — AI Project Finder
      </div>
      <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Not Sure Which Project Fits Your Needs?
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: isMobile ? '20px' : '24px', maxWidth: isMobile ? '100%' : '550px', lineHeight: 1.7 }}>
        Describe what you're building and AI will point you to my most relevant past work.
      </p>

      {/* Example chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => setRequirement(ex)}
            style={{
              fontSize: '11px', padding: '5px 12px', borderRadius: '14px',
              border: `0.5px solid ${t.cardBorder}`, background: 'transparent',
              color: t.textSub, cursor: 'pointer',
            }}
          >
            {ex}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexDirection: isMobile ? 'column' : 'row' }}>
        <input
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && getRecommendations()}
          placeholder="e.g. I need a booking platform with admin dashboard"
          style={{
            flex: 1, padding: '12px 16px', borderRadius: '8px',
            border: `0.5px solid ${t.cardBorder}`, background: t.card,
            color: t.text, fontSize: '13px', outline: 'none',
          }}
        />
        <button
          onClick={getRecommendations}
          disabled={loading}
          style={{
            background: t.btnBg, color: '#fff', border: 'none',
            padding: '12px 24px', borderRadius: '8px', fontSize: '13px',
            fontWeight: 500, cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.6 : 1, whiteSpace: 'nowrap',
          }}
        >
          {loading ? 'Thinking...' : 'Find Projects'}
        </button>
      </div>

      {error && (
        <div style={{ color: '#F87171', fontSize: '12px', marginBottom: '16px' }}>{error}</div>
      )}

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p style={{ fontSize: '13px', color: t.textSub, marginBottom: '16px', lineHeight: 1.7 }}>
            {result.summary}
          </p>

          {result.recommendations.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {result.recommendations.map((p) => (
                <div
                  key={p.slug}
                  onClick={() => navigate(`/projects/${p.slug}`)}
                  style={{
                    background: t.card, border: `0.5px solid ${t.cardBorder}`,
                    borderRadius: '10px', padding: '16px', cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = t.hoverBorder}
                  onMouseLeave={e => e.currentTarget.style.borderColor = t.cardBorder}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: t.text, marginBottom: '6px' }}>
                    {p.name}
                  </div>
                  <div style={{
                    fontSize: '12px', color: t.accent, marginBottom: '10px',
                    background: t.accentFade, padding: '6px 10px', borderRadius: '6px',
                    lineHeight: 1.5,
                  }}>
                    💡 {p.reason}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: t.accent }}>
                    View details <i className="ti ti-arrow-right" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>
      )}
    </section>
  )
}