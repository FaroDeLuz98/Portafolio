import { technologies } from '../data/siteData.js';

/**
 * TECH MARQUEE · Doble cinta infinita de tecnologías en sentidos opuestos
 * -----------------------------------------------------------------------
 * Duplica la lista para que el bucle no tenga cortes visibles y ofrece
 * micro-interacción luminosa al pasar el puntero sobre cada tecnología.
 */
export default function TechMarquee() {
  const loop = [...technologies, ...technologies];
  const reverse = [...technologies].reverse();
  const reverseLoop = [...reverse, ...reverse];

  return (
    <div className="tech-band" aria-label="Tecnologías con las que trabajo">
      <div className="tech-track">
        {loop.map((tech, index) => (
          <span
            className="tech-item"
            key={`fwd-${tech}-${index}`}
            aria-hidden={index >= technologies.length ? 'true' : undefined}
          >
            <span className="tech-item-pill">{tech}</span>
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>

      <div className="tech-track tech-track--reverse" aria-hidden="true">
        {reverseLoop.map((tech, index) => (
          <span className="tech-item tech-item--subtle" key={`rev-${tech}-${index}`}>
            <span>{tech}</span>
            <i>◆</i>
          </span>
        ))}
      </div>
    </div>
  );
}
