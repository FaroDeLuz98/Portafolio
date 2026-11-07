import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * TILT 3D CARD · Tarjeta con perspectiva e inclinación física en 3D
 * -----------------------------------------------------------------
 * Calcula la rotación X e Y según la posición del cursor usando springs
 * de Framer Motion y proyecta un reflejo especular sobre la superficie.
 */
export default function Tilt3DCard({
  children,
  className = '',
  style,
  maxTilt = 7.5,
  as = 'div',
  glare = true,
  ...rest
}) {
  const cardRef = useRef(null);
  const { effectiveMotion } = usePreferences();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 240, damping: 22, mass: 0.6 });
  const rotateY = useSpring(rawRotateY, { stiffness: 240, damping: 22, mass: 0.6 });

  const MotionTag = motion[as] || motion.div;
  const tiltDisabled = effectiveMotion === 'minimal';
  const effectiveMax = effectiveMotion === 'subtle' ? maxTilt * 0.45 : maxTilt;

  const handlePointerMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    // Variables CSS para spotlight y reflejo especular sin re-renders
    cardRef.current.style.setProperty('--mx', `${px}px`);
    cardRef.current.style.setProperty('--my', `${py}px`);

    if (tiltDisabled) return;

    const normX = px / rect.width - 0.5;
    const normY = py / rect.height - 0.5;

    rawRotateX.set(-normY * effectiveMax * 2);
    rawRotateY.set(normX * effectiveMax * 2);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <MotionTag
      ref={cardRef}
      className={`tilt-3d-card ${className}`.trim()}
      style={{
        ...style,
        transformPerspective: 1150,
        rotateX: tiltDisabled ? 0 : rotateX,
        rotateY: tiltDisabled ? 0 : rotateY,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      {glare && <span className="tilt-3d-glare" aria-hidden="true" />}
      {children}
    </MotionTag>
  );
}
