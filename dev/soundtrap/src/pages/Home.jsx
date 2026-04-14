import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import TrackCard from '../components/TrackCard/TrackCard'
import Player from '../components/Player/Player'
import Upload from '../components/Upload/Upload'

function Home() {
  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)

  async function fetchTracks() {
    const { data, error } = await supabase.from('tracks').select('*')
    if (error) {
      console.error('Failed to fetch tracks:', error.message)
      return
    }
    setTracks(data)
  }

  useEffect(() => {
    fetchTracks()
  }, [])

  return (
    <div className="page">
      <header className="page-header">
        <h1>SoundTrap</h1>
      </header>

      <main className="main-content">
        <section className="upload-section">
          <Upload onUploadSuccess={fetchTracks} />
        </section>

        <section className="track-list-section">
          <h2>Your Tracks</h2>
          {tracks.length === 0 ? (
            <p className="empty-state">No tracks yet. Upload one above.</p>
          ) : (
            <ul className="track-list">
              {tracks.map((track) => (
                <TrackCard
                  key={track.id}
                  title={track.title}
                  fileUrl={track.file_url}
                  onPlay={setCurrentTrack}
                  isPlaying={currentTrack === track.file_url}
                />
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="player-footer">
        <Player src={currentTrack} />
      </footer>
    </div>
  )
}

export default Home
