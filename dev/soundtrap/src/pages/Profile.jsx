import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import TrackCard from '../components/TrackCard/TrackCard'
import Player from '../components/Player/Player'

function Profile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null) // { url, title }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)

      const [{ data: profileData, error: profileError }, { data: trackData }] =
        await Promise.all([
          supabase.from('profiles').select('display_name, bio').eq('id', id).single(),
          supabase.from('tracks').select('*').eq('user_id', id).order('created_at', { ascending: false }),
        ])

      if (profileError) {
        setError('Profile not found.')
      } else {
        setProfile(profileData)
        setTracks(trackData ?? [])
      }

      setLoading(false)
    }

    load()
  }, [id])

  if (loading) return <p className="status-msg">Loading...</p>
  if (error) return <p className="status-msg error">{error}</p>

  const initials = (profile.display_name ?? '?')[0].toUpperCase()

  return (
    <div className="page">
      <main className="main-content">
        <header className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <h1 className="profile-name">{profile.display_name ?? 'Anonymous'}</h1>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
        </header>

        <section className="track-list-section">
          <h2>Tracks</h2>
          {tracks.length === 0 ? (
            <p className="empty-state">No tracks yet.</p>
          ) : (
            <ul className="track-list">
              {tracks.map((track, i) => (
                <TrackCard
                  key={track.id}
                  index={i}
                  title={track.title}
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

export default Profile
