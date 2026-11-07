import GitHubAvatar from './GitHubAvatar.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';
import { contact } from '../data/siteData.js';

/**
 * FOOTER · Pie de página editorial de estudio
 * -------------------------------------------
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const { setCustomizerOpen, openTechExplainer } = usePreferences();

  return (
    <footer className="studio-footer">
      <div className="shell studio-footer-grid">
        <div className="footer-brand-col">
          <a className="brand" href="#inicio">
            <span className="brand-monogram" aria-hidden="true">
              <GitHubAvatar size={80} alt="" />
            </span>
            <span className="brand-wordmark">
              fernando<span className="brand-dot">.dev</span>
            </span>
          </a>
          <p>
            Desarrollador Web Junior &amp; estudiante de Informática en UTU ·
            Sarandí Grande, Uruguay.
          </p>
        </div>

        <div className="footer-nav-col">
          <span className="footer-col-title">Secciones</span>
          <a href="#sobre-mi">Perfil &amp; Stack</a>
          <a href="#proyectos">Sitios web (04)</a>
          <a href="#experiencia">Trayectoria</a>
          <a href="#actividad">GitHub</a>
        </div>

        <div className="footer-nav-col">
          <span className="footer-col-title">Conectar</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub · @{contact.githubUser}
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn Oficial
          </a>
          <button
            type="button"
            className="footer-studio-link"
            onClick={() => openTechExplainer('React')}
          >
            Guía simple de tecnologías (sin tecnicismos)
          </button>
          <button
            type="button"
            className="footer-studio-link"
            onClick={() => setCustomizerOpen(true)}
          >
            Configurar letras, animaciones y 3D
          </button>
        </div>
      </div>

      <div className="shell studio-footer-bottom">
        <span>© {year} Fernando Sisnande · Todos los derechos reservados</span>
        <span className="footer-built">
          Diseñado &amp; programado con <span className="green">✦</span> React,
          Framer Motion &amp; Three.js 3D
        </span>
      </div>
    </footer>
  );
}
