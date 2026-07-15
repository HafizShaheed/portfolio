// src/components/SkillRadar.jsx
import { useIsMobile } from '../hooks/useIsMobile'

// Top skills jo radar chart mein dikhani hain (max 6-8 best hota hai readability ke liye)
const radarSkills = [
  { name: 'Laravel', level: 95 },
  { name: 'React.js', level: 90 },
  { name: 'Node.js', level: 80 },
  { name: 'MySQL', level: 90 },
  { name: 'AWS', level: 78 },
  { name: 'REST APIs', level: 92 },
]

export default function SkillRadar({ theme: t }) {
  const isMobile = useIsMobile()
  const size = isMobile ? 260 : 320
  const center = size / 2
  const maxRadius = size / 2 - 40 // padding labels ke liye
  const numPoints = radarSkills.length
  const angleStep = (Math.PI * 2) / numPoints

  // Har skill ke point ka x,y coordinate calculate karo (level ke hisab se)
  const getPoint = (index, value) => {
    const angle = angleStep * index - Math.PI / 2 // top se start karo
    const radius = (value / 100) * maxRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  // Label position (thoda bahar, taaki text overlap na ho)
  const getLabelPoint = (index) => {
    const angle = angleStep * index - Math.PI / 2
    const radius = maxRadius + 22
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  // Skill polygon ka path banao
  const skillPoints = radarSkills.map((s, i) => getPoint(i, s.level))
  const polygonPath = skillPoints.map(p => `${p.x},${p.y}`).join(' ')

  // Background grid rings (25%, 50%, 75%, 100%)
  const gridLevels = [25, 50, 75, 100]

  return (
    <div style={{
      background: t.card, border: `0.5px solid ${t.cardBorder}`,
      borderRadius: '12px', padding: isMobile ? '20px' : '24px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background grid rings */}
        {gridLevels.map((lvl) => {
          const ringPoints = radarSkills.map((_, i) => getPoint(i, lvl))
          const ringPath = ringPoints.map(p => `${p.x},${p.y}`).join(' ')
          return (
            <polygon
              key={lvl}
              points={ringPath}
              fill="none"
              stroke={t.cardBorder}
              strokeWidth="1"
            />
          )
        })}

        {/* Axis lines (center se har skill tak) */}
        {radarSkills.map((_, i) => {
          const outerPoint = getPoint(i, 100)
          return (
            <line
              key={i}
              x1={center} y1={center}
              x2={outerPoint.x} y2={outerPoint.y}
              stroke={t.cardBorder}
              strokeWidth="1"
            />
          )
        })}

        {/* Skill polygon - filled area */}
        <polygon
          points={polygonPath}
          fill={t.accent}
          fillOpacity="0.15"
          stroke={t.accent}
          strokeWidth="2"
        />

        {/* Skill points - dots */}
        {skillPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={t.accent} />
        ))}

        {/* Labels */}
        {radarSkills.map((s, i) => {
          const labelPos = getLabelPoint(i)
          return (
            <text
              key={i}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={isMobile ? '10' : '11'}
              fontFamily="monospace"
              fill={t.textSub}
            >
              {s.name}
            </text>
          )
        })}
      </svg>
    </div>
  )
}