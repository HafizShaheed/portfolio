
// src/sections/About.jsx
// FIXED: usePortfolioImages directly use karta hai
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import { usePortfolioImages } from '../hooks/usePortfolioImages'
import GithubStats from '../components/GithubStats'
import CurrentlyWorking from '../components/CurrentlyWorking'

const info = [
  { icon: 'ti-map-pin', label: 'Location', val: 'Karachi, Pakistan' },
  { icon: 'ti-device-laptop', label: 'Open to', val: 'Onsite · Remote · Contract' },
  { icon: 'ti-school', label: 'Education', val: 'BS Computer Science — 2022' },
  { icon: 'ti-mail', label: 'Email', val: 'shaheedkhan336@gmail.com' },
  { icon: 'ti-phone', label: 'Phone', val: '+92 307 2241918' },
  { icon: 'ti-briefcase', label: 'Freelance', val: 'Available' },
]

const qualities = [
  { icon: 'ti-code', text: 'Clean & Scalable Code' },
  { icon: 'ti-rocket', text: 'Performance Optimization' },
  { icon: 'ti-shield-check', text: 'Secure & Reliable Applications' },
  { icon: 'ti-bulb', text: 'Problem Solver' },
]

export default function About({ theme: t }) {
  const isMobile = useIsMobile()
  const { images } = usePortfolioImages() // ← Direct se images lo

  return (
    <section id="about" style={{
      padding: isMobile ? '64px 20px' : '100px 40px',
      maxWidth: '1280px', margin: '0 auto',
      borderTop: `0.5px solid ${t.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
        <span style={{ fontSize: '11px', color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 600 }}>
          ABOUT ME
        </span>
        <div style={{ flex: 1, height: '0.5px', background: t.border }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '48px' : '80px', alignItems: 'flex-start' }}>

        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
            I build digital products<br />
            <span style={{ color: t.accent }}>that make an impact.</span>
          </h2>

          <p style={{ fontSize: '15px', color: t.textSub, lineHeight: 1.8, marginBottom: '14px' }}>
            I'm a Full Stack Developer with over 4 years of experience building enterprise solutions, SaaS platforms and real-time web applications.
          </p>
          <p style={{ fontSize: '15px', color: t.textSub, lineHeight: 1.8, marginBottom: '28px' }}>
            I've delivered scalable systems serving <span style={{ color: '#cbd5e1', fontWeight: 500 }}>500+ concurrent users</span> at Hamdard University, and built everything from ERP modules to multi-vendor marketplaces.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
            {qualities.map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.accent, fontSize: '13px', flexShrink: 0 }}>
                  <i className={`ti ${q.icon}`} />
                </div>
                <span style={{ fontSize: '14px', color: t.textSub }}>{q.text}</span>
              </div>
            ))}
          </div>

          <GithubStats theme={t} />
          <CurrentlyWorking theme={t} />
        </motion.div>

        {/* Right — Photo card */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}>
          <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: '16px', overflow: 'hidden' }}>

            {/* Photo — Blob se aati hai */}
            <div style={{ height: isMobile ? '260px' : '320px', overflow: 'hidden', position: 'relative', background: t.surface }}>
              <img
                src={images.about} // ← Blob URL ya fallback
                alt="Hafiz Shaheed"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(to top, ${t.card}, transparent)` }} />
            </div>

            {/* Info rows */}
            <div style={{ padding: '20px' }}>
              {info.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < info.length - 1 ? `0.5px solid ${t.border}` : 'none' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: t.accentFade, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.accent, fontSize: '15px', flexShrink: 0 }}>
                    <i className={`ti ${row.icon}`} />
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: t.textDim, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace', marginBottom: '2px' }}>{row.label}</div>
                    <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 500 }}>{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}