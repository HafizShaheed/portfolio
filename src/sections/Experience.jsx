// src/sections/Experience.jsx
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import { experiences } from '../data/experience'

export default function Experience({ theme: t }) {
  const isMobile = useIsMobile()

  return (
    <section id="experience" style={{
      padding: isMobile ? '64px 20px' : '100px 40px',
      maxWidth: '1280px', margin: '0 auto',
      borderTop: `0.5px solid ${t.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
        <span style={{ fontSize: '11px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 600 }}>
          EXPERIENCE
        </span>
        <div style={{ flex: 1, height: '0.5px', background: t.border }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
        gap: isMobile ? '40px' : '80px',
        alignItems: 'flex-start',
      }}>
        {/* Left label */}
        <div>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px',
          }}>
            My Professional<br /><span style={{ color: t.accent }}>Journey</span>
          </h2>
          <p style={{ fontSize: '14px', color: t.textSub, lineHeight: 1.7 }}>
            4+ years of crafting enterprise solutions across multiple industries and company sizes.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '28px' }}>
          {/* Line */}
          <div style={{
            position: 'absolute', left: '7px', top: '12px', bottom: '12px',
            width: '1px',
            background: `linear-gradient(to bottom, ${t.accent}, ${t.border})`,
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                position: 'relative',
                marginBottom: i < experiences.length - 1 ? '36px' : 0,
                background: t.card, border: `0.5px solid ${t.cardBorder}`,
                borderRadius: '14px', padding: isMobile ? '18px' : '22px 24px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = t.hoverBorder}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.cardBorder}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '-34px', top: '22px',
                width: '14px', height: '14px', borderRadius: '50%',
                border: `2px solid ${t.accent}`,
                background: exp.current ? t.accent : t.bg,
                boxShadow: exp.current ? `0 0 10px ${t.accentGlow}` : 'none',
              }} />

              {/* Company Logo & Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                {/* Logo - Clickable */}
                {exp.companyLogo && exp.companyUrl && (
                  <a 
                    href={exp.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      flexShrink: 0,
                      cursor: 'pointer',
                      textDecoration: 'none',
                    }}
                    title={`Visit ${exp.company} website`}
                  >
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: '#fff', border: `0.5px solid ${t.cardBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.08)'
                      e.currentTarget.style.borderColor = t.accent
                      e.currentTarget.style.boxShadow = `0 4px 12px ${t.accent}40`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.borderColor = t.cardBorder
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    >
                      <img 
                        src={exp.companyLogo} 
                        alt={`${exp.company} logo`}
                        style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          const parent = e.target.parentElement
                          parent.innerHTML = `<span style="font-size:18px;font-weight:700;color:${t.accent};">${exp.company.charAt(0)}</span>`
                        }}
                      />
                    </div>
                  </a>
                )}

                {/* Fallback if no logo */}
                {!exp.companyLogo && exp.companyUrl && (
                  <a 
                    href={exp.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ flexShrink: 0 }}
                  >
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: t.surface, border: `0.5px solid ${t.cardBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', fontWeight: 700, color: t.accent,
                    }}>
                      {exp.company.charAt(0)}
                    </div>
                  </a>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      {/* Company Name - Clickable */}
                      {exp.companyUrl ? (
                        <a 
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            fontSize: '16px', 
                            fontWeight: 700, 
                            color: '#fff',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            borderBottom: `2px solid transparent`,
                            display: 'inline-block',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = t.accent
                            e.currentTarget.style.borderBottomColor = t.accent
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = '#fff'
                            e.currentTarget.style.borderBottomColor = 'transparent'
                          }}
                          title={`Visit ${exp.company} website`}
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                          {exp.company}
                        </span>
                      )}
                      
                      {exp.current && (
                        <span style={{
                          fontSize: '10px', padding: '3px 10px', borderRadius: '10px',
                          background: t.accentFade, color: t.accent, fontFamily: 'monospace',
                          border: `0.5px solid ${t.tagBorder}`, fontWeight: 600,
                        }}>● Current</span>
                      )}
                    </div>
                    <span style={{
                      fontSize: '11px', fontFamily: 'monospace', color: t.textDim,
                      background: t.surface, padding: '4px 10px', borderRadius: '5px',
                      whiteSpace: 'nowrap',
                    }}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Role & Location */}
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginTop: '4px'
                  }}>
                    <span style={{ 
                      fontSize: '14px', 
                      color: t.accent, 
                      fontWeight: 600,
                    }}>
                      {exp.role}
                    </span>
                    
                    {exp.location && (
                      <span style={{
                        fontSize: '12px',
                        color: t.textDim,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        <span>📍</span> {exp.location}
                      </span>
                    )}
                    
                    {exp.employmentType && (
                      <span style={{
                        fontSize: '11px',
                        color: t.textDim,
                        background: t.tagBg,
                        padding: '2px 10px',
                        borderRadius: '4px',
                        border: `0.5px solid ${t.tagBorder}`,
                      }}>
                        {exp.employmentType}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Points */}
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '14px' }}>
                {exp.points.map((p, pi) => (
                  <li key={pi} style={{ fontSize: '13px', color: t.textSub, lineHeight: 1.65, paddingLeft: '14px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: t.accent, fontSize: '10px', top: '4px' }}>▸</span>
                    {p}
                  </li>
                ))}
              </ul>

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '14px',
                  padding: '10px 14px',
                  background: t.surface,
                  borderRadius: '8px',
                  border: `0.5px solid ${t.border}`,
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: t.accent,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: 'monospace',
                    marginRight: '4px',
                  }}>🏆 Key Achievements</span>
                  {exp.achievements.map((achievement, ai) => (
                    <span key={ai} style={{
                      fontSize: '12px',
                      color: t.textSub,
                      background: t.card,
                      padding: '2px 12px',
                      borderRadius: '12px',
                      border: `0.5px solid ${t.tagBorder}`,
                    }}>
                      {achievement}
                    </span>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '10px', padding: '3px 9px', borderRadius: '4px',
                    background: t.tagBg, border: `0.5px solid ${t.tagBorder}`,
                    color: t.tagText, fontFamily: 'monospace', fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}