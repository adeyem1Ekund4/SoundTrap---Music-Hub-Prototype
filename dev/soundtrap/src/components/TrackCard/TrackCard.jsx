function TrackCard({ index, title, displayName, fileUrl, onPlay, isPlaying }) {
  return (
    <li className={`track-card ${isPlaying ? 'track-card--active' : ''}`}>
      <span className="track-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="track-info">
        <span className="track-title">{title}</span>
        {displayName && <span className="track-uploader">{displayName}</span>}
      </div>
      <button className="play-btn" onClick={() => onPlay({ url: fileUrl, title })}>
        {isPlaying ? '⏸' : '▶'}
      </button>
    </li>
  )
}

export default TrackCard
