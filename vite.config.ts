import path from 'path';

import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
// import checker from 'vite-plugin-checker'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    // checker({
    //   typescript: { tsconfigPath: 'tsconfig.json' },
    //   eslint: {
    //     lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
    //     useFlatConfig: true, // Підтримка eslint.config.js
    //   },
    // }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
      },
      '/media': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
