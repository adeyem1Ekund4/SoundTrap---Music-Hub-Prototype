function TrackCard({ title, fileUrl, onPlay, isPlaying }) {
  return (
    <li className={`track-card ${isPlaying ? 'track-card--active' : ''}`}>
      <span className="track-title">{title}</span>
      <button className="play-btn" onClick={() => onPlay(fileUrl)}>
        {isPlaying ? '▶ Playing' : 'Play'}
      </button>
    </li>
  )
}

export default TrackCard
