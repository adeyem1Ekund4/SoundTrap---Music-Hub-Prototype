import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import TrackCard from '../components/TrackCard/TrackCard'
import Player from '../components/Player/Player'
import Upload from '../components/Upload/Upload'

function Home({ user }) {
  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null) // { url, title }
  const [loading, setLoading] = useState(true)

  async function fetchTracks() {
    setLoading(true)
    const { data, error } = await supabase
      .from('tracks')
      .select('*, profiles(display_name)')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Failed to fetch tracks:', error.message)
    } else {
      setTracks(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTracks()
  }, [])

  return (
    <div className="page">
      <main className="main-content">
        {user && (
          <section className="upload-section">
            <Upload onUploadSuccess={fetchTracks} user={user} />
          </section>
        )}

        <section className="track-list-section">
          <h2>All Tracks</h2>
          {loading ? (
            <div className="spinner-wrap"><span className="spinner" /></div>
          ) : tracks.length === 0 ? (
            <p className="empty-state">No tracks yet. Upload one above.</p>
          ) : (
            <ul className="track-list">
              {tracks.map((track, i) => (
                <TrackCard
                  key={track.id}
                  index={i}
                  title={track.title}
                  displayName={track.profiles?.display_name}
                  fileUrl={track.file_url}
                  onPlay={setCurrentTrack}
                  isPlaying={currentTrack?.url === track.file_url}
                />
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="player-footer">
        <Player src={currentTrack?.url} title={currentTrack?.title} />
      </footer>
    </div>
  )
}

export default Home
