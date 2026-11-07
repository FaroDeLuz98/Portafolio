import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>[]{}_*#$';

/**
 * SCRAMBLE TEXT · Decodificación estilo terminal de desarrollo
 * ------------------------------------------------------------
 * Descifra progresivamente los caracteres al entrar en pantalla
 * y opcionalmente al pasar el cursor por encima.
 */
export default function ScrambleText({
  text,
  className = '',
  hoverReplay = true,
  speed = 26,
}) {
  const spanRef = useRef(null);
  const isInView = useInView(spanRef, { once: true, amount: 0.4 });
  const { isMinimalMotion, prefs } = usePreferences();
  const [display, setDisplay] = useState(text);
  const timerRef = useRef(null);

  const runScramble = useCallback(() => {
    if (isMinimalMotion || !prefs.kineticLetters) {
      setDisplay(text);
      return;
    }

    window.clearInterval(timerRef.current);
    let iteration = 0;

    timerRef.current = window.setInterval(() => {
      const next = text
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '·' || char === '/') return char;
          if (index < iteration) return text[index];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplay(next);
      iteration += 0.45;

      if (iteration >= text.length) {
        window.clearInterval(timerRef.current);
        setDisplay(text);
      }
    }, speed);
  }, [isMinimalMotion, prefs.kineticLetters, speed, text]);

  useEffect(() => {
    if (isInView) {
      runScramble();
    }
    return () => window.clearInterval(timerRef.current);
  }, [isInView, runScramble]);

  return (
    <span
      ref={spanRef}
      className={`scramble-text ${className}`.trim()}
      aria-label={text}
      onMouseEnter={hoverReplay ? runScramble : undefined}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
