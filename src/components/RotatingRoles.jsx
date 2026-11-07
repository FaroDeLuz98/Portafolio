import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

const ROLES = [
  'Desarrollador Web Trainee / Junior',
  'Perfil Híbrido: Informática + Comercio',
  'Sitios Web Claros & Sistemas con Datos',
  'Interfaces React, JS, PHP & MySQL',
];

/**
 * ROTATING ROLES · Rotador dinámico 3D orientado a empresas y clientes
 */
export default function RotatingRoles() {
  const [index, setIndex] = useState(0);
  const { isMinimalMotion } = usePreferences();

  useEffect(() => {
    if (isMinimalMotion) return undefined;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3400);
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
