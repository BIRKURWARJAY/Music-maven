import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'music-backend-ftw76mys0-birkurwar-jays-projects.vercel.app',
        changeOrigin: true,
      }
    }
  },
   build: {
    target: 'es2022', // or 'esnext' if you prefer
  },
  plugins: [react()],
})
