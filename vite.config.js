import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For GitHub Pages: use '/repo-name/' if deploying to a subdirectory
  // For custom domain or root: use '/'
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/vite-popularmovies/' : '/'),
})
