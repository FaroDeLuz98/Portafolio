import { PreferencesProvider } from './context/PreferencesContext.jsx';
import Background from './components/Background.jsx';
import CursorGlow from './components/CursorGlow.jsx';
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
import ExperienceCustomizer from './components/ExperienceCustomizer.jsx';

/**
 * APP · Estructura general del portafolio interactivo 3D
 * ------------------------------------------------------
 * Envuelto en PreferencesProvider para permitir configurar en tiempo real
 * tipografías, escalas de letras, animaciones, geometrías 3D y colores.
 */
export default function App() {
  return (
    <PreferencesProvider>
      {/* Accesibilidad: permite saltar la navegación con el teclado */}
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Background />
      <CursorGlow />
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
      <ExperienceCustomizer />
      <BackToTop />
    </PreferencesProvider>
  );
}
