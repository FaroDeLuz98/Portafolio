import { motion, useReducedMotion } from 'framer-motion';

/**
 * CODE WINDOW · Ventana de código decorativa del hero
 * ---------------------------------------------------
 * Es solo visual (aria-hidden). El HTML está dividido en líneas para
 * poder colorear cada parte como si fuera un editor real.
 */
export default function CodeWindow() {
  const reduceMotion = useReducedMotion();

  const lines = [
    <>
      <span className="purple">const</span> <span className="blue">developer</span> = {'{'}
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
      {'    '}<span className="lime">'React'</span>, <span className="lime">'JavaScript'</span>,
    </>,
    <>
      {'    '}<span className="lime">'MySQL'</span>, <span className="lime">'CSS'</span>
    </>,
    <>
      {'  '}],
    </>,
    <>
      {'  '}mindset: <span className="lime">'Keep learning'</span>
    </>,
    <>{'};'}</>,
    <>
      <span className="comment">// Building my future, one commit at a time.</span>
    </>,
  ];

  return (
    <div className="editor">
      <div className="editor-bar">
        <div className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>about-me.js</span>
        <span className="editor-tag">JavaScript</span>
      </div>

      <div className="editor-content">
        {lines.map((line, index) => (
          <div key={index}>
            <span className="line">{String(index + 1).padStart(2, '0')}</span>
            {line}
          </div>
        ))}
      </div>

      <div className="editor-status">
        <span>● JavaScript</span>
        <span>UTF-8 · Ln 11</span>
      </div>
    </div>
  );
}

/**
 * FLOATING CHIPS · Etiquetas flotantes alrededor del editor
 * --------------------------------------------------------
 * Se mueven en un bucle suave. Si el visitante prefiere menos
 * movimiento, quedan quietas.
 */
export function FloatingChips() {
  const reduceMotion = useReducedMotion();

  const float = (duration, delay = 0) =>
    reduceMotion
      ? {}
      : {
          y: [0, -9, 0],
          rotate: [0, 1.5, 0],
          transition: {
            duration,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };

  return (
    <>
      <motion.span
        className="floating-chip chip-one"
        animate={float(5.5)}
        aria-hidden="true"
      >
        &lt;build /&gt;
      </motion.span>
      <motion.span
        className="floating-chip chip-two"
        animate={float(6.5, 0.8)}
        aria-hidden="true"
      >
        git commit -m "grow"
      </motion.span>
      <motion.span
        className="floating-chip chip-three"
        animate={float(7, 1.4)}
        aria-hidden="true"
      >
        npm run dev
      </motion.span>
    </>
  );
}
