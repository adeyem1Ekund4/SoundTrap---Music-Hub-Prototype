# SoundTrap — Dev

The Tauri + React application for the SoundTrap Music Hub prototype.

## Tech Stack

- **Tauri v2** — native desktop shell (Rust backend)
- **React 18** — UI
- **Vite** — build tool
- **Supabase** — auth, database, and file storage

## Prerequisites

- [Node.js](https://nodejs.org) v18+
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri CLI prerequisites](https://tauri.app/start/prerequisites/)

## Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Then fill in your Supabase URL and anon key in .env
```

### Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key |

## Running

```bash
# Start in development mode (hot reload)
npm run tauri dev

# Build for production
npm run tauri build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar/
│   ├── Player/
│   ├── TrackCard/
│   └── Upload/
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Profile.jsx
├── lib/          # Supabase client and utilities
└── main.jsx
src-tauri/        # Rust/Tauri backend
```
