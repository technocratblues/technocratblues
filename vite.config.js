import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ensures the dev server falls back to index.html for all routes (SPA routing)
  server: {
    historyApiFallback: true,
  },
  preview: {
    port: 4173,
  },
})
