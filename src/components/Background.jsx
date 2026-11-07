import { Suspense, lazy } from 'react';

const ThreeBackground = lazy(() => import('./ThreeBackground.jsx'));

/**
 * BACKGROUND · Fondo decorativo global + Escena 3D WebGL diferida
 * ---------------------------------------------------------------
 * Carga Three.js en un chunk asíncrono separado para que el primer
 * render de la interfaz sea instantáneo.
 */
export default function Background() {
  return (
    <div className="page-background" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-orb bg-orb--green" />
      <div className="bg-orb bg-orb--blue" />
      <div className="bg-orb bg-orb--pink" />
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
    </div>
  );
}
