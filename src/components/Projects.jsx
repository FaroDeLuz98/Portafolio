import { useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';
import { projects } from '../data/siteData.js';

/**
 * PROYECTOS · Casos de Estudio con Enfoque Empresarial y Guía Simple
 */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [layout, setLayout] = useState('editorial'); // 'editorial' | 'grid'

  return (
    <section className="section shell" id="proyectos">
      <div className="projects-header-wrap">
        <SectionHeading
          kicker="02 / SOLUCIONES EN PRODUCCIÓN"
          title="Sitios web reales y su"
          highlight="impacto."
          aside="Cuatro plataformas publicadas con su objetivo comercial explicado en simple y sus tecnologías interactivas."
        />

        <div
          className="projects-layout-switch"
          role="tablist"
          aria-label="Cambiar diseño de galería de proyectos"
        >
          <button
            type="button"
            role="tab"
            aria-selected={layout === 'editorial'}
            className={layout === 'editorial' ? 'is-active' : ''}
            onClick={() => setLayout('editorial')}
          >
            Casos de estudio
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={layout === 'grid'}
            className={layout === 'grid' ? 'is-active' : ''}
            onClick={() => setLayout('grid')}
          >
            Grilla 2×2
          </button>
        </div>
      </div>

      <div
        className={
          layout === 'editorial' ? 'showcase-editorial-list' : 'projects-grid'
        }
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            layout={layout}
            onPreview={setSelectedProject}
          />
        ))}
      </div>

      <Reveal className="projects-cta-strip" delay={0.1}>
        <div>
          <span className="bento-chip">PARA EMPRESAS Y CLIENTES</span>
          <p>
            ¿Buscás sumar un perfil junior comprometido a tu equipo o desarrollar
            una solución digital clara para tu organización?
          </p>
        </div>
        <a className="btn ghost" href="#contacto">
          Coordinar contacto
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
