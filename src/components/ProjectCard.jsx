import Reveal from './Reveal.jsx';
import Tilt3DCard from './Tilt3DCard.jsx';
import { ArrowUpRightIcon, EyeIcon } from './Icons.jsx';

/**
 * PROJECT CARD · Tarjeta de proyecto con inclinación 3D y capas de profundidad
 * ----------------------------------------------------------------------------
 * - Aparece al hacer scroll (Reveal).
 * - Se inclina físicamente en 3D siguiendo el puntero (Tilt3DCard).
 * - Proyecta un spotlight radial del color de identidad de cada proyecto.
 * - Incluye botón de "Vista rápida" para abrir el modal interactivo.
 */
export default function ProjectCard({ project, index, onPreview }) {
  return (
    <Reveal className="project-reveal" delay={index * 0.08} amount={0.12}>
      <Tilt3DCard
        as="article"
        maxTilt={6.5}
        className="project-card"
        style={{
          '--accent': project.accent,
          '--accent-rgb': project.accentRgb,
        }}
      >
        {/* Brillo radial que sigue al cursor */}
        <span className="project-spotlight" aria-hidden="true" />

        <div
          className="project-visual"
          onClick={() => onPreview?.(project)}
          role="button"
          tabIndex={0}
          aria-label={`Abrir vista rápida de ${project.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPreview?.(project);
            }
          }}
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            width="1600"
            height="900"
          />
          <span className="project-index" aria-hidden="true">
            {project.number}
          </span>
          <span className="project-visual-badge" aria-hidden="true">
            <EyeIcon size={14} /> Vista rápida
          </span>
        </div>

        <div className="project-info">
          <div className="project-top">
            <span className="project-type">{project.category}</span>
            <span className="project-number" aria-hidden="true">
              {project.number}
            </span>
          </div>

          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="project-footer">
            <a
              className="project-link"
              href={project.url}
              target={project.external ? '_blank' : undefined}
              rel={project.external ? 'noopener noreferrer' : undefined}
            >
              <span>{project.linkLabel}</span>
              <ArrowUpRightIcon size={17} />
            </a>

            <button
              type="button"
              className="project-preview-btn"
              onClick={() => onPreview?.(project)}
            >
              <EyeIcon size={14} />
              <span>Detalles</span>
            </button>
          </div>
        </div>
      </Tilt3DCard>
    </Reveal>
  );
}
