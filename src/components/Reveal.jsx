import { motion } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * REVEAL · Animación de aparición al hacer scroll
 * ------------------------------------------------
 * Envuelve cualquier contenido y lo muestra con un fade + desplazamiento
 * vertical y desenfoque sutil cuando entra en el viewport.
 * Respeta tanto el sistema operativo como el configurador de animaciones.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
  once = true,
  amount = 0.18,
  as = 'div',
}) {
  const { isMinimalMotion, effectiveMotion } = usePreferences();
  const MotionTag = motion[as] || motion.div;
  const actualY = effectiveMotion === 'subtle' ? y * 0.5 : y;

  return (
    <MotionTag
      className={className}
      initial={isMinimalMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {
          opacity: 0,
          y: actualY,
          filter: effectiveMotion === 'full' ? 'blur(5px)' : 'blur(0px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: isMinimalMotion ? 0 : 0.72,
            delay: isMinimalMotion ? 0 : delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
