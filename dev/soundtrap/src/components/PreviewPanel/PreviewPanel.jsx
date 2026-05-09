import { useMemo, useState } from 'react'

const DEMO_TRACKS = [
  { id: 1, title: 'Gerudo Valley',        game: 'The Legend of Zelda: OoT',  duration: 195, accent: '#7b6cf0', progress: 0.62 },
  { id: 2, title: 'One-Winged Angel',     game: 'Final Fantasy VII',          duration: 312, accent: '#df5c5c', progress: 0.18 },
  { id: 3, title: 'Bonetrousle',          game: 'Undertale',                  duration: 148, accent: '#e89820', progress: 0.41 },
  { id: 4, title: 'Halo Theme',           game: 'Halo: Combat Evolved',       duration: 208, accent: '#4caf72', progress: 0.75 },
  { id: 5, title: 'Gusty Garden Galaxy',  game: 'Super Mario Galaxy',         duration: 163, accent: '#e87fd0', progress: 0.29 },
  { id: 6, title: 'Snake Eater',          game: 'Metal Gear Solid 3',         duration: 244, accent: '#7ec8e3', progress: 0.51 },
  { id: 7, title: 'Megalovania',          game: 'Undertale',                  duration: 155, accent: '#df5c5c', progress: 0.88 },
  { id: 8, title: 'Dearly Beloved',       game: 'Kingdom Hearts',             duration: 187, accent: '#c77dff', progress: 0.34 },
]

// Deterministic bar heights per track — looks like a real waveform:
// tapers toward edges, unique shape per seed.
function seededBars(seed, count = 36) {
  let s = (seed * 2654435761) >>> 0
  function next() {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5
    return (s >>> 0) / 0xffffffff
  }
  return Array.from({ length: count }, (_, i) => {
    const noise = next()
    const envelope = Math.sin((i / (count - 1)) * Math.PI) // taper at edges
    return 8 + (noise * 0.55 + envelope * 0.45) * 92
  })
}

function fmt(s) {
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}

function MiniWaveform({ trackId, progress, accent }) {
  const bars = useMemo(() => seededBars(trackId), [trackId])
  const BAR_W = 2
  const GAP   = 1
  const W     = bars.length * (BAR_W + GAP) - GAP
  const splitAt = Math.round(progress * bars.length)

  return (
    <svg
      className="mini-wave"
      viewBox={`0 0 ${W} 100`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * (BAR_W + GAP)}
          y={100 - h}
          width={BAR_W}
          height={h}
          fill={i < splitAt ? accent : 'var(--border)'}
          opacity={i < splitAt ? 0.85 : 0.45}
        />
      ))}
    </svg>
  )
}

function PreviewPanel() {
  const [activeId, setActiveId] = useState(null)

  return (
    <section className="preview-panel">
      <h2 className="preview-panel-header">Up Next</h2>
      <ul className="preview-list">
        {DEMO_TRACKS.map((track) => {
          const active = track.id === activeId
          return (
            <li
              key={track.id}
              className={`preview-item${active ? ' preview-item--active' : ''}`}
              onClick={() => setActiveId(active ? null : track.id)}
            >
              <div
                className="preview-thumb"
                style={{ background: track.accent }}
              >
                {track.title[0]}
              </div>

              <div className="preview-info">
                <span className="preview-title">{track.title}</span>
                <span className="preview-game">{track.game}</span>
                <MiniWaveform
                  trackId={track.id}
                  progress={active ? track.progress : 0}
                  accent={track.accent}
                />
              </div>

              <span className="preview-duration">{fmt(track.duration)}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PreviewPanel
