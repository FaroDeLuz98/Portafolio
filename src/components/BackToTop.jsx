import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpIcon } from './Icons.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * BACK TO TOP · Botón flotante "volver arriba"
 * --------------------------------------------
 * Aparece cuando el usuario bajó más de 500px y vuelve al inicio
 * con un scroll suave. Se anima al entrar y salir con AnimatePresence.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { isMinimalMotion } = usePreferences();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: isMinimalMotion ? 'auto' : 'smooth',
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
          whileHover={isMinimalMotion ? undefined : { y: -4, scale: 1.06 }}
        >
          <ArrowUpIcon size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
