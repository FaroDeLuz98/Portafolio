import { motion } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * KINETIC TEXT · Animación tipográfica 3D por caracteres o palabras
 * -----------------------------------------------------------------
 * - Entrada escalonada con rotación 3D en eje X (perspectiva real).
 * - Modo interactivo: cada letra salta y brilla suavemente al pasar el cursor.
 * - Accesible: mantiene aria-label completo para lectores de pantalla.
 */
export default function KineticText({
  text,
  className = '',
  mode = 'chars', // 'chars' | 'words'
  delay = 0,
  stagger = 0.026,
  interactive = true,
  once = true,
}) {
  const { isMinimalMotion, prefs } = usePreferences();

  if (isMinimalMotion || !prefs.kineticLetters) {
    return <span className={className}>{text}</span>;
  }

  if (mode === 'words') {
    const words = text.split(' ');
    return (
      <span className={`kinetic-words ${className}`.trim()} aria-label={text}>
        {words.map((word, idx) => (
          <span className="kinetic-word-mask" key={`${word}-${idx}`} aria-hidden="true">
            <motion.span
              className="kinetic-word"
              initial={{ opacity: 0, y: '95%', rotateX: -65 }}
              whileInView={{ opacity: 1, y: '0%', rotateX: 0 }}
              viewport={{ once, amount: 0.1 }}
              transition={{
                duration: 0.65,
                delay: delay + idx * 0.065,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {idx < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // Modo caracteres: separa por palabras para no cortar palabras a mitad de renglón
  const words = text.split(' ');
  let charGlobalIndex = 0;

  return (
    <span className={`kinetic-chars ${className}`.trim()} aria-label={text}>
      {words.map((word, wIdx) => (
        <span className="kinetic-word-group" key={`${word}-${wIdx}`} aria-hidden="true">
          {Array.from(word).map((char, cIdx) => {
            const currentIndex = charGlobalIndex;
            charGlobalIndex += 1;
            return (
              <motion.span
                key={`${char}-${cIdx}`}
                className={`kinetic-char${interactive ? ' is-interactive' : ''}`}
                initial={{ opacity: 0, y: 26, rotateX: -80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once, amount: 0.1 }}
                transition={{
                  duration: 0.58,
                  delay: delay + currentIndex * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  interactive
                    ? {
                        y: -6,
                        scale: 1.12,
                        rotateZ: currentIndex % 2 === 0 ? -3 : 3,
                        transition: { type: 'spring', stiffness: 450, damping: 14 },
                      }
                    : undefined
                }
              >
                {char}
              </motion.span>
            );
          })}
          {wIdx < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}
