import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Tilt3DCard from './Tilt3DCard.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * CODE WINDOW · Ventana de código con profundidad 3D acoplada a la interfaz
 * -------------------------------------------------------------------------
 * Al mover el cursor se inclina suavemente en 3D mostrando separación real
 * en el eje Z entre la placa trasera, el editor y los chips flotantes.
 */
export default function CodeWindow() {
  const [activeFile, setActiveFile] = useState('about');
  const { isMinimalMotion } = usePreferences();

  const files = {
    about: {
      filename: 'about-me.js',
      lang: 'JavaScript',
      status: 'UTF-8 · Ln 11',
      lines: [
        <>
          <span className="purple">const</span>{' '}
          <span className="blue">developer</span> = {'{'}
        </>,
        <>
          {'  '}name: <span className="lime">'Fernando Sisnande'</span>,
        </>,
        <>
          {'  '}location: <span className="lime">'Uruguay'</span>,
        </>,
        <>
          {'  '}role: <span className="lime">'Junior Developer'</span>,
        </>,
        <>
          {'  '}skills: [
        </>,
        <>
          {'    '}
          <span className="lime">'React'</span>,{' '}
          <span className="lime">'JavaScript'</span>,
        </>,
        <>
          {'    '}
          <span className="lime">'MySQL'</span>,{' '}
          <span className="lime">'CSS'</span>
        </>,
        <>
          {'  '}],
        </>,
        <>
          {'  '}mindset: <span className="lime">'Keep learning'</span>
        </>,
        <>{'};'}</>,
        <>
          <span className="comment">
            // Building my future, one commit at a time.
          </span>
        </>,
      ],
    },
    stack: {
      filename: 'stack.config.js',
      lang: 'ES Module',
      status: 'Vite 8 · Ready',
      lines: [
        <>
          <span className="purple">export default</span> {'{'}
        </>,
        <>
          {'  '}frontend: [<span className="lime">'HTML5'</span>,{' '}
          <span className="lime">'CSS3'</span>,{' '}
          <span className="lime">'React'</span>],
        </>,
        <>
          {'  '}backend: [<span className="lime">'PHP'</span>,{' '}
          <span className="lime">'MySQL'</span>,{' '}
          <span className="lime">'SQL'</span>],
        </>,
        <>
          {'  '}tools: [<span className="lime">'Git'</span>,{' '}
          <span className="lime">'GitHub'</span>,{' '}
          <span className="lime">'Vercel'</span>],
        </>,
        <>
          {'  '}education: <span className="lime">'UTU · 2026'</span>,
        </>,
        <>
          {'  '}available: <span className="purple">true</span>,
        </>,
        <>{'};'}</>,
        <>
          <span className="comment">
            // Proyectos reales y código mantenible.
          </span>
        </>,
      ],
    },
  };

  const current = files[activeFile];

  return (
    <Tilt3DCard className="editor-3d-rig" maxTilt={8} glare={false}>
      {/* Placa posterior en profundidad Z negativa para dar volumen 3D acoplado */}
      <div className="editor-depth-plate" aria-hidden="true" />

      <div className="editor">
        <span className="tilt-3d-glare" aria-hidden="true" />

        <div className="editor-bar">
          <div className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <div
            className="editor-tabs"
            role="tablist"
            aria-label="Archivos de código"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeFile === 'about'}
              className={`editor-tab${activeFile === 'about' ? ' is-active' : ''}`}
              onClick={() => setActiveFile('about')}
            >
              about-me.js
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFile === 'stack'}
              className={`editor-tab${activeFile === 'stack' ? ' is-active' : ''}`}
              onClick={() => setActiveFile('stack')}
            >
              stack.config.js
            </button>
          </div>

          <span className="editor-tag">{current.lang}</span>
        </div>

        <div className="editor-content" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFile}
              initial={isMinimalMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isMinimalMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {current.lines.map((line, index) => (
                <motion.div
                  key={index}
                  className="editor-line-row"
                  initial={isMinimalMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.26,
                    delay: isMinimalMotion ? 0 : index * 0.028,
                  }}
                >
                  <span className="line">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {line}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="editor-status" aria-hidden="true">
          <span>● {current.lang}</span>
          <span>{current.status}</span>
        </div>
      </div>

      {/* Chips flotando en un plano Z superior (paralaje 3D natural al inclinar) */}
      <FloatingChips />
    </Tilt3DCard>
  );
}

/**
 * FLOATING CHIPS · Etiquetas flotantes en plano Z elevado alrededor del editor
 */
export function FloatingChips() {
  const { isMinimalMotion } = usePreferences();

  const float = (duration, delay = 0) =>
    isMinimalMotion
      ? {}
      : {
          y: [0, -8, 0],
          rotate: [0, 1.4, 0],
          transition: {
            duration,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };

  return (
    <div className="floating-chips-layer" aria-hidden="true">
      <motion.span className="floating-chip chip-one" animate={float(5.4)}>
        &lt;build /&gt;
      </motion.span>
      <motion.span
        className="floating-chip chip-two"
        animate={float(6.4, 0.8)}
      >
        git commit -m &quot;grow&quot;
      </motion.span>
      <motion.span
        className="floating-chip chip-three"
        animate={float(7, 1.4)}
      >
        npm run dev
      </motion.span>
    </div>
  );
}
