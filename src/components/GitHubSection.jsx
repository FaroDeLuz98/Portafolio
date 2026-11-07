import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Tilt3DCard from './Tilt3DCard.jsx';
import AnimatedCounter from './AnimatedCounter.jsx';
import { ArrowUpRightIcon, StarIcon } from './Icons.jsx';
import { contact } from '../data/siteData.js';

/**
 * Colores aproximados de GitHub para el puntito del lenguaje.
 */
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

/**
 * GITHUB SECTION · Actividad real del perfil con vista 3D y contadores
 * --------------------------------------------------------------------
 * Trae datos públicos desde la API de GitHub (sin token, sin backend).
 */
export default function GitHubSection() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

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
        kicker="03 / OPEN SOURCE"
        title="Mi actividad en"
        highlight="GitHub."
        aside={
          <a
            className="inline-link"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{contact.githubUser} ↗
          </a>
        }
      />

      <Reveal className="panel github-panel">
        <div className="github-head">
          <div className="github-identity">
            <div className="avatar">
              <img src="/assets/ftperfil.jpeg" alt="Foto de perfil de Fernando" />
            </div>
            <div>
              <strong>{profile?.name || contact.githubUser}</strong>
              <span>Mi recorrido, commit a commit.</span>
            </div>
          </div>
          <span className="pill green-pill">
            <span className="online-dot" aria-hidden="true" />
            Perfil de GitHub
          </span>
        </div>

        <div className="github-body">
          {/* Captura del perfil con inclinación 3D */}
          <Tilt3DCard maxTilt={4.5} className="github-preview-tilt">
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
                Ver mi perfil real en GitHub
                <ArrowUpRightIcon size={15} />
              </span>
            </a>
          </Tilt3DCard>

          <div className="github-side">
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
                  <span>Repositorios</span>
                </div>
                <div className="stat-card">
                  <strong>
                    <AnimatedCounter value={profile.followers} />
                  </strong>
                  <span>Seguidores</span>
                </div>
                <div className="stat-card">
                  <strong>
                    {memberSince ? <AnimatedCounter value={memberSince} /> : '—'}
                  </strong>
                  <span>En GitHub desde</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <p className="github-error">
                Las estadísticas en vivo no están disponibles ahora. Podés verlas
                directamente en el perfil.
              </p>
            )}

            {status === 'ready' && repos.length > 0 && (
              <div className="github-repos">
                <h3>Repositorios recientes</h3>
                {repos.map((repo) => (
                  <a
                    className="repo-item"
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="repo-main">
                      <strong>{repo.name}</strong>
                      <p>{repo.description || 'Proyecto en GitHub'}</p>
                    </div>
                    <div className="repo-meta">
                      <span className="repo-language">
                        <i
                          aria-hidden="true"
                          style={{
                            background:
                              LANGUAGE_COLORS[repo.language] || '#8b949e',
                          }}
                        />
                        {repo.language || 'Código'}
                      </span>
                      {repo.stargazers_count > 0 && (
                        <span className="repo-stars">
                          <StarIcon size={12} />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="github-capture-note">
          Captura de mi perfil del 24/10/2026. Las estadísticas se actualizan en vivo
          desde la API pública de GitHub.
        </p>

        <div className="github-footer">
          <span>
            git remote: <strong>github.com/{contact.githubUser}</strong>
          </span>
          <a
            className="btn small"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar perfil
            <ArrowUpRightIcon size={14} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
