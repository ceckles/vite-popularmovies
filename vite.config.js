import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For GitHub Pages: use '/repo-name/' if deploying to a subdirectory
  // For custom domain or root: use '/'
  // Set VITE_BASE_PATH in GitHub Actions secrets if you need to override
  base: process.env.VITE_BASE_PATH || (process.env.CI ? '/vite-popularmovies/' : '/'),
})
