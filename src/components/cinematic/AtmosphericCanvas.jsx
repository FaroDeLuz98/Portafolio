import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DynamicDrawUsage,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three';

function createSoftParticleTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.28, 'rgba(147, 197, 253, 0.84)');
  grad.addColorStop(0.65, 'rgba(59, 130, 246, 0.24)');
  grad.addColorStop(1, 'rgba(37, 99, 235, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Escena atmosférica Three.js continua entre todas las escenas:
 * - Partículas luminosas azules con profundidad real en Z y respuesta a dirección/velocidad de scroll
 * - Cámara 3D con paneo, cabeceo y dolly progresivo a lo largo del recorrido narrativo
 * - Malla topográfica wireframe reactiva que conecta visualmente los horizontes
 */
export default function AtmosphericCanvas({ disabled = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (disabled) return undefined;
    const container = mountRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return undefined;
    }

    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      110
    );
    camera.position.set(0, 0, 18);

    const root = new Group();
    scene.add(root);

    const spriteTex = createSoftParticleTexture();

    // Capa 1: Partículas luminosas flotantes (cercanas y medias)
    const emberCount = isMobile ? 65 : 155;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberMeta = Array.from({ length: emberCount }, (_, i) => {
      const x = (Math.random() - 0.5) * 34;
      const y = (Math.random() - 0.5) * 26;
      const z = (Math.random() - 0.5) * 20 - 1;
      emberPositions[i * 3] = x;
      emberPositions[i * 3 + 1] = y;
      emberPositions[i * 3 + 2] = z;
      return {
        bx: x,
        by: y,
        bz: z,
        speedY: 0.11 + Math.random() * 0.25,
        ampX: 0.25 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const emberGeo = new BufferGeometry();
    const emberAttr = new BufferAttribute(emberPositions, 3);
    emberAttr.setUsage(DynamicDrawUsage);
    emberGeo.setAttribute('position', emberAttr);

    const emberMat = new PointsMaterial({
      color: 0x60a5fa,
      size: isMobile ? 0.26 : 0.34,
      map: spriteTex,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const embers = new Points(emberGeo, emberMat);
    root.add(embers);

    // Capa 2: Polvo estelar profundo
    const starCount = isMobile ? 80 : 190;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      starPos[i * 3] = (Math.random() - 0.5) * 58;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 42;
      starPos[i * 3 + 2] = -10 - Math.random() * 28;
    }
    const starGeo = new BufferGeometry();
    starGeo.setAttribute('position', new BufferAttribute(starPos, 3));
    const starMat = new PointsMaterial({
      color: 0x93c5fd,
      size: 0.17,
      map: spriteTex,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const stars = new Points(starGeo, starMat);
    root.add(stars);

    // Capa 3: Malla topográfica azul sutil en el horizonte inferior
    const cols = isMobile ? 22 : 38;
    const rows = isMobile ? 12 : 18;
    const waveGeo = new PlaneGeometry(48, 22, cols, rows);
    waveGeo.rotateX(-Math.PI * 0.44);
    const waveAttr = waveGeo.attributes.position;
    waveAttr.setUsage(DynamicDrawUsage);
    const baseWave = new Float32Array(waveAttr.array.length);
    baseWave.set(waveAttr.array);

    const waveMat = new MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.068,
      blending: AdditiveBlending,
    });
    const waveMesh = new Mesh(waveGeo, waveMat);
    waveMesh.position.set(0, -8.4, -7);
    root.add(waveMesh);

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };
    let scrollTarget = window.scrollY || 0;
    let scrollCurrent = scrollTarget;
    let prevScrollCurrent = scrollCurrent;

    const onPointerMove = (e) => {
      pointerTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollTarget = window.scrollY || 0;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    let rafId = 0;
    let visible = !document.hidden;

    const tick = () => {
      if (!visible) return;
      rafId = window.requestAnimationFrame(tick);

      const t = performance.now() * 0.001;
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.045;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.045;
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.075;

      const velocity = scrollCurrent - prevScrollCurrent;
      prevScrollCurrent = scrollCurrent;

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, scrollCurrent / maxScroll));
      const scrollTravel = scrollCurrent * 0.0065;

      for (let i = 0; i < emberCount; i += 1) {
        const m = emberMeta[i];
        const rawY = m.by + t * m.speedY + scrollTravel;
        const yLoop = ((((rawY + 13) % 26) + 26) % 26) - 13;
        const zLoop =
          ((((m.bz + scrollTravel * 0.45 + 11) % 20) + 20) % 20) - 11;

        emberPositions[i * 3] = m.bx + Math.sin(t * 0.55 + m.phase) * m.ampX;
        emberPositions[i * 3 + 1] = yLoop;
        emberPositions[i * 3 + 2] = zLoop;
      }
      emberAttr.needsUpdate = true;

      const wArr = waveAttr.array;
      const waveAmp = 0.68 + Math.min(0.65, Math.abs(velocity) * 0.014);
      for (let i = 0; i < waveAttr.count; i += 1) {
        const bx = baseWave[i * 3];
        const bz = baseWave[i * 3 + 2];
        wArr[i * 3 + 1] =
          baseWave[i * 3 + 1] +
          Math.sin(bx * 0.22 + t * 0.75 + scrollTravel * 0.55) * waveAmp +
          Math.cos(bz * 0.32 - t * 0.55 - scrollTravel * 0.3) * 0.48;
      }
      waveAttr.needsUpdate = true;

      // Rotación y movimiento de cámara continuo vinculado al progreso global de la película
      stars.rotation.y = t * 0.01 + progress * 0.55;
      stars.rotation.x = progress * 0.22;
      root.rotation.z = Math.sin(progress * Math.PI * 2) * 0.035;

      const camZ = 18 - Math.sin(progress * Math.PI) * 2.4;
      camera.position.x =
        pointerCurrent.x * 0.9 + Math.sin(progress * Math.PI * 2) * 0.65;
      camera.position.y =
        pointerCurrent.y * 0.55 - Math.cos(progress * Math.PI) * 0.45;
      camera.position.z = camZ - Math.max(-1.1, Math.min(1.1, velocity * 0.015));
      camera.lookAt(0, -0.35, -4);

      waveMat.opacity = 0.055 + Math.sin(progress * Math.PI) * 0.045;
      emberMat.opacity = 0.62 + Math.min(0.28, Math.abs(velocity) * 0.008);

      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      visible = !document.hidden;
      window.cancelAnimationFrame(rafId);
      if (visible) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);

      emberGeo.dispose();
      emberMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      spriteTex.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [disabled]);

  if (disabled) return null;

  return <div ref={mountRef} className="atmospheric-webgl-canvas" aria-hidden="true" />;
}
