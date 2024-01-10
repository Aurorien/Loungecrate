import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
import istanbul from 'vite-plugin-istanbul'

dns.setDefaultResultOrder('ipv4first')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.NODE_ENV === 'test' &&
      istanbul({
        cypress: true,
        requireEnv: false,
        include: 'src/*',
        exclude: ['node_modules', 'test/'],
        extension: ['.js', '.ts', '.tsx']
      })
  ],
  server: {
    proxy: {
      '/login': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
      '/myevents': 'http://localhost:3000',
      '/dropdown-data': 'http://localhost:3000'
    }
  },
  build: {
    sourcemap: true
  }
})
