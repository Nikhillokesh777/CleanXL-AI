import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      tslib: path.resolve(__dirname, 'node_modules/tslib/tslib.es6.js'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
