import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Explicitly off: keeps source maps out of the production deploy.
    sourcemap: false,
  },
})
