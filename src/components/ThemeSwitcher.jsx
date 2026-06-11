import { themeList } from '../theme'

export default function ThemeSwitcher({ current, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {themeList.map((t) => (
        <button
          key={t.name}
          title={t.name}
          onClick={() => onChange(t.name)}
          style={{
            width: '17px',
            height: '17px',
            borderRadius: '50%',
            background: t.swatch,
            border: current === t.name ? '2.5px solid #fff' : '2px solid transparent',
            cursor: 'pointer',
            padding: 0,
            transform: current === t.name ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.15s, border-color 0.15s',
            outline: 'none',
          }}
        />
      ))}
    </div>
  )
}
