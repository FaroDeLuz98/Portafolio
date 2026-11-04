import { motion, useReducedMotion } from 'framer-motion';

/**
 * REVEAL · Animación de aparición al hacer scroll
 * ------------------------------------------------
 * Envuelve cualquier contenido y lo muestra con un fade + desplazamiento
 * vertical cuando entra en el viewport.
 *
 * Props:
 * - delay: retraso en segundos (para efectos escalonados).
 * - y: cuántos píxeles se desplaza al aparecer.
 * - once: si la animación se ejecuta solo la primera vez.
 * - amount: porcentaje del elemento visible antes de animar.
 * - as: etiqueta HTML a renderizar (div, section, h2, li...).
 *
 * Si el usuario tiene activado "reducir movimiento", se muestra sin animar.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
  once = true,
  amount = 0.2,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
