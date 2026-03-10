import path from 'path';

import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
// import checker from 'vite-plugin-checker'

export default defineConfig({
  base: '/hold-the-paw-fe/',
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
