import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * ANIMATED COUNTER · Contador numérico fluido al entrar en pantalla
 * -----------------------------------------------------------------
 * Ideal para estadísticas rápidas y métricas de GitHub.
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 1100,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { isMinimalMotion } = usePreferences();

  const numericTarget = Number(value);
  const isValidNumber = Number.isFinite(numericTarget);
  const startValue =
    isValidNumber && numericTarget > 1900 ? numericTarget - 24 : 0;

  const [current, setCurrent] = useState(
    isMinimalMotion || !isValidNumber ? value : startValue
  );

  useEffect(() => {
    if (!isValidNumber) {
      setCurrent(value);
      return undefined;
    }
    if (isMinimalMotion) {
      setCurrent(numericTarget);
      return undefined;
    }
    if (!inView) return undefined;

    let rafId = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Curva easeOutExpo suave
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const nextVal = Math.round(
        startValue + (numericTarget - startValue) * eased
      );
      setCurrent(nextVal);
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [duration, inView, isMinimalMotion, isValidNumber, numericTarget, startValue, value]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}
