// src/components/GithubStats.jsx
import { useState, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { Skeleton } from './Skeleton'

export default function GithubStats({ theme: t }) {
  const isMobile = useIsMobile()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/HafizShaheed')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Loading skeleton - blank screen ki jagah shimmer dikhao
  if (loading) {
    return (
      <div style={{
        display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center',
        padding: isMobile ? '14px' : '16px 20px', background: t.card,
        border: `0.5px solid ${t.cardBorder}`, borderRadius: '12px',
      }}>
        <Skeleton width="40px" height="40px" radius="50%" theme={t} />
        <div style={{ flex: 1 }}>
          <Skeleton width="80px" height="13px" theme={t} />
          <div style={{ marginTop: '6px' }}>
            <Skeleton width="100px" height="11px" theme={t} />
          </div>
        </div>
        <Skeleton width="60px" height="30px" theme={t} />
      </div>
    )
  }

  // Fetch fail hua aur data bhi nahi mila - kuch mat dikhao
  if (!stats) return null

  const items = [
    { label: 'Repos', value: stats.public_repos },
    { label: 'Followers', value: stats.followers },
    { label: 'Following', value: stats.following },
  ]

  return (
    <div style={{
      display: 'flex', gap: isMobile ? '12px' : '20px', alignItems: 'center',
      padding: isMobile ? '14px' : '16px 20px', background: t.card,
      border: `0.5px solid ${t.cardBorder}`, borderRadius: '12px',
      flexWrap: 'wrap',
    }}>
      <img
        src={stats.avatar_url}
        alt="GitHub avatar"
        style={{ width: '40px', height: '40px', borderRadius: '50%', border: `1.5px solid ${t.accent}`, flexShrink: 0 }}
      />
      <div style={{ flex: isMobile ? '1 1 100%' : 1, minWidth: isMobile ? '100%' : '120px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: t.text }}>@{stats.login}</div>
        <div style={{ fontSize: '11px', color: t.textDim }}>Live from GitHub</div>
      </div>
      <div style={{ display: 'flex', gap: isMobile ? '14px' : '20px' }}>
        {items.map((item) => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: isMobile ? '15px' : '17px', fontWeight: 700, color: t.accent, fontFamily: 'monospace' }}>
              {item.value}
            </div>
            <div style={{ fontSize: '10px', color: t.textDim, whiteSpace: 'nowrap' }}>{item.label}</div>
          </div>
        ))}
      </div>
      {!isMobile && (
        <a
          href={stats.html_url}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '12px', color: t.accent, textDecoration: 'none',
            border: `0.5px solid ${t.accentFade}`, padding: '6px 14px',
            borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          <i className="ti ti-brand-github" aria-hidden="true" />
          View Profile
        </a>
      )}
    </div>
  )
}