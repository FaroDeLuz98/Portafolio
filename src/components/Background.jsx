import { Suspense, lazy } from 'react';

const ThreeBackground = lazy(() => import('./ThreeBackground.jsx'));

/**
 * BACKGROUND · Lienzo atmosférico Obsidian + Grano editorial + Escena 3D WebGL
 * ----------------------------------------------------------------------------
 * Combina iluminación ambiental difusa, textura sutil de estudio, grilla
 * arquitectónica y la escena Three.js acoplada detrás de la interfaz.
 */
export default function Background() {
  return (
    <div className="page-background" aria-hidden="true">
      <div className="bg-aurora bg-aurora--one" />
      <div className="bg-aurora bg-aurora--two" />
      <div className="bg-aurora bg-aurora--three" />
      <div className="bg-grid" />
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      <div className="bg-noise" />
    </div>
  );
}
