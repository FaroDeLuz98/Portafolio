import Reveal from './Reveal.jsx';

/**
 * SECTION HEADING · Encabezado reutilizable de sección
 * ----------------------------------------------------
 * Muestra el "kicker" (01 / SOBRE MÍ), el título y un texto opcional
 * a la derecha. Cada parte aparece con una pequeña animación escalonada.
 */
export default function SectionHeading({ kicker, title, highlight, aside }) {
  return (
    <div className="section-heading">
      <div>
        <Reveal className="section-kicker" y={12}>
          {kicker}
        </Reveal>
        <Reveal as="h2" delay={0.08} y={20}>
          {title}
          {highlight && <span> {highlight}</span>}
        </Reveal>
      </div>
      {aside && (
        <Reveal className="section-aside" delay={0.16} y={14}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}
