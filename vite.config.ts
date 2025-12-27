import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

/**
 * Vite config (cleaned up)
 *
 * GitHub Pages note:
 * - If you publish as a project page (https://user.github.io/<repo>/), set VITE_BASE to "/<repo>/" when building.
 *   Example: VITE_BASE=/portfolio/ npm run build
 * - If you publish as a user page (https://user.github.io/), leave it as default ("/").
 */
export default defineConfig(({ command }) => ({
  base: command === 'build' ? (process.env.VITE_BASE || '/') : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
}));
