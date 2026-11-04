import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Configuración de Vite (el empaquetador del proyecto).
 * - El plugin de React permite usar JSX y Fast Refresh mientras desarrollás.
 * - `server.port` fija el puerto local en 5173.
 * - `build.outDir` deja el sitio listo para Vercel dentro de /dist.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
