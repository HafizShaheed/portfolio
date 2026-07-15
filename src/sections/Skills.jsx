

// src/sections/Skills.jsx
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const allSkills = [
  { name: 'Laravel', color: '#FF2D20', icon: 'ti-brand-laravel' },
  { name: 'PHP', color: '#777BB4', icon: 'ti-brand-php' },
  { name: 'React.js', color: '#61DAFB', icon: 'ti-brand-react' },
  { name: 'Next.js', color: '#EBEBEB', icon: 'ti-brand-nextjs' },
  { name: 'Node.js', color: '#68A063', icon: 'ti-brand-nodejs' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'ti-brand-javascript' },
  { name: 'TypeScript', color: '#3178C6', icon: 'ti-brand-typescript' },
  { name: 'MySQL', color: '#00758F', icon: 'ti-database' },
  { name: 'MongoDB', color: '#47A248', icon: 'ti-brand-mongodb' },
  { name: 'GraphQL', color: '#E1007A', icon: 'ti-brand-graphql' },
  { name: 'AWS', color: '#FF9900', icon: 'ti-brand-aws' },
  { name: 'Docker', color: '#2496ED', icon: 'ti-brand-docker' },
  { name: 'Tailwind CSS', color: '#06B6D4', icon: 'ti-brand-tailwind' },
  { name: 'Git', color: '#F05032', icon: 'ti-brand-git' },
  { name: 'REST APIs', color: '#10B981', icon: 'ti-api' },
  { name: 'Socket.io', color: '#CCCCCC', icon: 'ti-brand-socket-io' },
  { name: 'Bootstrap', color: '#7952B3', icon: 'ti-brand-bootstrap' },
  { name: 'Oracle', color: '#F80000', icon: 'ti-database' },
  { name: 'Postman', color: '#FF6C37', icon: 'ti-api' },
]

const skillBars = [
  { name: 'Laravel / PHP', level: 95 },
  { name: 'React.js / Next.js', level: 88 },
  { name: 'Node.js / Express', level: 80 },
  { name: 'MySQL / MongoDB', level: 87 },
  { name: 'AWS / DevOps', level: 75 },
  { name: 'REST API Design', level: 92 },
]

export default function Skills({ theme: t }) {
  const isMobile = useIsMobile()

  return (
    <section id="skills" style={{
      padding: isMobile ? '64px 20px' : '100px 40px',
      maxWidth: '1280px', margin: '0 auto',
      borderTop: `0.5px solid ${t.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 600 }}>
          SKILLS & EXPERTISE
        </span>
        <div style={{ flex: 1, height: '0.5px', background: t.border }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Technologies <span style={{ color: t.accent }}>I work with</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '48px',
      }}>
        {/* Left — Icon grid */}
        <div>
          <div style={{ fontSize: '12px', color: t.textDim, fontFamily: 'monospace', marginBottom: '20px', letterSpacing: '0.1em' }}>
            THE TOOLS BEHIND THE WORK
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
            gap: '10px',
          }}>
            {allSkills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                viewport={{ once: true }}
                style={{
                  background: t.card, border: `0.5px solid ${t.cardBorder}`,
                  borderRadius: '10px', padding: '14px 10px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px',
                  cursor: 'default', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = s.color + '44'
                  e.currentTarget.style.background = s.color + '0a'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = t.cardBorder
                  e.currentTarget.style.background = t.card
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <i className={`ti ${s.icon}`} style={{ fontSize: '24px', color: s.color }} />
                <span style={{ fontSize: '10px', color: t.textDim, textAlign: 'center', fontWeight: 500, lineHeight: 1.3 }}>
                  {s.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — Skill bars */}
        <div>
          <div style={{ fontSize: '12px', color: t.textDim, fontFamily: 'monospace', marginBottom: '20px', letterSpacing: '0.1em' }}>
            PROFICIENCY LEVELS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {skillBars.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 500 }}>{skill.name}</span>
                  <span style={{ fontSize: '12px', fontFamily: 'monospace', color: t.accent }}>{skill.level}%</span>
                </div>
                <div style={{ height: '6px', background: t.surface, borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    style={{
                      height: '100%', borderRadius: '3px',
                      background: `linear-gradient(90deg, ${t.accent}, ${t.btnHover})`,
                      boxShadow: `0 0 12px ${t.accentGlow}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{ marginTop: '40px' }}>
            <div style={{ fontSize: '12px', color: t.textDim, fontFamily: 'monospace', marginBottom: '16px', letterSpacing: '0.1em' }}>
              EDUCATION & CERTIFICATIONS
            </div>
            {[
              { title: 'BSc Computer Science', sub: 'Newports Institute · 2018 — 2022', icon: 'ti-school' },
              { title: 'ACCP Pro — Software Engineering', sub: 'Aptech Computer Education · 2016 — 2018', icon: 'ti-certificate' },
            ].map((cert, i) => (
              <div key={i} style={{
                display: 'flex', gap: '14px', alignItems: 'flex-start',
                padding: '14px', background: t.card, border: `0.5px solid ${t.cardBorder}`,
                borderRadius: '10px', marginBottom: '10px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = t.hoverBorder}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.cardBorder}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '9px',
                  background: t.accentFade, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: t.accent, fontSize: '16px', flexShrink: 0,
                }}>
                  <i className={`ti ${cert.icon}`} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>{cert.title}</div>
                  <div style={{ fontSize: '11px', color: t.textDim }}>{cert.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
