// src/components/VisitorStats.jsx
import { useState, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { Skeleton } from './Skeleton'

export default function VisitorStats({ theme: t }) {
  const isMobile = useIsMobile()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Sirf ek hi baar per session count badhao (refresh pe dobara count na ho)
    const alreadyTracked = sessionStorage.getItem('visitTracked')
    const method = alreadyTracked ? 'GET' : 'POST'

    fetch('/api/track-visit', { method })
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
        if (!alreadyTracked) {
          sessionStorage.setItem('visitTracked', 'true')
        }
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex', gap: isMobile ? '14px' : '20px',
        padding: isMobile ? '14px' : '16px 20px', background: t.card,
        border: `0.5px solid ${t.cardBorder}`, borderRadius: '12px',
      }}>
        <Skeleton width="50px" height="32px" theme={t} />
        <Skeleton width="50px" height="32px" theme={t} />
        <Skeleton width="50px" height="32px" theme={t} />
      </div>
    )
  }

  if (!stats) return null

  const items = [
    { label: 'Today', value: stats.today, icon: 'ti-sun' },
    { label: 'This Week', value: stats.week, icon: 'ti-calendar-week' },
    { label: 'All Time', value: stats.total, icon: 'ti-infinity' },
  ]

  return (
    <div style={{
      display: 'flex', gap: isMobile ? '12px' : '24px',
      padding: isMobile ? '14px' : '16px 20px', background: t.card,
      border: `0.5px solid ${t.cardBorder}`, borderRadius: '12px',
      flexWrap: 'wrap',
    }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: t.accentFade, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: t.accent, fontSize: '14px', flexShrink: 0,
          }}>
            <i className={`ti ${item.icon}`} aria-hidden="true" />
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 700, color: t.text, fontFamily: 'monospace', lineHeight: 1 }}>
              {item.value.toLocaleString()}
            </div>
            <div style={{ fontSize: '10px', color: t.textDim, whiteSpace: 'nowrap' }}>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}