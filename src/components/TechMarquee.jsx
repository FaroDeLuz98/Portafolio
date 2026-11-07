import { usePreferences } from '../context/PreferencesContext.jsx';
import { technologies } from '../data/siteData.js';
import { InfoIcon } from './Icons.jsx';

/**
 * TECH MARQUEE · Cinta interactiva de tecnologías con explicación al clic
 * -----------------------------------------------------------------------
 * Al presionar cualquier lenguaje o herramienta, se abre una tarjeta clara
 * explicando en palabras cotidianas para qué sirve.
 */
export default function TechMarquee() {
  const { openTechExplainer } = usePreferences();
  const loop = [...technologies, ...technologies];
  const reverse = [...technologies].reverse();
  const reverseLoop = [...reverse, ...reverse];

  return (
    <div className="tech-band" aria-label="Tecnologías con las que trabajo">
      <div className="tech-band-helper shell">
        <InfoIcon size={13} />
        <span>
          <strong>¿No sos del área informática?</strong> Presioná cualquier
          lenguaje o herramienta para ver en palabras simples para qué sirve.
        </span>
      </div>

      <div className="tech-track">
        {loop.map((tech, index) => (
          <span
            className="tech-item"
            key={`fwd-${tech}-${index}`}
            aria-hidden={index >= technologies.length ? 'true' : undefined}
          >
            <button
              type="button"
              className="tech-item-pill tech-item-btn"
              tabIndex={index >= technologies.length ? -1 : 0}
              onClick={() => openTechExplainer(tech)}
              title={`Clic para saber para qué sirve ${tech}`}
            >
              <span>{tech}</span>
              <small className="tech-qmark" aria-hidden="true">
                ?
              </small>
            </button>
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>

      <div className="tech-track tech-track--reverse" aria-hidden="true">
        {reverseLoop.map((tech, index) => (
          <span className="tech-item tech-item--subtle" key={`rev-${tech}-${index}`}>
            <button
              type="button"
              className="tech-subtle-btn"
              tabIndex={-1}
              onClick={() => openTechExplainer(tech)}
            >
              {tech}
            </button>
            <i>◆</i>
          </span>
        ))}
      </div>
    </div>
  );
}
