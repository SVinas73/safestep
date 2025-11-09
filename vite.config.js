import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/safestep/', // ⚠️ IMPORTANTE: coincide con tu homepage
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})