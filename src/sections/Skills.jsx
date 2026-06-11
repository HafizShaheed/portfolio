import { motion } from 'framer-motion'

const skillGroups = [
  {
    category: 'Frontend',
    icon: 'ti-layout',
    skills: [
      { name: 'React.js',        level: 90 },
      { name: 'Next.js',         level: 85 },
      { name: 'Nuxt.js',         level: 75 },
      { name: 'JavaScript ES6+', level: 90 },
      { name: 'Tailwind CSS',    level: 88 },
      { name: 'HTML5 / CSS3',    level: 92 },
    ],
  },
  {
    category: 'Backend',
    icon: 'ti-server',
    skills: [
      { name: 'Laravel',   level: 95 },
      { name: 'PHP OOP',   level: 90 },
      { name: 'Node.js',   level: 80 },
      { name: 'Express.js',level: 75 },
      { name: 'REST APIs', level: 92 },
    ],
  },
  {
    category: 'Database',
    icon: 'ti-database',
    skills: [
      { name: 'MySQL',      level: 90 },
      { name: 'MongoDB',    level: 78 },
      { name: 'PostgreSQL', level: 72 },
      { name: 'Oracle',     level: 65 },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: 'ti-cloud',
    skills: [
      { name: 'AWS EC2/S3/RDS', level: 78 },
      { name: 'Docker',         level: 70 },
      { name: 'Git / GitHub',   level: 92 },
      { name: 'CI/CD',          level: 68 },
      { name: 'cPanel',         level: 85 },
    ],
  },
]

export default function Skills({ theme: t }) {
  return (
    <section id="skills" style={{ padding: '56px 40px', borderTop: `0.5px solid ${t.border}` }}>

      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        04 — Skills
      </div>

      <h2 style={{ fontSize: '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        What I Work With
      </h2>
      <p style={{ fontSize: '13px', color: t.textSub, marginBottom: '36px' }}>
        Technologies I use daily to build production-grade applications
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: gi * 0.1 }}
            viewport={{ once: true }}
            style={{
              background: t.card,
              border: `0.5px solid ${t.cardBorder}`,
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            {/* Category header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.accent, fontSize: '16px' }}>
                <i className={`ti ${group.icon}`} aria-hidden="true" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: t.text }}>{group.category}</span>
            </div>

            {/* Skill bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {group.skills.map((skill, si) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '12px', color: t.textSub }}>{skill.name}</span>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: t.accent }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', background: t.accentFade, borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: gi * 0.1 + si * 0.05, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      style={{ height: '100%', background: t.accent, borderRadius: '2px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
