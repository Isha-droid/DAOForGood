import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// Define your Vite configuration
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    // Configure the server settings
    proxy: {
      '/api':  'http://localhost:5000', // Your backend server URL
      },
    },
  },
);
