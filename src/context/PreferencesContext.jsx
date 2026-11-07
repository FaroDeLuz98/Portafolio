import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';

/**
 * SISTEMA DE PERSONALIZACIÓN Y EXPLICADOR INTERACTIVO · Edición Verde Corporativa (v5)
 * ------------------------------------------------------------------------------------
 * - Tema por defecto: Esmeralda Ejecutiva (verde corporativo de alto contraste).
 * - Incluye estado global `explainedTech` para que presionar cualquier lenguaje
 *   o herramienta en cualquier parte del sitio abra su explicación en palabras simples.
 */
export const FONT_PRESETS = {
  geometric: {
    id: 'geometric',
    name: 'Ejecutiva Moderna',
    sample: 'Aa',
    badge: 'Space Grotesk + Jakarta',
    display: "'Space Grotesk', system-ui, sans-serif",
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    serif: "'Fraunces', Georgia, serif",
    headingWeight: '700',
  },
  avant: {
    id: 'avant',
    name: 'Studio Syne',
    sample: 'Aa',
    badge: 'Syne + Jakarta',
    display: "'Syne', 'Space Grotesk', system-ui, sans-serif",
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    serif: "'Fraunces', Georgia, serif",
    headingWeight: '800',
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial Serif',
    sample: 'Aa',
    badge: 'Fraunces Italic',
    display: "'Fraunces', Georgia, serif",
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    serif: "'Fraunces', Georgia, serif",
    headingWeight: '700',
  },
  mono: {
    id: 'mono',
    name: 'Ingeniería Mono',
    sample: '</>',
    badge: 'JetBrains Mono',
    display: "'JetBrains Mono', ui-monospace, monospace",
    sans: "'Space Grotesk', system-ui, sans-serif",
    serif: "'Space Grotesk', system-ui, sans-serif",
    headingWeight: '700',
  },
};

export const ACCENT_THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Verde Ejecutivo',
    green: '#22c55e',
    greenDark: '#16a34a',
    lime: '#86efac',
    secondary: '#10b981',
    rgb: '34, 197, 94',
    limeRgb: '134, 239, 172',
    secondaryRgb: '16, 185, 129',
    hexInt: 0x22c55e,
    secondaryHexInt: 0x10b981,
  },
  jade: {
    id: 'jade',
    name: 'Jade Corporativo',
    green: '#10b981',
    greenDark: '#059669',
    lime: '#6ee7b7',
    secondary: '#34d399',
    rgb: '16, 185, 129',
    limeRgb: '110, 231, 183',
    secondaryRgb: '52, 211, 153',
    hexInt: 0x10b981,
    secondaryHexInt: 0x34d399,
  },
  aurora: {
    id: 'aurora',
    name: 'Menta & Turquesa',
    green: '#2dd4bf',
    greenDark: '#0d9488',
    lime: '#5eead4',
    secondary: '#22c55e',
    rgb: '45, 212, 191',
    limeRgb: '94, 234, 212',
    secondaryRgb: '34, 197, 94',
    hexInt: 0x2dd4bf,
    secondaryHexInt: 0x22c55e,
  },
  amber: {
    id: 'amber',
    name: 'Ámbar Solar',
    green: '#f59e0b',
    greenDark: '#d97706',
    lime: '#fcd34d',
    secondary: '#fb7185',
    rgb: '245, 158, 11',
    limeRgb: '252, 211, 77',
    secondaryRgb: '251, 113, 133',
    hexInt: 0xf59e0b,
    secondaryHexInt: 0xfb7185,
  },
};

export const FONT_SCALES = {
  compact: { id: 'compact', label: 'Compacta', scale: 0.94 },
  normal: { id: 'normal', label: 'Normal', scale: 1 },
  large: { id: 'large', label: 'Amplia', scale: 1.07 },
};

export const LETTER_TRACKINGS = {
  tight: { id: 'tight', label: 'Ajustado', value: '-0.036em', body: '-0.006em' },
  normal: { id: 'normal', label: 'Equilibrado', value: '-0.022em', body: '0em' },
  wide: { id: 'wide', label: 'Aireado', value: '-0.005em', body: '0.012em' },
};

export const SCENE_SHAPES = [
  { id: 'constellation', label: 'Red 3D' },
  { id: 'waves', label: 'Ondas 3D' },
  { id: 'rings', label: 'Órbitas 3D' },
  { id: 'off', label: 'Sin 3D' },
];

export const MOTION_LEVELS = [
  { id: 'full', label: 'Máxima' },
  { id: 'subtle', label: 'Suave' },
  { id: 'minimal', label: 'Mínima' },
];

const STORAGE_KEY = 'fernando-portfolio-enterprise-green-v5';
const VALID_SCENES = new Set(['constellation', 'waves', 'rings', 'off']);

const DEFAULT_PREFS = {
  fontPreset: 'geometric',
  fontScale: 'normal',
  letterTracking: 'tight',
  motionLevel: 'full',
  scene3DShape: 'constellation',
  accentTheme: 'emerald',
  kineticLetters: true,
};

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [explainedTech, setExplainedTech] = useState(null);

  const [prefs, setPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!VALID_SCENES.has(parsed.scene3DShape)) {
          parsed.scene3DShape = 'constellation';
        }
        if (!ACCENT_THEMES[parsed.accentTheme]) {
          parsed.accentTheme = 'emerald';
        }
        return { ...DEFAULT_PREFS, ...parsed };
      }
    } catch {
      // Sin almacenamiento local disponible
    }
    return DEFAULT_PREFS;
  });

  const effectiveMotion = prefs.motionLevel || 'full';

  useEffect(() => {
    const root = document.documentElement;
    const font = FONT_PRESETS[prefs.fontPreset] || FONT_PRESETS.geometric;
    const accent = ACCENT_THEMES[prefs.accentTheme] || ACCENT_THEMES.emerald;
    const scaleObj = FONT_SCALES[prefs.fontScale] || FONT_SCALES.normal;
    const trackingObj =
      LETTER_TRACKINGS[prefs.letterTracking] || LETTER_TRACKINGS.tight;

    root.style.setProperty('--font-display', font.display);
    root.style.setProperty('--font-sans', font.sans);
    root.style.setProperty('--font-serif', font.serif);
    root.style.setProperty('--heading-weight', font.headingWeight);
    root.style.setProperty('--font-scale', String(scaleObj.scale));
    root.style.setProperty('--heading-tracking', trackingObj.value);
    root.style.setProperty('--body-tracking', trackingObj.body);

    root.style.setProperty('--green', accent.green);
    root.style.setProperty('--green-dark', accent.greenDark);
    root.style.setProperty('--lime', accent.lime);
    root.style.setProperty('--sky', accent.secondary);
    root.style.setProperty('--accent-rgb', accent.rgb);
    root.style.setProperty('--lime-rgb', accent.limeRgb);
    root.style.setProperty('--secondary-rgb', accent.secondaryRgb);

    root.dataset.font = font.id;
    root.dataset.motion = effectiveMotion;
    root.dataset.accent = accent.id;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignora bloqueos de almacenamiento
    }
  }, [prefs, effectiveMotion]);

  const updatePref = useCallback((key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetPrefs = useCallback(() => {
    setPrefs(DEFAULT_PREFS);
  }, []);

  const openTechExplainer = useCallback((techName = 'React') => {
    setExplainedTech(techName);
  }, []);

  const closeTechExplainer = useCallback(() => {
    setExplainedTech(null);
  }, []);

  const value = useMemo(
    () => ({
      prefs,
      effectiveMotion,
      isMinimalMotion: effectiveMotion === 'minimal',
      isFullMotion: effectiveMotion === 'full',
      accent: ACCENT_THEMES[prefs.accentTheme] || ACCENT_THEMES.emerald,
      font: FONT_PRESETS[prefs.fontPreset] || FONT_PRESETS.geometric,
      updatePref,
      resetPrefs,
      customizerOpen,
      setCustomizerOpen,
      explainedTech,
      openTechExplainer,
      closeTechExplainer,
    }),
    [
      prefs,
      effectiveMotion,
      customizerOpen,
      explainedTech,
      updatePref,
      resetPrefs,
      openTechExplainer,
      closeTechExplainer,
    ]
  );

  return (
    <PreferencesContext.Provider value={value}>
      <MotionConfig reducedMotion={effectiveMotion === 'minimal' ? 'always' : 'never'}>
        {children}
      </MotionConfig>
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences debe usarse dentro de PreferencesProvider');
  }
  return ctx;
}
