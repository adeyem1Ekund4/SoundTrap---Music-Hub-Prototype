import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSignIn(e) {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  async function handleSignUp(e) {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="login-page">
      <h1 className="login-title">SoundTrap</h1>
      <form className="login-form">
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="login-error">{error}</p>}
        <div className="login-actions">
          <button type="button" className="btn-primary" onClick={handleSignIn}>
            Sign in
          </button>
          <button type="button" className="btn-secondary" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
