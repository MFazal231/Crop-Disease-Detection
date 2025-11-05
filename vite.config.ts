import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Crop Disease Detector',
        short_name: 'CropDetect',
        description: 'AI Crop Disease Detection with offline support',
        theme_color: '#16a34a',
        background_color: '#f0fdf4',
        display: 'standalone',
        icons: [
          { src: '/vite.svg', sizes: '192x192', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|png|svg|jpg|jpeg|webp|woff2)$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'static-assets' },
          },
          {
            urlPattern: /^https:\/\/(cdn\.jsdelivr\.net|unpkg\.com|fonts\.gstatic\.com)\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'external-cdn' },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})