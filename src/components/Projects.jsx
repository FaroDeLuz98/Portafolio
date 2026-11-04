import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects } from '../data/siteData.js';

/**
 * PROYECTOS · Grilla de trabajos realizados
 * -----------------------------------------
 * Acá está la separación clara entre tarjetas que pediste: una grilla
 * de 2 columnas con gap amplio, borde propio y altura uniforme.
 * En pantallas chicas pasa automáticamente a 1 columna.
 */
export default function Projects() {
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
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Invitación final después de la grilla */}
      <Reveal className="projects-footer" delay={0.1}>
        <p>
          <span className="green">¿Tenés una idea?</span> Puedo ayudarte a llevarla a
          la web.
        </p>
        <a className="inline-link" href="#contacto">
          Hablemos de tu proyecto
          <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
    </section>
  );
}
