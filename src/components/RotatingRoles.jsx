import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

const ROLES = [
  'Desarrollador Web Junior',
  'Interfaces React & Experiencias 3D',
  'Diseño Frontend & UI / UX',
  'Soluciones con PHP, MySQL & SQL',
];

/**
 * ROTATING ROLES · Rotador dinámico 3D de especialidades en el Hero
 * -----------------------------------------------------------------
 * Alterna suavemente los perfiles de Fernando con un giro 3D en eje X.
 */
export default function RotatingRoles() {
  const [index, setIndex] = useState(0);
  const { isMinimalMotion } = usePreferences();

  useEffect(() => {
    if (isMinimalMotion) return undefined;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [isMinimalMotion]);

  if (isMinimalMotion) {
    return <span className="rotating-role-static">{ROLES[0]}</span>;
  }

  return (
    <span className="rotating-role-wrap" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          className="rotating-role-item"
          initial={{ opacity: 0, y: 14, rotateX: -75, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, rotateX: 75, filter: 'blur(4px)' }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
