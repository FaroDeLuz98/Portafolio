import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * OPCIONES DEL CONFIGURADOR VISUAL (Letras · Animaciones · 3D · Color)
 * -------------------------------------------------------------------
 * Permite personalizar en tiempo real la tipografía, la escala de lectura,
 * el espaciado de titulares, la intensidad de animaciones y la escena 3D.
 */
export const FONT_PRESETS = {
  geometric: {
    id: 'geometric',
    name: 'Geométrica Tech',
    sample: 'Aa',
    badge: 'Space Grotesk',
    display: "'Space Grotesk', system-ui, sans-serif",
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    headingWeight: '700',
  },
  avant: {
    id: 'avant',
    name: 'Vanguardia 3D',
    sample: 'Aa',
    badge: 'Syne Display',
    display: "'Syne', 'Space Grotesk', system-ui, sans-serif",
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    headingWeight: '800',
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial Moderna',
    sample: 'Aa',
    badge: 'Fraunces Serif',
    display: "'Fraunces', Georgia, serif",
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    headingWeight: '700',
  },
  mono: {
    id: 'mono',
    name: 'Terminal Dev',
    sample: '</>',
    badge: 'JetBrains Mono',
    display: "'JetBrains Mono', ui-monospace, monospace",
    sans: "'Space Grotesk', system-ui, sans-serif",
    headingWeight: '700',
  },
};

export const ACCENT_THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Esmeralda',
    green: '#3fb950',
    greenDark: '#2ea043',
    lime: '#7ee787',
    secondary: '#38bdf8',
    rgb: '63, 185, 80',
    limeRgb: '126, 231, 135',
    secondaryRgb: '56, 189, 248',
    hexInt: 0x3fb950,
    secondaryHexInt: 0x38bdf8,
  },
  cyan: {
    id: 'cyan',
    name: 'Cian Ártico',
    green: '#0ea5e9',
    greenDark: '#0284c7',
    lime: '#7dd3fc',
    secondary: '#a855f7',
    rgb: '14, 165, 233',
    limeRgb: '125, 211, 252',
    secondaryRgb: '168, 85, 247',
    hexInt: 0x0ea5e9,
    secondaryHexInt: 0xa855f7,
  },
  violet: {
    id: 'violet',
    name: 'Pulso Violeta',
    green: '#8b5cf6',
    greenDark: '#7c3aed',
    lime: '#c4b5fd',
    secondary: '#38bdf8',
    rgb: '139, 92, 246',
    limeRgb: '196, 181, 253',
    secondaryRgb: '56, 189, 248',
    hexInt: 0x8b5cf6,
    secondaryHexInt: 0x38bdf8,
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
  tight: { id: 'tight', label: 'Ajustado', value: '-0.05em', body: '-0.01em' },
  normal: { id: 'normal', label: 'Equilibrado', value: '-0.032em', body: '0em' },
  wide: { id: 'wide', label: 'Aireado', value: '-0.01em', body: '0.012em' },
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

const STORAGE_KEY = 'fernando-portfolio-prefs-v3';

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
  const osReducedMotion = useReducedMotion();
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const [prefs, setPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!VALID_SCENES.has(parsed.scene3DShape)) {
          parsed.scene3DShape = 'constellation';
        }
        return { ...DEFAULT_PREFS, ...parsed };
      }
    } catch {
      // Ignora bloqueos de almacenamiento privado
    }
    return DEFAULT_PREFS;
  });

  // Si el sistema operativo pide menos movimiento y el usuario no forzó otro valor
  const effectiveMotion = useMemo(() => {
    if (osReducedMotion && prefs.motionLevel === 'full') {
      return 'minimal';
    }
    return prefs.motionLevel;
  }, [osReducedMotion, prefs.motionLevel]);

  // Aplica variables CSS reactivas en <html> para actualizar letras, escalas y colores al instante
  useEffect(() => {
    const root = document.documentElement;
    const font = FONT_PRESETS[prefs.fontPreset] || FONT_PRESETS.geometric;
    const accent = ACCENT_THEMES[prefs.accentTheme] || ACCENT_THEMES.emerald;
    const scaleObj = FONT_SCALES[prefs.fontScale] || FONT_SCALES.normal;
    const trackingObj =
      LETTER_TRACKINGS[prefs.letterTracking] || LETTER_TRACKINGS.tight;

    root.style.setProperty('--font-display', font.display);
    root.style.setProperty('--font-sans', font.sans);
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
      // Sin almacenamiento disponible
    }
  }, [prefs, effectiveMotion]);

  const updatePref = (key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const resetPrefs = () => {
    setPrefs(DEFAULT_PREFS);
  };

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
    }),
    [prefs, effectiveMotion, customizerOpen]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
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
