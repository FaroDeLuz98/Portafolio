import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sistema de animación de scroll del portafolio.
 *
 * Reglas que evitan los errores de las versiones anteriores:
 *  1. Sin `pin` de GSAP. Las escenas largas usan `position: sticky` (CSS) y un único trigger.
 *  2. Dos tipos de animación solamente:
 *       - parallax / progreso  -> `scrubFromTo` (scrub, reversible, valores inicial y final explícitos)
 *       - entradas de contenido -> `reveal` (por tiempo, no dependen de la velocidad del scroll)
 *  3. Ningún elemento recibe dos animaciones que se solapen en el tiempo.
 *  4. El scrub numérico añade una inercia corta por encima de Lenis: el movimiento "se desliza"
 *     hacia su posición en lugar de seguir al dedo/rueda de forma rígida.
 */

export const BP_DESKTOP = '(min-width: 961px)';
export const BP_MOBILE = '(max-width: 960px)';

/** Registra `fn` para escritorio y móvil. Recibe { desk, k, scrub }. */
export function responsive(mm, fn) {
  mm.add({ desk: BP_DESKTOP, mob: BP_MOBILE }, (ctx) => {
    const desk = Boolean(ctx.conditions.desk);
    return fn({
      desk,
      // Factor de amplitud: en móvil los desplazamientos son más cortos.
      k: desk ? 1 : 0.5,
      scrub: desk ? 0.55 : 0.7,
    });
  });
}

/**
 * Animación vinculada al scroll con estados inicial y final explícitos.
 * `st` = { trigger, start, end }.
 */
export function scrubFromTo(targets, from, to, st, scrub = true) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;
  return gsap.fromTo(els, from, {
    ease: 'none',
    ...to,
    scrollTrigger: {
      invalidateOnRefresh: true,
      scrub,
      ...st,
    },
  });
}

/**
 * Entrada de contenido por tiempo. Se reproduce una vez cuando el primer elemento
 * llega a `start` y deja el elemento limpio (sin estilos inline) al terminar.
 */
export function reveal(targets, opts = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;
  const {
    trigger = els[0],
    start = 'top 90%',
    y = 44,
    x = 0,
    scale = 1,
    duration = 1.5,
    ease = 'power3.out',
    stagger = 0.16,
    delay = 0,
  } = opts;

  return gsap.from(els, {
    autoAlpha: 0,
    y,
    x,
    scale,
    duration,
    ease,
    stagger,
    delay,
    clearProps: 'opacity,visibility,transform',
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
    },
  });
}

/* ==========================================================================
   Materialización de palabras de la V5, integrada en las escenas de la V7.

   Intencionalmente NO usamos blur, scale ni traslaciones por palabra:
   - Conserva exactamente la nitidez y el flujo del texto de la V5.
   - El scroll controla el avance y el destello azul de cada palabra.
   - ScrollTrigger coordina esta animación con Lenis sin otro script global.
   ========================================================================== */

const clamp01 = (n) => Math.max(0, Math.min(1, n));

/** Separamos solo nodos de texto: se respetan <em>, enlaces y saltos. */
export function splitWords(el) {
  const original = el.innerHTML;
  const words = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !/\S/u.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest('.cine-material-word,button,a,script,style')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    const fragment = document.createDocumentFragment();
    for (const part of node.nodeValue.match(/\s+|\S+/gu) ?? []) {
      if (/^\s+$/u.test(part)) {
        fragment.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement('span');
        span.className = 'cine-material-word';
        span.textContent = part;
        fragment.appendChild(span);
        words.push(span);
      }
    }
    node.replaceWith(fragment);
  }
  return { words, revert: () => { el.innerHTML = original; } };
}

/** Reproduce la curva y la chispa breve de la V5, sin filtros ni transforms. */
function paintMaterialWords(words, progress) {
  const cursor = progress * (words.length + 2);
  for (let i = 0; i < words.length; i++) {
    const linear = clamp01((cursor - i) / 3);
    const opacity = linear * linear * (3 - 2 * linear);
    const sparkle = Math.max(0, 1 - Math.abs(linear - 0.55) / 0.44);
    const word = words[i];
    word.style.setProperty('--material-opacity', opacity.toFixed(3));
    word.style.setProperty('--material-spark', sparkle.toFixed(3));
  }
}

/**
 * API conservada de la V7; comportamiento visual y progresión de la V5.
 * Cada grupo reacciona al scroll REAL. La transición es reversible al subir.
 */
export function createWordScrubber() {
  const reverts = [];
  return {
    run(targets) {
      gsap.utils.toArray(targets).forEach((el) => {
        if (!el || el.classList.contains('cine-material-text')) return;
        const { words, revert } = splitWords(el);
        if (!words.length) return;
        el.classList.add('cine-material-text');
        const previous = { progress: -1 };
        const draw = (progress) => {
          if (Math.abs(progress - previous.progress) < 0.001) return;
          previous.progress = progress;
          paintMaterialWords(words, progress);
        };
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: () => `top ${Math.round(innerHeight * (innerWidth < 640 ? 0.95 : 0.88))}px`,
          end: () => {
            const start = innerHeight * (innerWidth < 640 ? 0.95 : 0.88);
            return `top ${Math.round(Math.min(innerHeight * 0.35, start - 195))}px`;
          },
          onUpdate: (self) => draw(self.progress),
          onRefresh: (self) => draw(self.progress),
        });
        draw(trigger.progress);
        reverts.push(() => {
          trigger.kill();
          el.classList.remove('cine-material-text');
          revert();
        });
      });
    },
    revert() {
      reverts.splice(0).reverse().forEach((fn) => fn());
    },
  };
}
