import { motion } from 'framer-motion'
import { experiences } from '../data/experience'

export default function Experience({ theme: t }) {
  return (
    <section id="experience" style={{ padding: '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        02 — Experience
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '36px' }}>
        Where I've Worked
      </h2>

      <div style={{ position: 'relative', paddingLeft: '28px' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '0.5px', background: t.tlLine }} />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            style={{ position: 'relative', marginBottom: i < experiences.length - 1 ? '32px' : 0 }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute', left: '-28px', top: '6px',
              width: '14px', height: '14px', borderRadius: '50%',
              border: `2px solid ${t.tlDot}`,
              background: exp.current ? t.tlDot : t.bg,
              zIndex: 2,
            }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: t.text }}>{exp.role}</span>
                {exp.current && (
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: t.accentFade, color: t.accent, fontFamily: 'monospace' }}>
                    current
                  </span>
                )}
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: t.textDim, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                {exp.period}
              </span>
            </div>

            <div style={{ fontSize: '13px', color: t.accent, marginBottom: '10px', fontWeight: 500 }}>
              {exp.company}
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {exp.points.map((p, pi) => (
                <li key={pi} style={{ fontSize: '13px', color: t.textSub, lineHeight: 1.6, paddingLeft: '14px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: t.accent, fontSize: '10px', top: '3px' }}>▸</span>
                  {p}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {exp.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '3px', border: `0.5px solid ${t.accentFade}`, color: t.tagText, background: t.tagBg, fontFamily: 'monospace' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
