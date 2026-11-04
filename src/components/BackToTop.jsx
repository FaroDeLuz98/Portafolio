import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpIcon } from './Icons.jsx';

/**
 * BACK TO TOP · Botón flotante "volver arriba"
 * --------------------------------------------
 * Aparece cuando el usuario bajó más de 500px y vuelve al inicio
 * con un scroll suave. Se anima al entrar y salir con AnimatePresence.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll(); // revisa el estado inicial (por si se recarga a mitad de página)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-to-top"
          aria-label="Volver al inicio"
          onClick={goTop}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
        >
          <ArrowUpIcon size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
