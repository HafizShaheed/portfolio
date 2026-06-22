// src/components/Skeleton.jsx
// Reusable shimmer loading placeholder

export function Skeleton({ width = '100%', height = '16px', radius = '6px', theme: t }) {
  return (
    <div
      style={{
        width, height, borderRadius: radius,
        background: `linear-gradient(90deg, ${t.cardBorder} 25%, ${t.accentFade} 50%, ${t.cardBorder} 75%)`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  )
}

// Page load hote waqt full-page skeleton (Hero section jaisa structure)
export function PageSkeleton({ theme: t }) {
  return (
    <div style={{ padding: '60px 40px', maxWidth: '900px' }}>
      <Skeleton width="180px" height="20px" theme={t} />
      <div style={{ marginTop: '20px' }}>
        <Skeleton width="60%" height="48px" theme={t} />
      </div>
      <div style={{ marginTop: '16px' }}>
        <Skeleton width="40%" height="20px" theme={t} />
      </div>
      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Skeleton width="100%" height="14px" theme={t} />
        <Skeleton width="90%" height="14px" theme={t} />
        <Skeleton width="70%" height="14px" theme={t} />
      </div>
      <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
        {[1,2,3,4,5].map(i => <Skeleton key={i} width="70px" height="26px" radius="4px" theme={t} />)}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}