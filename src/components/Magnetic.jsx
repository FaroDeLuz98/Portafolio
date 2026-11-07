import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * MAGNETIC · Atracción magnética elástica para botones y enlaces clave
 * -------------------------------------------------------------------
 * Desplaza ligeramente el elemento hacia el puntero al acercarse,
 * devolviéndolo con física de resorte al salir.
 */
export default function Magnetic({
  children,
  strength = 0.28,
  className = '',
}) {
  const ref = useRef(null);
  const { effectiveMotion } = usePreferences();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 });

  if (effectiveMotion !== 'full') {
    return <span className={`magnetic-wrap ${className}`.trim()}>{children}</span>;
  }

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`magnetic-wrap ${className}`.trim()}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.span>
  );
}
