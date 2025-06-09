import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MyPortfolio/', // Base path for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    devSourcemap: true,
    postcss: './postcss.config.cjs',
  },
  optimizeDeps: {
    include: ['@heroicons/react/24/outline', '@headlessui/react'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
})
