import { motion } from 'framer-motion'
import GithubStats from '../components/GithubStats'
import { useIsMobile } from '../hooks/useIsMobile'
import CurrentlyWorking from '../components/CurrentlyWorking'



const skillCats = [
  { icon: 'ti-layout', label: 'Frontend', skills: ['React.js', 'Next.js', 'Nuxt.js', 'JavaScript ES6+', 'Tailwind CSS'] },
  { icon: 'ti-server', label: 'Backend',  skills: ['Laravel', 'PHP OOP', 'Node.js', 'Express.js', 'REST APIs'] },
  { icon: 'ti-database', label: 'Database', skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Oracle'] },
  { icon: 'ti-cloud', label: 'DevOps',   skills: ['AWS EC2/S3/RDS', 'Docker', 'CI/CD', 'Git', 'cPanel'] },
]

export default function About({ theme: t }) {
  const isMobile = useIsMobile()

  return (
    <section id="about" style={{ padding: isMobile ? '40px 20px' : '56px 40px', borderTop: `0.5px solid ${t.border}` }}>
      {/* Section label */}
      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: t.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '22px', height: '0.5px', background: t.accent, display: 'inline-block' }} />
        01 — About
      </div>
      <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: isMobile ? '24px' : '32px' }}>
        Who I Am
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '28px' : '32px' }}>
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <p style={{ fontSize: '14px', color: t.textSub, lineHeight: 1.8, marginBottom: '16px' }}>
            Full Stack Developer with <span style={{ color: t.accent, fontWeight: 500 }}>4+ years</span> of experience building scalable, high-performance web applications. Specialized in <span style={{ color: t.accent, fontWeight: 500 }}>Laravel, React.js, and Node.js</span>.
          </p>
          <p style={{ fontSize: '14px', color: t.textSub, lineHeight: 1.8, marginBottom: '24px' }}>
            I've built enterprise-level ERP systems, multi-tenant SaaS platforms, and CRM tools serving <span style={{ color: t.accent, fontWeight: 500 }}>500+ concurrent users</span>. I focus on clean code, API design, and real performance gains.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: 'ti-map-pin',       label: 'Location',  val: 'Karachi, Pakistan' },
              { icon: 'ti-device-laptop', label: 'Open to',   val: 'Onsite · Remote · Contract' },
              { icon: 'ti-school',        label: 'Education', val: 'BS Computer Science — 2022' },
              { icon: 'ti-mail',          label: 'Email',     val: 'shaheedkhan336@gmail.com' },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: '10px', fontSize: '13px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <i className={`ti ${row.icon}`} style={{ color: t.accent, fontSize: '15px', marginTop: isMobile ? '2px' : 0 }} aria-hidden="true" />
                <span style={{ color: t.textDim, minWidth: isMobile ? 'auto' : '80px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'monospace' }}>{row.label}</span>
                <span style={{ color: t.textSub, wordBreak: 'break-word' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <GithubStats theme={t} />
          </div>
          <CurrentlyWorking theme={t} />
        </motion.div>

        {/* Right - Skills */}
        <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {skillCats.map((cat) => (
            <div key={cat.label} style={{
              background: t.card, border: `0.5px solid ${t.cardBorder}`,
              borderRadius: '10px', padding: '14px 16px',
            }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: t.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <i className={`ti ${cat.icon}`} style={{ fontSize: '14px' }} aria-hidden="true" /> {cat.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cat.skills.map((s) => (
                  <span key={s} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '4px', border: `0.5px solid ${t.accentFade}`, color: t.tagText, background: t.tagBg, fontFamily: 'monospace' }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
