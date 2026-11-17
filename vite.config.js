import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { secureMediaVaultPlugin } from './src/security/secureMediaPlugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), secureMediaVaultPlugin()],
  base: './',
  server: {
    port: 3000,
    open: true,
  },
  esbuild: {
    legalComments: 'none',
    drop: ['debugger'],
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Opaque hashed filenames to obscure module names & internal structure in DevTools
        entryFileNames: 'assets/m-[hash].js',
        chunkFileNames: 'assets/c-[hash].js',
        assetFileNames: 'assets/a-[hash][extname]',
        manualChunks: {
          v3: ['three'],
          vr: ['react', 'react-dom', 'react-router-dom'],
          vu: ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
});
