import { PreferencesProvider } from './context/PreferencesContext.jsx';
import Background from './components/Background.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TechMarquee from './components/TechMarquee.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import GitHubSection from './components/GitHubSection.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import ExperienceCustomizer from './components/ExperienceCustomizer.jsx';
import TechExplainerModal from './components/TechExplainerModal.jsx';

/**
 * APP · Portafolio Profesional Verde Corporativo + Guía Interactiva IT
 * --------------------------------------------------------------------
 * Pensado para grandes empresas, equipos de selección (RRHH) y clientes
 * que no pertenecen al sector tecnológico, conservando toda la experiencia 3D.
 */
export default function App() {
  return (
    <PreferencesProvider>
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
        <Experience />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
      <TechExplainerModal />
      <ExperienceCustomizer />
      <BackToTop />
    </PreferencesProvider>
  );
}
