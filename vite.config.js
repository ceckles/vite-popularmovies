import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages base path - MUST match repository name
  // Override with VITE_BASE_PATH env var if needed
  base: process.env.VITE_BASE_PATH || '/vite-popularmovies/',
})
