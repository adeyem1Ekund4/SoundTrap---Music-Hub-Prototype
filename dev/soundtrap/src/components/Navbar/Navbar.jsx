import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function Navbar() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">SoundTrap</Link>
      <div className="navbar-right">
        <button className="btn-theme" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀' : '☽'}
        </button>
        {user ? (
          <>
            <span className="navbar-user">{user.user_metadata?.display_name ?? user.email}</span>
            <button className="btn-signout" onClick={handleSignOut}>Log out</button>
          </>
        ) : (
          <Link to="/login" className="navbar-login">Log in</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
