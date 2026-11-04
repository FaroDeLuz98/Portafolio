import { technologies } from '../data/siteData.js';

/**
 * TECH MARQUEE · Cinta infinita de tecnologías
 * --------------------------------------------
 * Duplica la lista para que el bucle no tenga cortes visibles.
 * La segunda copia queda oculta para lectores de pantalla.
 */
export default function TechMarquee() {
  const loop = [...technologies, ...technologies];

  return (
    <div className="tech-band" aria-label="Tecnologías con las que trabajo">
      <div className="tech-track">
        {loop.map((tech, index) => (
          <span
            className="tech-item"
            key={`${tech}-${index}`}
            aria-hidden={index >= technologies.length ? 'true' : undefined}
          >
            {tech}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
