import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * CURSOR GLOW · Halo de luz ambiental + anillo interactivo de precisión
 * --------------------------------------------------------------------
 * Solo se activa en dispositivos con puntero fino (mouse/trackpad) y cuando
 * las animaciones están habilitadas. Se expande sobre elementos interactivos.
 */
export default function CursorGlow() {
  const { effectiveMotion } = usePreferences();
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const ringX = useSpring(mouseX, { stiffness: 420, damping: 32, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 420, damping: 32, mass: 0.35 });
  const auraX = useSpring(mouseX, { stiffness: 120, damping: 26, mass: 0.8 });
  const auraY = useSpring(mouseY, { stiffness: 120, damping: 26, mass: 0.8 });

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled || effectiveMotion === 'minimal') return undefined;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target;
      if (target instanceof Element) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, [role="button"], .hero-3d-canvas, .tech-sphere-3d'
          )
        );
        setHovered(isInteractive);
      }
    };

    const onLeaveWindow = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [enabled, effectiveMotion, mouseX, mouseY, visible]);

  if (!enabled || effectiveMotion === 'minimal') return null;

  return (
    <div
      className={`cursor-system${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      <motion.div
        className="cursor-aura"
        style={{ x: auraX, y: auraY }}
      />
      {effectiveMotion === 'full' && (
        <motion.div
          className={`cursor-ring${hovered ? ' is-hovered' : ''}`}
          style={{ x: ringX, y: ringY }}
        />
      )}
    </div>
  );
}
