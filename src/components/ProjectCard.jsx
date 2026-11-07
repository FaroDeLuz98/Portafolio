import Reveal from './Reveal.jsx';
import Tilt3DCard from './Tilt3DCard.jsx';
import Magnetic from './Magnetic.jsx';
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  CheckIcon,
  EyeIcon,
  InfoIcon,
} from './Icons.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';

function extractHost(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * PROJECT CARD · Caso de estudio con valor de negocio + tecnologías explicables
 * -----------------------------------------------------------------------------
 * Cada etiqueta tecnológica es un botón interactivo que al presionarlo explica
 * en lenguaje simple qué función cumple dentro del proyecto.
 */
export default function ProjectCard({
  project,
  index,
  onPreview,
  layout = 'editorial',
}) {
  const { openTechExplainer } = usePreferences();
  const isReversed = layout === 'editorial' && index % 2 === 1;
  const host = extractHost(project.url);

  return (
    <Reveal className="showcase-reveal" delay={index * 0.07} amount={0.12}>
      <Tilt3DCard
        as="article"
        maxTilt={layout === 'editorial' ? 3.5 : 5}
        className={`showcase-card showcase-card--${layout}${
          isReversed ? ' is-reversed' : ''
        }`}
        style={{
          '--accent': project.accent,
          '--accent-rgb': project.accentRgb,
        }}
      >
        <span className="project-spotlight" aria-hidden="true" />

        {/* Columna Visual: Marco de navegador interactivo */}
        <div
          className="browser-mockup"
          onClick={() => onPreview?.(project)}
          role="button"
          tabIndex={0}
          aria-label={`Ampliar vista previa de ${project.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPreview?.(project);
            }
          }}
        >
          <div className="browser-chrome" aria-hidden="true">
            <div className="browser-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="browser-address">
              <span className="browser-lock">●</span>
              <span>{host}</span>
            </div>
            <span className="browser-num">{project.number}</span>
          </div>

          <div className="browser-viewport">
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              decoding="async"
              width="1600"
              height="900"
            />
            <span className="project-visual-badge" aria-hidden="true">
              <EyeIcon size={14} /> Ampliar captura
            </span>
          </div>
        </div>

        {/* Columna Editorial: Contexto de negocio + tecnologías clickeables */}
        <div className="showcase-content">
          <div className="showcase-meta-top">
            <span className="showcase-category">{project.category}</span>
            <span className="showcase-big-num" aria-hidden="true">
              {project.number}
            </span>
          </div>

          <h3 className="showcase-title">{project.title}</h3>

          {project.businessImpact && (
            <div className="showcase-impact-box">
              <span className="showcase-impact-label">
                <BriefcaseIcon size={13} /> Para qué sirve:
              </span>
              <p>{project.businessImpact}</p>
            </div>
          )}

          <p className="showcase-description">{project.description}</p>

          {layout === 'editorial' &&
            project.highlights &&
            project.highlights.length > 0 && (
              <ul className="showcase-highlights">
                {project.highlights.map((item) => (
                  <li key={item}>
                    <CheckIcon size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

          <div className="tags-interactive-group">
            <span className="tags-helper-label">
              <InfoIcon size={12} /> Tocá una tecnología para saber qué hace:
            </span>
            <div className="tags">
              {project.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="tag-explain-btn"
                  onClick={() => openTechExplainer(tag)}
                  title={`Explicar para qué sirve ${tag}`}
                >
                  <span>{tag}</span>
                  <i aria-hidden="true">?</i>
                </button>
              ))}
            </div>
          </div>

          <div className="showcase-actions">
            <Magnetic strength={0.2}>
              <a
                className="btn showcase-visit-btn"
                href={project.url}
                target={project.external ? '_blank' : undefined}
                rel={project.external ? 'noopener noreferrer' : undefined}
              >
                <span>{project.linkLabel}</span>
                <ArrowUpRightIcon size={16} />
              </a>
            </Magnetic>

            <button
              type="button"
              className="project-preview-btn"
              onClick={() => onPreview?.(project)}
            >
              <EyeIcon size={14} />
              <span>Ficha del proyecto</span>
            </button>
          </div>
        </div>
      </Tilt3DCard>
    </Reveal>
  );
}
