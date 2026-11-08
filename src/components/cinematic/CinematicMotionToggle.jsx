import { memo } from 'react';
import { MotionPlayIcon, MotionPauseIcon } from './CinematicIcons.jsx';

/**
 * Control global flotante para alternar animaciones cinemáticas en tiempo real.
 * Permanece visible y accesible durante toda la navegación (esquina inferior derecha).
 */
function CinematicMotionToggle({
  reducedMotion,
  onToggle,
}) {
  const isMotionActive = !reducedMotion;

  return (
    <aside
      className="cine-floating-control"
      aria-label="Control de efectos de movimiento y animaciones"
    >
      <button
        type="button"
        className={`cine-motion-toggle-pill${isMotionActive ? ' is-active' : ' is-reduced'}`}
        onClick={onToggle}
        aria-pressed={isMotionActive}
        title={
          isMotionActive
            ? 'Desactivar animaciones cinemáticas (modo lectura tranquila)'
            : 'Activar animaciones cinemáticas completas'
        }
      >
        <span className="cine-motion-toggle-pill__indicator" aria-hidden="true">
          <span className="cine-motion-toggle-pill__dot" />
        </span>

        <span className="cine-motion-toggle-pill__icon" aria-hidden="true">
          {isMotionActive ? (
            <MotionPlayIcon size={16} />
          ) : (
            <MotionPauseIcon size={16} />
          )}
        </span>

        <span className="cine-motion-toggle-pill__label">
          {isMotionActive ? 'Animaciones ON' : 'Animaciones OFF'}
        </span>
      </button>
    </aside>
  );
}

export default memo(CinematicMotionToggle);
