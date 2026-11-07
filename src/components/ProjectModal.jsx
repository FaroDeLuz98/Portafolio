import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Tilt3DCard from './Tilt3DCard.jsx';
import { ArrowUpRightIcon, CheckIcon, CloseIcon } from './Icons.jsx';

/**
 * PROJECT MODAL · Vista previa expandida con tarjeta 3D y puntos clave
 * --------------------------------------------------------------------
 * Se abre al pulsar "Vista previa" en cualquier tarjeta de proyecto.
 */
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Detalles de ${project.title}`}
        >
          <motion.div
            className="project-modal-shell"
            style={{
              '--accent': project.accent,
              '--accent-rgb': project.accentRgb,
            }}
            initial={{ opacity: 0, y: 28, scale: 0.94, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label="Cerrar vista previa"
            >
              <CloseIcon size={19} />
            </button>

            <Tilt3DCard className="project-modal-media" maxTilt={5}>
              <img
                src={project.image}
                alt={project.imageAlt}
                width="1600"
                height="900"
              />
              <span className="project-index">{project.number}</span>
            </Tilt3DCard>

            <div className="project-modal-content">
              <span className="project-type">{project.category}</span>
              <h3>{project.title}</h3>
              <p className="project-modal-desc">{project.description}</p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="project-modal-highlights">
                  {project.highlights.map((item) => (
                    <li key={item}>
                      <CheckIcon size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="project-modal-actions">
                <a
                  className="btn primary"
                  href={project.url}
                  target={project.external ? '_blank' : undefined}
                  rel={project.external ? 'noopener noreferrer' : undefined}
                >
                  {project.linkLabel}
                  <ArrowUpRightIcon size={17} />
                </a>
                <button type="button" className="btn ghost" onClick={onClose}>
                  Seguir explorando
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
