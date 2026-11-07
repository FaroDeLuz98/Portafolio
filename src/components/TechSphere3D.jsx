import { useEffect, useRef, useState } from 'react';
import { usePreferences } from '../context/PreferencesContext.jsx';

const SPHERE_TAGS = [
  'React',
  'JavaScript',
  'HTML5',
  'CSS3',
  'PHP',
  'MySQL',
  'SQL',
  'Three.js',
  'Framer Motion',
  'Git',
  'GitHub',
  'Vite',
  'Vercel',
  'VS Code',
  'XAMPP',
  'UI / UX',
  'Diseño responsive',
];

/**
 * TECH SPHERE 3D · Esfera 3D libre en 360° + Explicación al tocar
 * ---------------------------------------------------------------
 * - Arrastrá con clic sostenido o dedo para moverte libremente en 360°.
 * - Hacé clic (sin arrastrar) sobre cualquier lenguaje para ver al instante
 *   en lenguaje claro para qué sirve.
 */
export default function TechSphere3D({ selectedTech, onSelectTech }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const { isMinimalMotion } = usePreferences();
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const rotateFnRef = useRef(null);
  const dragDistanceRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const count = SPHERE_TAGS.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    const points = SPHERE_TAGS.map((_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return {
        x: Math.cos(theta) * radiusAtY,
        y,
        z: Math.sin(theta) * radiusAtY,
      };
    });

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0.002;
    let velY = 0.0038;
    let hoverBiasX = 0;
    let hoverBiasY = 0;

    const rotatePoints = (angleX, angleY) => {
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;
        const x2 = p.x * cosY + z1 * sinY;
        const z2 = -p.x * sinY + z1 * cosY;

        p.x = x2;
        p.y = y1;
        p.z = z2;
      }
    };

    rotateFnRef.current = (ax, ay) => {
      rotatePoints(ax, ay);
      velX = ax * 0.5;
      velY = ay * 0.5;
    };

    const renderPositions = () => {
      const rect = container.getBoundingClientRect();
      const rx = Math.max(88, rect.width * 0.36);
      const ry = Math.max(72, rect.height * 0.36);

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        const el = itemRefs.current[i];
        if (!el) continue;

        const depth = (p.z + 1.35) / 2.35;
        const scale = 0.7 + depth * 0.42;
        const opacity = 0.28 + depth * 0.72;
        const tx = p.x * rx;
        const ty = p.y * ry;

        el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(
          1
        )}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(2);
        el.style.zIndex = String(Math.round(depth * 100));
        el.dataset.front = p.z > 0.2 ? 'true' : 'false';
      }
    };

    let rafId = 0;
    const loop = () => {
      if (!dragging) {
        const baseX = (isMinimalMotion ? 0 : 0.0015) + hoverBiasX;
        const baseY = (isMinimalMotion ? 0 : 0.0028) + hoverBiasY;
        velX = velX * 0.94 + baseX * 0.06;
        velY = velY * 0.94 + baseY * 0.06;
        if (Math.abs(velX) > 0.00005 || Math.abs(velY) > 0.00005) {
          rotatePoints(velX, velY);
        }
      }
      renderPositions();
      rafId = window.requestAnimationFrame(loop);
    };

    const onPointerDown = (e) => {
      e.stopPropagation();
      dragging = true;
      dragDistanceRef.current = 0;
      setIsDragging(true);
      setHasInteracted(true);
      lastX = e.clientX;
      lastY = e.clientY;
      // No capturamos el puntero si se presionó un botón para permitir onClick limpio
      if (!(e.target instanceof Element && e.target.closest('button'))) {
        container.setPointerCapture?.(e.pointerId);
      }
    };

    const onPointerMove = (e) => {
      e.stopPropagation();
      const rect = container.getBoundingClientRect();

      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        dragDistanceRef.current += Math.hypot(dx, dy);

        const stepY = dx * 0.01;
        const stepX = -dy * 0.01;
        rotatePoints(stepX, stepY);

        velY = stepY * 0.85;
        velX = stepX * 0.85;
        return;
      }

      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      hoverBiasY = nx * 0.01;
      hoverBiasX = -ny * 0.008;
    };

    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      setIsDragging(false);
      if (e?.pointerId != null && container.hasPointerCapture?.(e.pointerId)) {
        container.releasePointerCapture?.(e.pointerId);
      }
    };

    const onPointerLeave = () => {
      hoverBiasX = 0;
      hoverBiasY = 0;
      if (dragging) {
        dragging = false;
        setIsDragging(false);
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);
    container.addEventListener('pointerleave', onPointerLeave);

    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', endDrag);
      container.removeEventListener('pointercancel', endDrag);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [isMinimalMotion]);

  const handleKeyDown = (e) => {
    const step = 0.14;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      rotateFnRef.current?.(0, -step);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      rotateFnRef.current?.(0, step);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      rotateFnRef.current?.(step, 0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      rotateFnRef.current?.(-step, 0);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`tech-sphere-3d${isDragging ? ' is-dragging' : ''}`}
      aria-label="Esfera interactiva 3D de tecnologías. Arrastrá para girar o presioná un lenguaje para ver su explicación."
    >
      <div className="tech-sphere-core" aria-hidden="true" />
      <div className="tech-sphere-orbit-ring" aria-hidden="true" />

      {SPHERE_TAGS.map((tag, idx) => (
        <button
          key={tag}
          type="button"
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          className={`tech-sphere-tag${
            selectedTech === tag ? ' is-selected' : ''
          }`}
          title={`Clic para saber para qué sirve ${tag}`}
          onClick={(e) => {
            e.stopPropagation();
            if (dragDistanceRef.current > 6) return;
            onSelectTech?.(tag);
          }}
        >
          {tag}
        </button>
      ))}

      <span
        className={`tech-sphere-hint${hasInteracted ? ' is-faded' : ''}`}
        aria-hidden="true"
      >
        ⟲ Arrastrá en 360° · Clic en un lenguaje para ver qué hace
      </span>
    </div>
  );
}
