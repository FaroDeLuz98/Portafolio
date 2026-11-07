import Reveal from './Reveal.jsx';
import KineticText from './KineticText.jsx';
import ScrambleText from './ScrambleText.jsx';

/**
 * SECTION HEADING · Encabezado reutilizable con tipografía cinética 3D
 * --------------------------------------------------------------------
 * El "kicker" se decodifica estilo terminal y el título despliega sus
 * palabras y caracteres destacados con perspectiva 3D.
 */
export default function SectionHeading({ kicker, title, highlight, aside }) {
  return (
    <div className="section-heading">
      <div>
        <Reveal className="section-kicker" y={12}>
          <ScrambleText text={kicker} />
        </Reveal>
        <h2 className="section-title-3d">
          <KineticText text={title} mode="words" delay={0.04} />
          {highlight && (
            <>
              {' '}
              <span className="section-highlight">
                <KineticText
                  text={highlight}
                  mode="chars"
                  delay={0.16}
                  stagger={0.032}
                  interactive
                />
              </span>
            </>
          )}
        </h2>
      </div>
      {aside && (
        <Reveal className="section-aside" delay={0.16} y={14}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}
