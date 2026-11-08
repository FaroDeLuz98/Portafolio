import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext.jsx';
import {
  FEATURED_TECH_LIST,
  getTechExplanation,
} from '../data/techExplanations.js';
import { BriefcaseIcon, CheckIcon, CloseIcon, InfoIcon } from './Icons.jsx';

/**
 * TECH EXPLAINER MODAL · Traductor de tecnologías a lenguaje humano y empresarial
 * -------------------------------------------------------------------------------
 * Pensado especialmente para reclutadores de RRHH, directivos, grandes empresas
 * y clientes que no son del área informática. Se abre al presionar cualquier
 * lenguaje o tecnología en todo el portafolio.
 */
export default function TechExplainerModal() {
  const {
    explainedTech,
    openTechExplainer,
    closeTechExplainer,
  } = usePreferences();

  useEffect(() => {
    if (!explainedTech) return undefined;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeTechExplainer();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [explainedTech, closeTechExplainer]);

  const info = explainedTech ? getTechExplanation(explainedTech) : null;

  return (
    <AnimatePresence>
      {info && (
        <motion.div
          className="tech-explainer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeTechExplainer}
          role="dialog"
          aria-modal="true"
          aria-label={`Explicación simple de ${info.name}`}
        >
          <motion.div
            className="tech-explainer-dialog"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera ejecutiva */}
            <div className="tech-explainer-head">
              <div>
                <span className="tech-explainer-kicker">
                  <InfoIcon size={13} /> GUÍA CLARA SIN TECNICISMOS · {info.category.toUpperCase()}
                </span>
                <div className="tech-explainer-title-row">
                  <h3>{info.name}</h3>
                  <span className="pill green-pill">{info.badge}</span>
                </div>
              </div>

              <button
                type="button"
                className="tech-explainer-close"
                onClick={closeTechExplainer}
                aria-label="Cerrar explicación"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            {/* Selector rápido para explorar otras herramientas sin salir */}
            <div
              className="tech-explainer-switcher"
              aria-label="Seleccionar otra tecnología para conocer qué hace"
            >
              {FEATURED_TECH_LIST.map((tech) => {
                const isCurrent =
                  info.id === tech ||
                  info.name.toLowerCase().includes(tech.toLowerCase());
                return (
                  <button
                    key={tech}
                    type="button"
                    className={isCurrent ? 'is-active' : ''}
                    onClick={() => openTechExplainer(tech)}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>

            {/* Cuerpo explicativo en 3 niveles claros */}
            <div className="tech-explainer-body">
              <div className="explainer-block explainer-block--primary">
                <span className="explainer-label">
                  1 · ¿Para qué sirve en palabras simples?
                </span>
                <p className="explainer-main-text">{info.simple}</p>
              </div>

              <div className="explainer-two-cols">
                <div className="explainer-block">
                  <span className="explainer-label">
                    2 · Ejemplo de la vida cotidiana
                  </span>
                  <p>{info.analogy}</p>
                </div>

                <div className="explainer-block explainer-block--enterprise">
                  <span className="explainer-label">
                    <BriefcaseIcon size={13} /> 3 · Valor para empresas y clientes
                  </span>
                  <p>{info.enterprise}</p>
                </div>
              </div>

              {/* Aplicaciones reales en el portafolio + nota técnica */}
              <div className="explainer-meta-row">
                <div className="explainer-used-in">
                  <span className="explainer-small-title">
                    Aplicado por Fernando en:
                  </span>
                  <div className="explainer-used-pills">
                    {info.usedIn.map((site) => (
                      <span key={site}>
                        <CheckIcon size={12} /> {site}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="explainer-tech-note">
                  <span className="explainer-small-title">
                    Resumen para equipos IT:
                  </span>
                  <p>{info.technical}</p>
                </div>
              </div>
            </div>

            <div className="tech-explainer-foot">
              <span>
                Podés tocar cualquier otra etiqueta en el sitio para ver su función.
              </span>
              <div className="tech-explainer-foot-actions">
                <a
                  href="#proyectos"
                  className="btn ghost small"
                  onClick={closeTechExplainer}
                >
                  Ver proyectos reales
                </a>
                <button
                  type="button"
                  className="btn primary small"
                  onClick={closeTechExplainer}
                >
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
