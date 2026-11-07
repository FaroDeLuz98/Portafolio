import { usePreferences } from '../context/PreferencesContext.jsx';
import { contact } from '../data/siteData.js';

/**
 * FOOTER · Pie de página con acceso rápido al Estudio Visual
 * ----------------------------------------------------------
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const { setCustomizerOpen } = usePreferences();

  return (
    <footer>
      <div className="shell footer-inner">
        <span>© {year} Fernando Sisnande</span>
        <span className="footer-built">
          Construido con <span className="green">✦</span> React, Framer Motion &amp;
          Three.js 3D
        </span>
        <div className="footer-links">
          <button
            type="button"
            className="footer-studio-link"
            onClick={() => setCustomizerOpen(true)}
          >
            Personalizar letras &amp; 3D
          </button>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
