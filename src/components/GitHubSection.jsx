import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Tilt3DCard from './Tilt3DCard.jsx';
import AnimatedCounter from './AnimatedCounter.jsx';
import GitHubAvatar from './GitHubAvatar.jsx';
import { ArrowUpRightIcon, GitHubIcon, InfoIcon, StarIcon } from './Icons.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';
import { contact } from '../data/siteData.js';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4f5d95',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Shell: '#89e051',
  Vue: '#41b883',
};

const LANG_TO_EXPLAINER = {
  HTML: 'HTML5',
  CSS: 'CSS3',
  JavaScript: 'JavaScript',
  PHP: 'PHP',
};

/**
 * GITHUB SECTION · Trazabilidad de Código explicada también para RRHH
 */
export default function GitHubSection() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');
  const { openTechExplainer } = usePreferences();

  useEffect(() => {
    const controller = new AbortController();

    async function loadGitHub() {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${contact.githubUser}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(
            `https://api.github.com/users/${contact.githubUser}/repos?sort=updated&per_page=4`,
            {
              signal: controller.signal,
              headers: { Accept: 'application/vnd.github+json' },
            }
          ),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub API no disponible');
        }

        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();

        setProfile(profileData);
        setRepos(Array.isArray(reposData) ? reposData.slice(0, 3) : []);
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error');
      }
    }

    loadGitHub();
    return () => controller.abort();
  }, []);

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).getFullYear()
    : null;

  return (
    <section className="section shell" id="actividad">
      <SectionHeading
        kicker="04 / TRAZABILIDAD & TRABAJO EN EQUIPO"
        title="Actividad verificable en"
        highlight="GitHub."
        aside={
          <a
            className="inline-link"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon size={15} /> @{contact.githubUser} ↗
          </a>
        }
      />

      {/* Nota amigable para reclutadores o personas no técnicas */}
      <Reveal className="gh-non-tech-banner" delay={0.03}>
        <div>
          <span className="bento-chip">
            <InfoIcon size={12} /> PARA PERSONAS FUERA DEL RUBRO IT
          </span>
          <p>
            <strong>¿Qué es GitHub?</strong> Es la plataforma estándar que usan
            las grandes empresas para guardar el historial del software, revisar
            calidad en equipo y verificar el trabajo real de un desarrollador.
          </p>
        </div>
        <button
          type="button"
          className="btn ghost small"
          onClick={() => openTechExplainer('GitHub')}
        >
          Cómo funciona GitHub
        </button>
      </Reveal>

      <div className="gh-command-grid">
        <Reveal className="bento-card gh-telemetry-card" delay={0.06}>
          <div className="gh-profile-bar">
            <div className="github-identity">
              <div className="avatar">
                <GitHubAvatar
                  size={120}
                  srcOverride={profile?.avatar_url}
                  alt="Foto de perfil de Fernando Sisnande en GitHub"
                />
              </div>
              <div>
                <strong>{profile?.name || 'Fernando Sisnande'}</strong>
                <span>@{contact.githubUser} · Historial público</span>
              </div>
            </div>
            <span className="pill green-pill">
              <span className="online-dot" aria-hidden="true" />
              Datos en vivo
            </span>
          </div>

          {status === 'loading' && (
            <div className="github-stats" aria-hidden="true">
              <div className="stat-card skeleton" />
              <div className="stat-card skeleton" />
              <div className="stat-card skeleton" />
            </div>
          )}

          {status === 'ready' && profile && (
            <div className="github-stats">
              <div className="stat-card">
                <strong>
                  <AnimatedCounter value={profile.public_repos} />
                </strong>
                <span>Proyectos públicos</span>
              </div>
              <div className="stat-card">
                <strong>
                  <AnimatedCounter value={profile.followers} />
                </strong>
                <span>Red en GitHub</span>
              </div>
              <div className="stat-card">
                <strong>
                  {memberSince ? <AnimatedCounter value={memberSince} /> : '—'}
                </strong>
                <span>Activo desde</span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <p className="github-error">
              Las estadísticas en vivo están temporalmente ocupadas. Podés
              explorar todos mis repositorios directamente en GitHub.
            </p>
          )}

          {status === 'ready' && repos.length > 0 && (
            <div className="github-repos">
              <h3>Últimas entregas y repositorios</h3>
              {repos.map((repo) => {
                const mappedLang = LANG_TO_EXPLAINER[repo.language] || repo.language;
                return (
                  <div className="repo-item" key={repo.id}>
                    <a
                      className="repo-main repo-main-link"
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>
                        {repo.name} <ArrowUpRightIcon size={13} />
                      </strong>
                      <p>{repo.description || 'Repositorio público en GitHub'}</p>
                    </a>
                    <div className="repo-meta">
                      {repo.language ? (
                        <button
                          type="button"
                          className="repo-language repo-lang-btn"
                          onClick={() => openTechExplainer(mappedLang)}
                          title={`Clic para saber para qué sirve ${repo.language}`}
                        >
                          <i
                            aria-hidden="true"
                            style={{
                              background:
                                LANGUAGE_COLORS[repo.language] || '#22c55e',
                            }}
                          />
                          <span>{repo.language}</span>
                          <small aria-hidden="true">?</small>
                        </button>
                      ) : (
                        <span className="repo-language">Código</span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="repo-stars">
                          <StarIcon size={12} />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="github-footer">
            <span>
              perfil oficial: <strong>github.com/{contact.githubUser}</strong>
            </span>
            <a
              className="btn small"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir GitHub
              <ArrowUpRightIcon size={14} />
            </a>
          </div>
        </Reveal>

        <Reveal className="gh-preview-col" delay={0.12}>
          <Tilt3DCard maxTilt={4.5} className="bento-card gh-visual-card">
            <a
              className="github-preview"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir el perfil de Fernando en GitHub"
            >
              <img
                src="/assets/github-profile.webp"
                width="1916"
                height="910"
                alt="Captura del perfil de GitHub FaroDeLuz98 con repositorios y contribuciones"
                loading="lazy"
                decoding="async"
              />
              <span>
                Explorar perfil completo @{contact.githubUser}
                <ArrowUpRightIcon size={15} />
              </span>
            </a>
            <p className="github-capture-note">
              Vista verificable de actividad, repositorios y control de versiones.
            </p>
          </Tilt3DCard>
        </Reveal>
      </div>
    </section>
  );
}
