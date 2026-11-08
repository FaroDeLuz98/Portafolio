import { useEffect, useState } from 'react';
import CinematicNavbar from './components/cinematic/CinematicNavbar.jsx';
import HeroScene from './components/cinematic/HeroScene.jsx';
import AboutScene from './components/cinematic/AboutScene.jsx';
import ProjectsScene from './components/cinematic/ProjectsScene.jsx';
import TechnologiesScene from './components/cinematic/TechnologiesScene.jsx';
import ContactScene from './components/cinematic/ContactScene.jsx';
import { navSections } from './data/portfolioData.js';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  // Seguimiento suave y nativo de la sección activa
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      ticking = false;
      const probeY = window.scrollY + window.innerHeight * 0.38;
      let currentId = navSections[0].id;

      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const topDoc = el.getBoundingClientRect().top + window.scrollY;
        if (probeY >= topDoc) {
          currentId = sec.id;
        }
      }

      setActiveSection(currentId);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  // Navegación nativa fluida a cualquier sección respetando el header superior (-75px)
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 75);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div className="cine-app">
      <a href="#contenido-principal" className="cine-skip-link">
        Saltar al contenido principal
      </a>

      <CinematicNavbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="contenido-principal" className="cine-main">
        <HeroScene onNavigate={handleNavigate} />
        <AboutScene />
        <ProjectsScene />
        <TechnologiesScene />
        <ContactScene onNavigate={handleNavigate} />
      </main>
    </div>
  );
}
