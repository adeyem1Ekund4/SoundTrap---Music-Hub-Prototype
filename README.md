# SoundTrap — Music Hub Prototype

A desktop music-sharing application prototype built to explore what a native, cross-platform music hub could look like for independent artists and listeners.

## What It Is

SoundTrap is a proof-of-concept desktop app where users can upload tracks, browse music, and manage a personal profile — all from a native desktop experience powered by Tauri.

## Goals

- Validate the core UX of a desktop-first music platform
- Explore Supabase as a backend for auth, storage, and real-time data
- Build a foundation that can be iterated into a full product

## Stack

| Layer | Technology |
|---|---|
| Desktop shell | [Tauri v2](https://tauri.app) (Rust) |
| Frontend | React + Vite |
| Backend / DB | [Supabase](https://supabase.com) (Postgres + Storage) |
| Styling | CSS Modules |

## Structure

```
soundtrap-prototype/
├── dev/soundtrap/     # Main application source (Tauri + React)
├── docs/              # Design notes and planning docs
└── README.md          # This file
```

## Status

Prototype — in active development.
