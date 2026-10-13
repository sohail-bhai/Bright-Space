import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        services: resolve(process.cwd(), 'services.html'),
        projects: resolve(process.cwd(), 'projects.html'),
        about: resolve(process.cwd(), 'about.html'),
        experience: resolve(process.cwd(), 'experience.html'),
        contact: resolve(process.cwd(), 'contact.html'),
      },
    },
  },
});
