import { useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';
import { projects } from '../data/siteData.js';

/**
 * PROYECTOS · Grilla 3D de trabajos realizados + Modal de vista rápida
 * --------------------------------------------------------------------
 * Grilla de 2 columnas con tarjetas 3D interactivas y vista detallada.
 */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="section shell" id="proyectos">
      <SectionHeading
        kicker="02 / PROYECTOS"
        title="Trabajos que"
        highlight="construí."
        aside="Cuatro proyectos reales: e-commerce, sitios institucionales y presencia digital para negocios locales."
      />

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onPreview={setSelectedProject}
          />
        ))}
      </div>

      {/* Invitación final después de la grilla */}
      <Reveal className="projects-footer" delay={0.1}>
        <p>
          <span className="green">¿Tenés una idea?</span> Puedo ayudarte a llevarla a
          la web con diseño e interactividad moderna.
        </p>
        <a className="inline-link" href="#contacto">
          Hablemos de tu proyecto
          <span aria-hidden="true">↗</span>
        </a>
      </Reveal>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
