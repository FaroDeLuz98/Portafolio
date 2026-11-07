import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ACCENT_THEMES,
  FONT_PRESETS,
  FONT_SCALES,
  LETTER_TRACKINGS,
  MOTION_LEVELS,
  SCENE_SHAPES,
  usePreferences,
} from '../context/PreferencesContext.jsx';
import { CloseIcon } from './Icons.jsx';

/**
 * EXPERIENCE CUSTOMIZER · Estudio interactivo de Letras, Animaciones y 3D
 * -----------------------------------------------------------------------
 * Permite al visitante (o a vos mismo) configurar en vivo:
 * - Familia tipográfica de titulares y lectura (4 combinaciones).
 * - Escala de tamaño y espaciado entre letras (tracking).
 * - Efectos cinéticos de letras (3D split + scramble).
 * - Geometría de la escena WebGL 3D e intensidad de movimiento.
 * - Tema de luz/acento cromático en toda la interfaz y shaders 3D.
 */
export default function ExperienceCustomizer() {
  const {
    prefs,
    updatePref,
    resetPrefs,
    customizerOpen,
    setCustomizerOpen,
  } = usePreferences();

  useEffect(() => {
    if (!customizerOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setCustomizerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [customizerOpen, setCustomizerOpen]);

  return (
    <>
      {/* Botón flotante inferior izquierdo para abrir el estudio visual */}
      <motion.button
        type="button"
        className={`studio-dock-btn${customizerOpen ? ' is-open' : ''}`}
        onClick={() => setCustomizerOpen((v) => !v)}
        aria-expanded={customizerOpen}
        aria-controls="experience-studio-panel"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="studio-dock-indicator" aria-hidden="true" />
        <span className="studio-dock-label">Letras · 3D · FX</span>
      </motion.button>

      <AnimatePresence>
        {customizerOpen && (
          <>
            <motion.div
              className="studio-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizerOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              id="experience-studio-panel"
              className="studio-panel"
              role="dialog"
              aria-label="Configurador de letras, animaciones y 3D"
              initial={{ opacity: 0, x: -24, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -18, y: 12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="studio-head">
                <div>
                  <span className="studio-kicker">ESTUDIO VISUAL EN VIVO</span>
                  <h3>Letras, Animaciones &amp; 3D</h3>
                </div>
                <button
                  type="button"
                  className="studio-close"
                  onClick={() => setCustomizerOpen(false)}
                  aria-label="Cerrar configurador"
                >
                  <CloseIcon size={18} />
                </button>
              </div>

              <div className="studio-body">
                {/* 1. Tipografía */}
                <div className="studio-group">
                  <div className="studio-group-head">
                    <span>Estilo de letras</span>
                    <small>{FONT_PRESETS[prefs.fontPreset]?.badge}</small>
                  </div>
                  <div className="studio-font-grid">
                    {Object.values(FONT_PRESETS).map((preset) => {
                      const active = prefs.fontPreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          className={`studio-font-card${active ? ' is-active' : ''}`}
                          onClick={() => updatePref('fontPreset', preset.id)}
                        >
                          <strong style={{ fontFamily: preset.display }}>
                            {preset.sample}
                          </strong>
                          <span>{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Tamaño y espaciado */}
                <div className="studio-row-split">
                  <div className="studio-group">
                    <div className="studio-group-head">
                      <span>Tamaño</span>
                    </div>
                    <div className="studio-segmented">
                      {Object.values(FONT_SCALES).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          className={prefs.fontScale === s.id ? 'is-active' : ''}
                          onClick={() => updatePref('fontScale', s.id)}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="studio-group">
                    <div className="studio-group-head">
                      <span>Espaciado</span>
                    </div>
                    <div className="studio-segmented">
                      {Object.values(LETTER_TRACKINGS).map((tr) => (
                        <button
                          key={tr.id}
                          type="button"
                          className={
                            prefs.letterTracking === tr.id ? 'is-active' : ''
                          }
                          onClick={() => updatePref('letterTracking', tr.id)}
                        >
                          {tr.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Letras cinéticas toggle */}
                <div className="studio-toggle-row">
                  <div>
                    <strong>Letras interactivas 3D</strong>
                    <span>Salto elástico y decodificación de texto</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.kineticLetters}
                    className={`studio-switch${
                      prefs.kineticLetters ? ' is-on' : ''
                    }`}
                    onClick={() =>
                      updatePref('kineticLetters', !prefs.kineticLetters)
                    }
                  >
                    <span />
                  </button>
                </div>

                {/* 4. Escena 3D de fondo acoplada a la interfaz */}
                <div className="studio-group">
                  <div className="studio-group-head">
                    <span>Fondo 3D interactivo</span>
                    <small>Three.js WebGL</small>
                  </div>
                  <div className="studio-segmented studio-segmented--wrap">
                    {SCENE_SHAPES.map((shape) => (
                      <button
                        key={shape.id}
                        type="button"
                        className={
                          prefs.scene3DShape === shape.id ? 'is-active' : ''
                        }
                        onClick={() => updatePref('scene3DShape', shape.id)}
                      >
                        {shape.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Intensidad de animaciones */}
                <div className="studio-group">
                  <div className="studio-group-head">
                    <span>Nivel de animaciones</span>
                  </div>
                  <div className="studio-segmented">
                    {MOTION_LEVELS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        className={prefs.motionLevel === m.id ? 'is-active' : ''}
                        onClick={() => updatePref('motionLevel', m.id)}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Color de acento */}
                <div className="studio-group">
                  <div className="studio-group-head">
                    <span>Color de energía</span>
                    <small>{ACCENT_THEMES[prefs.accentTheme]?.name}</small>
                  </div>
                  <div className="studio-swatches">
                    {Object.values(ACCENT_THEMES).map((theme) => {
                      const active = prefs.accentTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          className={`studio-swatch${active ? ' is-active' : ''}`}
                          onClick={() => updatePref('accentTheme', theme.id)}
                          aria-label={`Cambiar color a ${theme.name}`}
                          title={theme.name}
                        >
                          <i
                            style={{
                              background: `linear-gradient(135deg, ${theme.lime}, ${theme.green})`,
                            }}
                          />
                          <span>{theme.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="studio-foot">
                <button
                  type="button"
                  className="studio-reset"
                  onClick={resetPrefs}
                >
                  Restaurar diseño original
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
