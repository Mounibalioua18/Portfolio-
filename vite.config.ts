
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion', 'lucide-react'],
          'firebase-bundle': ['firebase/app', 'firebase/database']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  define: {
    'process.env': {}
  }
});
