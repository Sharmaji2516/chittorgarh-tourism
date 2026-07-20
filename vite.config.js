import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    port: 3000
  },
  optimizeDeps: {
    include: ['html2pdf.js']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    // Raise chunk warning threshold to avoid noise
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Fine-grained manual chunks to minimize initial mobile parse time
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // React core — tiny, loaded first, cached forever
          if (id.includes('react-dom') || id.includes('react/') || id.includes('scheduler')) return 'vendor-react';
          // React Router
          if (id.includes('react-router')) return 'vendor-router';
          // Framer Motion — heavy animation lib
          if (id.includes('framer-motion')) return 'vendor-framer';
          // Firebase — very large, deferred to admin/booking flows
          if (id.includes('firebase')) return 'vendor-firebase';
          // Leaflet / React-Leaflet — only on HowToReach page
          if (id.includes('leaflet')) return 'vendor-maps';
          // Lucide icons — tree-shaken per page
          if (id.includes('lucide-react')) return 'vendor-icons';
          // React Helmet — small SEO lib
          if (id.includes('react-helmet')) return 'vendor-helmet';
          // HTML2PDF — only used in admin/verification pages
          if (id.includes('html2pdf') || id.includes('jspdf') || id.includes('html2canvas')) return 'vendor-pdf';
          // Small utilities (clsx, tailwind-merge) stay in main index chunk
          // to avoid circular dependency issues
        }
      }
    }
  }
})
