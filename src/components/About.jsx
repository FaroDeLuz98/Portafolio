import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Tilt3DCard from './Tilt3DCard.jsx';
import TechSphere3D from './TechSphere3D.jsx';
import AnimatedCounter from './AnimatedCounter.jsx';
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  Cube3DIcon,
  InfoIcon,
  MapPinIcon,
} from './Icons.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';
import { enterpriseStrengths, skillGroups } from '../data/siteData.js';
import { getTechExplanation } from '../data/techExplanations.js';

const PILLARS = [
  {
    num: '01',
    title: 'Interfaces Claras & UX',
    text: 'Pantallas limpias, accesibles y cómodas en celulares y escritorio, pensadas para cualquier usuario.',
  },
  {
    num: '02',
    title: 'Datos & Procesos Seguros',
    text: 'Sistemas con PHP, MySQL y SQL para administrar catálogos, clientes, inicios de sesión y pedidos.',
  },
  {
    num: '03',
    title: 'Enfoque Empresarial',
    text: 'Doble formación en Informática y Comercio y Ventas: entiendo la tecnología y también el negocio.',
  },
];

/**
 * SOBRE MÍ · Perfil Empresarial + Tech Stack Explicado para Todo Público
 * ----------------------------------------------------------------------
 * Al presionar cualquier lenguaje en la Esfera 3D o en Categorías, muestra
 * inmediatamente su explicación sin tecnicismos y permite abrir la ficha completa.
 */
export default function About() {
  const [stackView, setStackView] = useState('sphere'); // 'sphere' | 'list'
  const [selectedTech, setSelectedTech] = useState('React');
  const { openTechExplainer } = usePreferences();

  const currentExplanation = getTechExplanation(selectedTech);

  const handleTechPress = (techName) => {
    setSelectedTech(techName);
  };

  return (
    <section className="section shell" id="sobre-mi">
      <SectionHeading
        kicker="01 / PERFIL EMPRESARIAL & TECNOLOGÍAS"
        title="Valor real para equipos y"
        highlight="organizaciones."
        aside="Perfil técnico-comercial formado en UTU, con tecnologías explicadas de forma simple para todo público."
      />

      <div className="bento-about-grid">
        {/* Módulo 1: Biografía profesional y pilares */}
        <Reveal className="bento-bio-cell" delay={0.04}>
          <Tilt3DCard className="bento-card bento-bio" maxTilt={3.5}>
            <div className="bento-tag-row">
              <span className="bento-chip">PRESENTACIÓN EJECUTIVA</span>
              <span className="bento-subtle-code">UTU · Promoción 2026</span>
            </div>

            <h3>
              Tecnología ordenada, comunicación clara y visión comercial para{' '}
              <em className="editorial-serif">proyectos y empresas.</em>
            </h3>

            <p>
              Soy <strong>Fernando Sisnande</strong>, estudiante de Bachillerato
              Tecnológico en <strong>Informática</strong> y de{' '}
              <strong>Comercio y Ventas</strong> en UTU (finalización prevista en
              2026), radicado en Sarandí Grande, Uruguay.
            </p>
            <p>
              Esta combinación me permite integrarme tanto con equipos de
              desarrollo como con áreas comerciales, atención al cliente o
              dirección: construyo sitios modernos con bases de datos reales y
              comunico cada avance en lenguaje claro.
            </p>

            <div className="bento-pillars">
              {PILLARS.map((pillar) => (
                <div className="bento-pillar" key={pillar.num}>
                  <span className="pillar-num">{pillar.num}</span>
                  <strong>{pillar.title}</strong>
                  <p>{pillar.text}</p>
                </div>
              ))}
            </div>
          </Tilt3DCard>
        </Reveal>

        {/* Módulo 2: Tech Stack Interactivo con Explicador Integrado */}
        <Reveal className="bento-stack-cell" delay={0.1}>
          <Tilt3DCard
            className="bento-card bento-stack"
            maxTilt={stackView === 'sphere' ? 0 : 3.5}
            glare={stackView !== 'sphere'}
          >
            <div className="card-topline">
              <div>
                <span className="bento-chip">INTERACTIVO · PRESIONÁ UN LENGUAJE</span>
                <h3 className="bento-stack-title">Tech Stack Explicado</h3>
              </div>

              <div
                className="stack-view-tabs"
                role="tablist"
                aria-label="Modo de visualización de tecnologías"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={stackView === 'sphere'}
                  className={stackView === 'sphere' ? 'is-active' : ''}
                  onClick={() => setStackView('sphere')}
                >
                  <Cube3DIcon size={13} />
                  Esfera 3D
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={stackView === 'list'}
                  className={stackView === 'list' ? 'is-active' : ''}
                  onClick={() => setStackView('list')}
                >
                  Categorías
                </button>
              </div>
            </div>

            <p className="bento-stack-lead">
              {stackView === 'sphere'
                ? 'Arrastrá libremente en 360° y presioná cualquier lenguaje para leer abajo qué hace.'
                : 'Seleccioná cualquier herramienta de la lista para conocer en palabras simples para qué sirve.'}
            </p>

            <AnimatePresence mode="wait">
              {stackView === 'sphere' ? (
                <motion.div
                  key="sphere"
                  className="bento-sphere-holder"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                >
                  <TechSphere3D
                    selectedTech={selectedTech}
                    onSelectTech={handleTechPress}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  className="skill-groups"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  {skillGroups.map((group) => (
                    <div className="skill-group" key={group.title}>
                      <h4>{group.title}</h4>
                      <div className="skills">
                        {group.skills.map((skill) => {
                          const isSelected = selectedTech === skill;
                          return (
                            <button
                              key={skill}
                              type="button"
                              className={`skill-pill-btn${
                                isSelected ? ' is-selected' : ''
                              }`}
                              onClick={() => handleTechPress(skill)}
                            >
                              <span>{skill}</span>
                              <i aria-hidden="true">?</i>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tarjeta explicativa en vivo dentro del Stack para personas no técnicas */}
            <div className="stack-live-explainer" aria-live="polite">
              <div className="stack-live-head">
                <div>
                  <span className="stack-live-kicker">
                    <InfoIcon size={12} /> {currentExplanation.category}
                  </span>
                  <strong>{currentExplanation.name}</strong>
                </div>
                <button
                  type="button"
                  className="stack-live-more"
                  onClick={() => openTechExplainer(selectedTech)}
                >
                  <span>Ejemplo y valor empresarial</span>
                  <ArrowUpRightIcon size={13} />
                </button>
              </div>
              <p>{currentExplanation.simple}</p>
            </div>
          </Tilt3DCard>
        </Reveal>

        {/* Módulo 3: Indicadores clave */}
        <Reveal className="bento-metrics-cell" delay={0.14}>
          <Tilt3DCard className="bento-card bento-metrics" maxTilt={4}>
            <div className="bento-metric-item">
              <strong>
                <AnimatedCounter value={2026} />
              </strong>
              <span>Egreso previsto en UTU</span>
            </div>
            <div className="bento-metric-item">
              <strong>
                0<AnimatedCounter value={2} />
              </strong>
              <span>Áreas: Informática + Ventas</span>
            </div>
            <div className="bento-metric-item">
              <strong>
                0<AnimatedCounter value={4} />
              </strong>
              <span>Sitios reales publicados</span>
            </div>
          </Tilt3DCard>
        </Reveal>

        {/* Módulo 4: Disponibilidad geográfica y remota */}
        <Reveal className="bento-radar-cell" delay={0.18}>
          <Tilt3DCard className="bento-card bento-radar" maxTilt={4}>
            <div className="radar-rings" aria-hidden="true">
              <span />
              <span />
              <span />
              <i className="radar-pin" />
            </div>
            <div className="radar-copy">
              <span className="bento-chip">
                <MapPinIcon size={12} /> MODALIDAD
              </span>
              <strong>Sarandí Grande, UY</strong>
              <span>Remoto global · Híbrido o presencial en Uruguay</span>
            </div>
          </Tilt3DCard>
        </Reveal>
      </div>

      {/* Franja ejecutiva: Por qué sumar este perfil a una gran empresa */}
      <Reveal className="enterprise-readiness-panel" delay={0.2}>
        <div className="enterprise-panel-head">
          <span className="bento-chip">
            <BriefcaseIcon size={12} /> PREPARACIÓN PARA EQUIPOS Y GRANDES EMPRESAS
          </span>
          <p>
            Competencias clave para integrarme con rapidez a procesos
            corporativos, células ágiles y atención a clientes internos o
            externos.
          </p>
        </div>

        <div className="enterprise-grid">
          {enterpriseStrengths.map((item) => (
            <div className="enterprise-item" key={item.code}>
              <span className="enterprise-code">{item.code}</span>
              <h4>{item.title}</h4>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
