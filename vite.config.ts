import { defineConfig } from 'vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  return {
    plugins: [svgr(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
      },
    },
    build: {
      outDir: '../strategle-backend/public',
    },
    server: {
      host: true,
      port: 8000,
      proxy: {
        '^/api': {
          target: mode === 'development' ? 'http://localhost:3000' : '/',
          rewrite: path => path.replace(/^\/api/, ''),
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '^/images': {
          target: mode === 'development' ? 'http://localhost:3000' : '/',
          changeOrigin: true,
          secure: false,
        }
      }
    },
  }
})
