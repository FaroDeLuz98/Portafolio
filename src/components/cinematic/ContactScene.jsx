import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contact, navSections, profile } from '../../data/portfolioData.js';
import { createWordScrubber, responsive, reveal, scrubFromTo } from '../../animations/motion.js';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './CinematicIcons.jsx';

gsap.registerPlugin(ScrollTrigger);

const PORTAL_PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${16 + ((i * 37) % 68)}%`,
  delay: `${(i * 0.31).toFixed(2)}s`,
  duration: `${4.0 + (i % 4) * 1.05}s`,
  size: `${2 + (i % 3) * 1.5}px`,
}));

export default function ContactScene({
  onNavigate,
  reducedMotion = false,
}) {
  const sectionRef = useRef(null);
  const contactPinRef = useRef(null);
  const darknessVeilRef = useRef(null);
  const ambientAuraRef = useRef(null);
  const cameraRigRef = useRef(null);
  const portalGlowRef = useRef(null);
  const portalArchRef = useRef(null);
  const portalParticlesRef = useRef(null);
  const portalMistRef = useRef(null);
  const titleBlockRef = useRef(null);
  const ctaPrimaryRef = useRef(null);
  const linksBlockRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2600);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return undefined;

    let media;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      media = mm;

      responsive(mm, ({ desk, scrub }) => {
        const stage = contactPinRef.current;

        // El portal se "enciende" mientras la escena sube a su posición final.
        const tl = gsap.timeline({
          defaults: { ease: 'power1.out', duration: 1 },
          scrollTrigger: {
            trigger: stage,
            start: desk ? 'top 95%' : 'top 95%',
            end: desk ? 'top -8%' : 'top 15%',
            scrub,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(darknessVeilRef.current, { opacity: 0.3 }, { opacity: 0 }, 0)
          .fromTo(
            portalArchRef.current,
            { autoAlpha: 0.72, y: 36, scale: 0.9 },
            { autoAlpha: 1, y: 0, scale: 1.05 },
            0
          )
          .fromTo(
            cameraRigRef.current,
            { scale: 0.92, rotateX: 4, y: 22 },
            { scale: 1.02, rotateX: 0, y: 0 },
            0
          )
          .fromTo(
            portalMistRef.current,
            { y: 22, scaleX: 0.95, opacity: 0.35 },
            { y: 0, scaleX: 1.15, opacity: 0.85 },
            0
          )
          .fromTo(
            portalGlowRef.current,
            { opacity: 0.38, scale: 0.72 },
            { opacity: 1, scale: 1.15 },
            0
          )
          .fromTo(
            ambientAuraRef.current,
            { opacity: 0.25, scale: 0.8 },
            { opacity: 0.95, scale: 1.25 },
            0
          );

        // Las partículas ascienden durante todo el recorrido de la escena.
        scrubFromTo(
          portalParticlesRef.current,
          { autoAlpha: 0.28, y: 55, scale: 0.9 },
          { autoAlpha: 1, y: -45, scale: 1.12 },
          { trigger: stage, start: 'top bottom', end: 'bottom top' },
          scrub
        );

        // Entradas de contenido por tiempo.
        const words = createWordScrubber(scrub, desk ? 1 : 0.5);
        reveal(titleBlockRef.current?.querySelector('.cine-section-eyebrow'), { y: 22, start: 'top 88%' });
        words.run(titleBlockRef.current?.querySelectorAll('h2, .contact-headline, .contact-subcopy'));
        reveal(ctaPrimaryRef.current, { y: 18, scale: 0.95, start: 'top 90%', delay: 0.1 });
        reveal(linksBlockRef.current, { y: 18, start: 'top 92%', delay: 0.15 });

        return words.revert;
      });
    }, section);

    return () => {
      // La media query debe limpiarse ANTES de restaurar el árbol React:
      // evita dejar spans materializados o animaciones duplicadas al alternar FX.
      media?.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  const currentYear = new Date().getFullYear();

  return (
    <section className="cine-scene contact-scene" id="contacto" ref={sectionRef}>
      <div className="contact-pin-stage" ref={contactPinRef}>
        {/* Velo de penumbra inicial y resplandor ambiental azul */}
        <div className="contact-darkness-veil" ref={darknessVeilRef} aria-hidden="true" />
        <div className="contact-ambient-aura" ref={ambientAuraRef} aria-hidden="true" />

        <div className="cine-shell contact-portal-layout">
          {/* COLUMNA IZQUIERDA: Título, CTA principal y enlaces verificados */}
          <div className="contact-editorial">
            <div ref={titleBlockRef}>
              <div className="cine-section-eyebrow">
                <span className="cine-kicker-num">
                  05 <i aria-hidden="true" />
                </span>
                <span className="cine-kicker-label">PORTAL DE CONTACTO DIRECTO</span>
              </div>

              <h2 className="cine-display-title">Contacto</h2>

              <p className="contact-headline">
                ¿Tenés un proyecto en mente o buscás sumar un desarrollador a tu equipo?{' '}
                <em>Hablemos y llevémoslo a la realidad.</em>
              </p>

              <p className="contact-subcopy">
                Abierto a oportunidades laborales Trainee / Junior, colaboraciones en
                equipos de tecnología y desarrollo de sitios web desde{' '}
                <strong>{contact.location}</strong>.
              </p>
            </div>

            <div className="contact-primary-actions" ref={ctaPrimaryRef}>
              <a
                href={`mailto:${contact.email}`}
                className="cine-btn cine-btn--primary cine-btn--lg"
              >
                <MailIcon size={18} />
                <span>Enviar mensaje</span>
                <ArrowRightIcon size={17} />
              </a>

              <button
                type="button"
                className={`cine-btn cine-btn--ghost cine-btn--lg${copied ? ' is-copied' : ''}`}
                onClick={handleCopyEmail}
              >
                {copied ? <CheckIcon size={17} /> : <CopyIcon size={17} />}
                <span role="status" aria-live="polite">
                  {copied ? 'Correo copiado' : 'Copiar correo'}
                </span>
              </button>
            </div>

            <div className="contact-verified-links" ref={linksBlockRef}>
              <a href={`mailto:${contact.email}`} className="contact-link-card">
                <MailIcon size={19} />
                <div>
                  <span>Correo electrónico</span>
                  <strong>{contact.email}</strong>
                </div>
                <ArrowUpRightIcon size={15} />
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card"
              >
                <LinkedInIcon size={19} />
                <div>
                  <span>LinkedIn Profesional</span>
                  <strong>Fernando Sisnande</strong>
                </div>
                <ArrowUpRightIcon size={15} />
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card"
              >
                <GitHubIcon size={19} />
                <div>
                  <span>GitHub Oficial</span>
                  <strong>@{contact.githubUser}</strong>
                </div>
                <ArrowUpRightIcon size={15} />
              </a>
            </div>
          </div>

          {/* ESCENA DERECHA: Cámara 3D + Arco clásico de piedra iluminado en azul */}
          <div className="contact-portal-perspective">
            <div className="contact-portal-stage" ref={cameraRigRef} aria-hidden="true">
              <div className="portal-energy-core" ref={portalGlowRef}>
                <div className="portal-energy-core__vortex" />
                <div className="portal-energy-core__horizon" />
              </div>

              <div className="portal-particles" ref={portalParticlesRef}>
                {PORTAL_PARTICLES.map((p) => (
                  <span
                    key={p.id}
                    className="portal-particle"
                    style={{
                      left: p.left,
                      animationDelay: p.delay,
                      animationDuration: p.duration,
                      width: p.size,
                      height: p.size,
                    }}
                  />
                ))}
              </div>

              <div className="portal-arch-monument" ref={portalArchRef}>
                <img
                  src="/assets/cinematic/portal-arch.webp"
                  alt=""
                  width="735"
                  height="942"
                  loading="lazy"
                />
              </div>

              <div className="portal-threshold-mist" ref={portalMistRef}>
                <img src="/assets/cinematic/cloud-storm.webp" alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIE DE PÁGINA MINIMALISTA */}
      <footer className="cine-footer">
        <div className="cine-shell cine-footer__inner">
          <div className="cine-footer__brand">
            <a
              href="#inicio"
              className="cine-brand"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('inicio');
              }}
            >
              <span className="cine-brand__slashes" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="cine-brand__text">{profile.name}</span>
            </a>
            <p>
              {profile.roleDetail} · {profile.location}
            </p>
          </div>

          <nav className="cine-footer__nav" aria-label="Enlaces del pie de página">
            {navSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(sec.id);
                }}
              >
                {sec.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="cine-shell cine-footer__bottom">
          <span>© {currentYear} Fernando Sisnande · Sarandí Grande, Uruguay</span>
          <span>React · GSAP · Three.js · Desplegado en Vercel</span>
        </div>
      </footer>
    </section>
  );
}
