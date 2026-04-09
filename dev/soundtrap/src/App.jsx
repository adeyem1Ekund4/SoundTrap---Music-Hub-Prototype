import { supabase } from './lib/supabase'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from('tracks').select('*')
      console.log('connection test:', data, error)
    }
    test()
  }, [])

  return <div>SoundTrap</div>
}

export default App