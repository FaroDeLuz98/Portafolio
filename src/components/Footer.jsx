import { contact } from '../data/siteData.js';

/**
 * FOOTER · Pie de página
 * ----------------------
 * Muestra el año actual de forma automática y enlaces rápidos.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="shell footer-inner">
        <span>© {year} Fernando Sisnande</span>
        <div className="footer-links">
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
