import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

function Waveform({ src, title }) {
  const containerRef = useRef(null)
  const wsRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)

  // Create a fresh WaveSurfer instance each time src changes.
  // This runs after React commits the DOM, so the container is already
  // visible (hidden={!src} has been removed) before WaveSurfer touches it.
  useEffect(() => {
    if (!src || !containerRef.current) return

    setReady(false)
    setPlaying(false)
    setCurrentTime(0)
    setDuration(0)

    const style = getComputedStyle(document.documentElement)
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: style.getPropertyValue('--border').trim(),
      progressColor: style.getPropertyValue('--accent').trim(),
      height: 40,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      cursorWidth: 0,
      interact: true,
    })

    ws.on('ready', () => {
      setDuration(ws.getDuration())
      setReady(true)
    })
    ws.on('timeupdate', (t) => setCurrentTime(t))
    ws.on('play', () => setPlaying(true))
    ws.on('pause', () => setPlaying(false))
    ws.on('finish', () => setPlaying(false))

    ws.load(src)
    wsRef.current = ws

    return () => {
      ws.destroy()
      wsRef.current = null
    }
  }, [src])

  const fmt = (s) =>
    `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="player">
      {!src && <span className="player-empty">No track selected</span>}

      {/* player-track and player-controls stay in DOM (hidden attr) so
          containerRef is stable and WaveSurfer can attach on mount */}
      <div className="player-track" hidden={!src}>
        <span className="player-track-title">{title || ''}</span>
      </div>

      <div className="player-controls" hidden={!src}>
        <button
          className="player-btn"
          onClick={() => wsRef.current?.playPause()}
          disabled={!ready}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <span className="player-time">{fmt(currentTime)}</span>
        <div ref={containerRef} className="waveform-container" />
        <span className="player-time">{fmt(duration)}</span>
      </div>
    </div>
  )
}

export default Waveform
