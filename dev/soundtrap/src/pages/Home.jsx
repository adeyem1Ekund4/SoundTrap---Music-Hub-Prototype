import PreviewPanel from '../components/PreviewPanel/PreviewPanel'

function Home() {
  return (
    <div className="page">
      <main className="main-content">
        <header className="home-hero">
          <h1 className="home-hero-title">Discover</h1>
          <p className="home-hero-sub">Featured tracks — click to preview</p>
        </header>
        <PreviewPanel />
      </main>
    </div>
  )
}

export default Home
