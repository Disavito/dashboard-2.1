import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    // This configuration makes the file watcher more resilient
    // and less likely to trigger a full reload on tab focus change.
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@tanstack/react-table'],
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
	preview: {
    host: true,
    allowedHosts: ['n8n-dashboard.mv7mvl.easypanel.host']
  }
});
