import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * SCROLL PROGRESS · Barra de progreso de lectura
 * ----------------------------------------------
 * Una línea fina en la parte superior que se completa a medida
 * que el visitante baja por la página. Usa un spring para que el
 * movimiento se sienta suave y no "pegajoso".
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
