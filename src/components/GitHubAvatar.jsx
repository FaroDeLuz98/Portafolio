import { useState } from 'react';
import { contact } from '../data/siteData.js';

/**
 * GITHUB AVATAR · Imagen sincronizada en vivo con la cuenta de GitHub
 * -------------------------------------------------------------------
 * Usa el endpoint oficial `https://github.com/<usuario>.png`, por lo que
 * cualquier cambio de foto en GitHub se refleja automáticamente en la web.
 * Incluye respaldo local (`/assets/ftperfil.jpeg`) si no hay conexión.
 */
export default function GitHubAvatar({
  size = 80,
  srcOverride,
  alt = 'Avatar de Fernando Sisnande',
  className = '',
}) {
  const [failed, setFailed] = useState(false);

  const liveUrl = srcOverride || `${contact.githubAvatar}?size=${size}`;
  const finalSrc = failed ? '/assets/ftperfil.jpeg' : liveUrl;

  return (
    <img
      src={finalSrc}
      alt={alt}
      width={size}
      height={size}
      className={className}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
