import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { ArrowUpRightIcon } from './Icons.jsx';

/**
 * PROJECT CARD · Tarjeta individual de proyecto
 * ---------------------------------------------
 * - Aparece al hacer scroll (Reveal).
 * - Se eleva suavemente al pasar el mouse.
 * - Un "spotlight" sigue el cursor dentro de la tarjeta usando variables CSS
 *   (--mx / --my), sin re-renderizar React en cada movimiento.
 * - Cada proyecto tiene su propio color de acento (--accent / --accent-rgb).
 */
export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Actualiza la posición del brillo que sigue al cursor.
  const handlePointerMove = (event) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <Reveal className="project-reveal" delay={index * 0.08} amount={0.12}>
      <motion.article
        ref={cardRef}
        className="project-card"
        style={{
          '--accent': project.accent,
          '--accent-rgb': project.accentRgb,
        }}
        onPointerMove={handlePointerMove}
        whileHover={reduceMotion ? undefined : { y: -8 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      >
        {/* Brillo que sigue al cursor (solo decorativo) */}
        <span className="project-spotlight" aria-hidden="true" />

        <div className="project-visual">
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
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}
