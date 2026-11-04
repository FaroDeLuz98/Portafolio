import Background from './components/Background.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TechMarquee from './components/TechMarquee.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import GitHubSection from './components/GitHubSection.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

/**
 * APP · Estructura general del portafolio
 * ---------------------------------------
 * El orden de los componentes es el mismo orden en que se ven
 * las secciones en la página:
 * Hero → Tecnologías → Sobre mí → Proyectos → GitHub → Experiencia → Contacto.
 */
export default function App() {
  return (
    <>
      {/* Accesibilidad: permite saltar la navegación con el teclado */}
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Background />
      <ScrollProgress />
      <Navbar />

      <main id="contenido">
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <GitHubSection />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
