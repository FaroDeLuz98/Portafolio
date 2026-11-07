import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DirectionalLight,
  DynamicDrawUsage,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three';
import { usePreferences } from '../context/PreferencesContext.jsx';

/**
 * Crea un sprite radial suave para puntos luminosos en 3D.
 */
function createGlowSpriteTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.65)');
  gradient.addColorStop(0.72, 'rgba(255, 255, 255, 0.14)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Construye el modo 3D de fondo seleccionado acoplado a la interfaz:
 * - 'constellation': Red conectada 3D + poliedros facetados en márgenes + grilla en perspectiva
 * - 'waves': Malla y partículas topográficas ondulantes en 3D
 * - 'rings': Anillos orbitales giroscópicos y esfera geodésica profunda
 */
function buildBackgroundMode(mode, isMobile, primaryHex, secondaryHex, spriteTex) {
  const root = new Group();
  const disposables = [];
  const primaryMats = [];
  const secondaryMats = [];
  const emissivePrimaryMats = [];

  const trackGeo = (g) => {
    disposables.push(g);
    return g;
  };
  const trackMat = (m, role = 'none') => {
    disposables.push(m);
    if (role === 'primary') primaryMats.push(m);
    if (role === 'secondary') secondaryMats.push(m);
    if (role === 'emissivePrimary') emissivePrimaryMats.push(m);
    return m;
  };

  // Estrellas de profundidad común a todos los modos
  const starCount = isMobile ? 120 : 230;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i += 1) {
    starPos[i * 3] = (Math.random() - 0.5) * 60;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 46;
    starPos[i * 3 + 2] = -8 - Math.random() * 34;
  }
  const starGeo = trackGeo(new BufferGeometry());
  starGeo.setAttribute('position', new BufferAttribute(starPos, 3));
  const starMat = trackMat(
    new PointsMaterial({
      color: secondaryHex,
      size: 0.2,
      map: spriteTex,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: AdditiveBlending,
    }),
    'secondary'
  );
  const stars = new Points(starGeo, starMat);
  root.add(stars);

  if (mode === 'waves') {
    const cols = isMobile ? 30 : 48;
    const rows = isMobile ? 18 : 26;
    const planeGeo = trackGeo(new PlaneGeometry(46, 26, cols, rows));
    planeGeo.rotateX(-Math.PI * 0.43);

    const posAttr = planeGeo.attributes.position;
    posAttr.setUsage(DynamicDrawUsage);
    const baseCoords = new Float32Array(posAttr.array.length);
    baseCoords.set(posAttr.array);

    const wireMat = trackMat(
      new LineBasicMaterial({
        color: primaryHex,
        transparent: true,
        opacity: 0.22,
        blending: AdditiveBlending,
      }),
      'primary'
    );
    const meshPointsMat = trackMat(
      new PointsMaterial({
        color: primaryHex,
        size: 0.24,
        map: spriteTex,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
      'primary'
    );

    const waveGroup = new Group();
    waveGroup.position.set(0, -4.4, -4);

    // Malla wireframe suave + vértices luminosos
    const meshWireMat = trackMat(
      new MeshBasicMaterial({
        color: primaryHex,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        blending: AdditiveBlending,
      }),
      'primary'
    );
    const waveMesh = new Mesh(planeGeo, meshWireMat);
    const waveDots = new Points(planeGeo, meshPointsMat);
    waveGroup.add(waveMesh);
    waveGroup.add(waveDots);
    root.add(waveGroup);

    // Poliedros sutiles flotando arriba
    const accentPolyGeo = trackGeo(new IcosahedronGeometry(1.6, 0));
    const accentEdges = trackGeo(new EdgesGeometry(accentPolyGeo));
    const accentPoly = new LineSegments(accentEdges, wireMat);
    accentPoly.position.set(isMobile ? 4.5 : 11, 5.2, -7);
    root.add(accentPoly);

    return {
      root,
      update: (t, pointer, scrollNorm, scrollVel) => {
        const arr = posAttr.array;
        const boost = 1 + Math.min(Math.abs(scrollVel) * 0.04, 0.9);
        for (let i = 0; i < posAttr.count; i += 1) {
          const bx = baseCoords[i * 3];
          const bz = baseCoords[i * 3 + 2];
          const wave1 = Math.sin(bx * 0.26 + t * 1.15 + scrollNorm * 0.6) * 0.85;
          const wave2 = Math.cos(bz * 0.32 - t * 0.9) * 0.65;
          arr[i * 3 + 1] = baseCoords[i * 3 + 1] + (wave1 + wave2) * boost;
        }
        posAttr.needsUpdate = true;

        waveGroup.rotation.z = pointer.x * 0.04;
        waveGroup.position.y = -4.4 + pointer.y * 0.45;
        accentPoly.rotation.x = t * 0.25;
        accentPoly.rotation.y = t * 0.38;
        stars.rotation.y = t * 0.02;
      },
      setColors: (pHex, sHex) => {
        primaryMats.forEach((m) => m.color.setHex(pHex));
        secondaryMats.forEach((m) => m.color.setHex(sHex));
      },
      dispose: () => disposables.forEach((d) => d.dispose()),
    };
  }

  if (mode === 'rings') {
    const hub = new Group();
    hub.position.set(isMobile ? 2.2 : 4.2, 0.4, -7);
    root.add(hub);

    const sphereGeo = trackGeo(new IcosahedronGeometry(3.2, 2));
    const sphereEdges = trackGeo(new EdgesGeometry(sphereGeo));
    const sphereMat = trackMat(
      new LineBasicMaterial({
        color: primaryHex,
        transparent: true,
        opacity: 0.14,
        blending: AdditiveBlending,
      }),
      'primary'
    );
    const geodesic = new LineSegments(sphereEdges, sphereMat);
    hub.add(geodesic);

    const innerGeo = trackGeo(new OctahedronGeometry(1.45, 0));
    const innerMat = trackMat(
      new MeshPhysicalMaterial({
        color: 0x0b141e,
        emissive: primaryHex,
        emissiveIntensity: 0.22,
        metalness: 0.65,
        roughness: 0.22,
        transparent: true,
        opacity: 0.55,
        flatShading: true,
      }),
      'emissivePrimary'
    );
    const innerCore = new Mesh(innerGeo, innerMat);
    hub.add(innerCore);

    const ringSpecs = [
      { r: 5.2, rx: 1.08, ry: 0.22, speed: 0.22, primary: true },
      { r: 6.8, rx: -0.72, ry: 0.65, speed: -0.16, primary: false },
      { r: 8.6, rx: 0.35, ry: -0.95, speed: 0.11, primary: true },
    ];
    const orbitRings = [];

    ringSpecs.forEach((cfg) => {
      const rGeo = trackGeo(new TorusGeometry(cfg.r, 0.018, 12, 120));
      const rMat = trackMat(
        new MeshBasicMaterial({
          color: cfg.primary ? primaryHex : secondaryHex,
          transparent: true,
          opacity: cfg.primary ? 0.24 : 0.17,
          blending: AdditiveBlending,
        }),
        cfg.primary ? 'primary' : 'secondary'
      );
      const mesh = new Mesh(rGeo, rMat);
      mesh.rotation.x = cfg.rx;
      mesh.rotation.y = cfg.ry;
      hub.add(mesh);
      orbitRings.push({ mesh, speed: cfg.speed });
    });

    return {
      root,
      update: (t, pointer, scrollNorm) => {
        geodesic.rotation.y = t * 0.12 + scrollNorm * 0.18;
        geodesic.rotation.x = Math.sin(t * 0.2) * 0.25;
        innerCore.rotation.y = -t * 0.32;
        innerCore.rotation.z = t * 0.2;

        hub.rotation.x = pointer.y * 0.16 + Math.sin(scrollNorm * 0.28) * 0.22;
        hub.rotation.y = pointer.x * 0.22 + scrollNorm * 0.12;
        hub.position.x = (isMobile ? 1.5 : 4.2) - Math.sin(scrollNorm * 0.45) * (isMobile ? 2 : 5.5);

        orbitRings.forEach((item) => {
          item.mesh.rotation.z = t * item.speed + scrollNorm * 0.15;
        });
        stars.rotation.y = -t * 0.018;
      },
      setColors: (pHex, sHex) => {
        primaryMats.forEach((m) => m.color.setHex(pHex));
        secondaryMats.forEach((m) => m.color.setHex(sHex));
        emissivePrimaryMats.forEach((m) => m.emissive.setHex(pHex));
      },
      dispose: () => disposables.forEach((d) => d.dispose()),
    };
  }

  // Modo por defecto: 'constellation' · Red 3D conectada + poliedros acoplados + plano 3D
  // 1) Plano arquitectónico 3D inferior en perspectiva
  const floorGeo = trackGeo(new PlaneGeometry(54, 34, 28, 18));
  floorGeo.rotateX(-Math.PI * 0.47);
  const floorMat = trackMat(
    new MeshBasicMaterial({
      color: primaryHex,
      wireframe: true,
      transparent: true,
      opacity: 0.065,
      blending: AdditiveBlending,
    }),
    'primary'
  );
  const floor = new Mesh(floorGeo, floorMat);
  floor.position.set(0, -8.2, -8);
  root.add(floor);

  // 2) Red 3D de nodos y líneas dinámicas
  const nodeCount = isMobile ? 36 : 64;
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: (Math.random() - 0.5) * 32,
    y: (Math.random() - 0.5) * 22,
    z: (Math.random() - 0.5) * 16 - 4,
    vx: (Math.random() - 0.5) * 0.014,
    vy: (Math.random() - 0.5) * 0.014,
    vz: (Math.random() - 0.5) * 0.01,
  }));

  const nodePositions = new Float32Array(nodeCount * 3);
  const nodeGeo = trackGeo(new BufferGeometry());
  const nodePosAttr = new BufferAttribute(nodePositions, 3);
  nodePosAttr.setUsage(DynamicDrawUsage);
  nodeGeo.setAttribute('position', nodePosAttr);

  const nodeMat = trackMat(
    new PointsMaterial({
      color: primaryHex,
      size: isMobile ? 0.24 : 0.28,
      map: spriteTex,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: AdditiveBlending,
    }),
    'primary'
  );
  const nodePoints = new Points(nodeGeo, nodeMat);
  root.add(nodePoints);

  const maxConnections = nodeCount * 6;
  const linePositions = new Float32Array(maxConnections * 6);
  const lineGeo = trackGeo(new BufferGeometry());
  const linePosAttr = new BufferAttribute(linePositions, 3);
  linePosAttr.setUsage(DynamicDrawUsage);
  lineGeo.setAttribute('position', linePosAttr);

  const lineMat = trackMat(
    new LineBasicMaterial({
      color: primaryHex,
      transparent: true,
      opacity: 0.14,
      blending: AdditiveBlending,
    }),
    'primary'
  );
  const networkLines = new LineSegments(lineGeo, lineMat);
  root.add(networkLines);

  // 3) Poliedros facetados acoplados a los márgenes de la interfaz (detrás del vidrio de las tarjetas)
  const polyTemplates = [
    new IcosahedronGeometry(1.85, 0),
    new OctahedronGeometry(1.55, 0),
    new IcosahedronGeometry(1.35, 1),
  ];

  const placements = isMobile
    ? [
        { x: 5.2, y: 4.5, z: -5, tpl: 0, rx: 0.22, ry: 0.31 },
        { x: -5.4, y: -4.8, z: -7, tpl: 1, rx: -0.26, ry: 0.24 },
      ]
    : [
        { x: 10.6, y: 3.8, z: -3.5, tpl: 0, rx: 0.22, ry: 0.32 },
        { x: -11.4, y: -2.6, z: -5.5, tpl: 1, rx: -0.25, ry: 0.26 },
        { x: 9.8, y: -6.8, z: -8.5, tpl: 2, rx: 0.18, ry: -0.24 },
        { x: -9.2, y: 6.4, z: -9.5, tpl: 0, rx: -0.16, ry: -0.22 },
      ];

  const sculptures = [];

  placements.forEach((p, idx) => {
    const unit = new Group();
    unit.position.set(p.x, p.y, p.z);

    const solidMat = trackMat(
      new MeshPhysicalMaterial({
        color: 0x0b131d,
        emissive: idx % 2 === 0 ? primaryHex : secondaryHex,
        emissiveIntensity: 0.15,
        metalness: 0.6,
        roughness: 0.22,
        clearcoat: 0.9,
        transparent: true,
        opacity: 0.56,
        flatShading: true,
      }),
      idx % 2 === 0 ? 'emissivePrimary' : 'none'
    );
    const solid = new Mesh(polyTemplates[p.tpl], solidMat);
    unit.add(solid);

    const edgeGeo = trackGeo(new EdgesGeometry(polyTemplates[p.tpl]));
    const edgeMat = trackMat(
      new LineBasicMaterial({
        color: idx % 2 === 0 ? primaryHex : secondaryHex,
        transparent: true,
        opacity: 0.42,
        blending: AdditiveBlending,
      }),
      idx % 2 === 0 ? 'primary' : 'secondary'
    );
    const edges = new LineSegments(edgeGeo, edgeMat);
    edges.scale.setScalar(1.02);
    unit.add(edges);

    const ringGeo = trackGeo(new TorusGeometry(2.35, 0.012, 12, 72));
    const ringMat = trackMat(
      new MeshBasicMaterial({
        color: idx % 2 === 0 ? secondaryHex : primaryHex,
        transparent: true,
        opacity: 0.22,
        blending: AdditiveBlending,
      }),
      idx % 2 === 0 ? 'secondary' : 'primary'
    );
    const ring = new Mesh(ringGeo, ringMat);
    ring.rotation.x = 1.1;
    unit.add(ring);

    root.add(unit);
    sculptures.push({
      unit,
      solid,
      edges,
      ring,
      baseY: p.y,
      baseX: p.x,
      rx: p.rx,
      ry: p.ry,
      phase: idx * 1.6,
    });
  });

  // Guardamos materiales para clonar o disponer geometrías base al final
  polyTemplates.forEach((g) => disposables.push(g));

  const thresholdSq = isMobile ? 36 : 30;

  return {
    root,
    update: (t, pointer, scrollNorm) => {
      // Actualiza nodos y conexiones en 3D
      for (let i = 0; i < nodeCount; i += 1) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        if (n.x > 16 || n.x < -16) n.vx *= -1;
        if (n.y > 11 || n.y < -11) n.vy *= -1;
        if (n.z > 3 || n.z < -13) n.vz *= -1;

        nodePositions[i * 3] = n.x;
        nodePositions[i * 3 + 1] = n.y;
        nodePositions[i * 3 + 2] = n.z;
      }
      nodePosAttr.needsUpdate = true;

      let segIndex = 0;
      for (let i = 0; i < nodeCount && segIndex < maxConnections; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodeCount && segIndex < maxConnections; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < thresholdSq) {
            const base = segIndex * 6;
            linePositions[base] = a.x;
            linePositions[base + 1] = a.y;
            linePositions[base + 2] = a.z;
            linePositions[base + 3] = b.x;
            linePositions[base + 4] = b.y;
            linePositions[base + 5] = b.z;
            segIndex += 1;
          }
        }
      }
      lineGeo.setDrawRange(0, segIndex * 2);
      linePosAttr.needsUpdate = true;

      // Paralaje suave acoplado al scroll y al puntero
      sculptures.forEach((s) => {
        s.solid.rotation.x = t * s.rx + scrollNorm * 0.22;
        s.solid.rotation.y = t * s.ry + pointer.x * 0.25;
        s.edges.rotation.copy(s.solid.rotation);
        s.ring.rotation.z = t * 0.35;
        s.unit.position.y =
          s.baseY +
          Math.sin(t * 0.7 + s.phase) * 0.55 +
          Math.sin(scrollNorm * 0.4 + s.phase) * 1.4;
      });

      floor.position.z = -8 + (scrollNorm * 1.2) % 4;
      stars.rotation.y = t * 0.016;
    },
    setColors: (pHex, sHex) => {
      primaryMats.forEach((m) => m.color.setHex(pHex));
      secondaryMats.forEach((m) => m.color.setHex(sHex));
      emissivePrimaryMats.forEach((m) => m.emissive.setHex(pHex));
    },
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

/**
 * THREE BACKGROUND · Escena 3D de fondo acoplada a la interfaz
 * ------------------------------------------------------------
 * Se integra detrás de los paneles translúcidos respondiendo al scroll,
 * la velocidad de desplazamiento, el puntero y el tema de color activo.
 */
export default function ThreeBackground() {
  const mountRef = useRef(null);
  const { accent, effectiveMotion, prefs } = usePreferences();
  const modeRef = useRef(null);
  const lightsRef = useRef({ cursor: null, rim: null });

  const sceneMode = prefs.scene3DShape || 'constellation';
  const disabled = effectiveMotion === 'minimal' || sceneMode === 'off';

  useEffect(() => {
    if (modeRef.current) {
      modeRef.current.setColors(accent.hexInt, accent.secondaryHexInt);
    }
    if (lightsRef.current.cursor) {
      lightsRef.current.cursor.color.setHex(accent.hexInt);
    }
    if (lightsRef.current.rim) {
      lightsRef.current.rim.color.setHex(accent.secondaryHexInt);
    }
  }, [accent]);

  useEffect(() => {
    if (disabled) return undefined;
    const container = mountRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return undefined;
    }

    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 17);

    // Iluminación reactiva al cursor para iluminar poliedros detrás de la UI
    const ambient = new AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const cursorLight = new PointLight(accent.hexInt, 4.5, 34);
    cursorLight.position.set(4, 3, 8);
    scene.add(cursorLight);

    const rimLight = new DirectionalLight(accent.secondaryHexInt, 1.3);
    rimLight.position.set(-8, 6, 5);
    scene.add(rimLight);

    lightsRef.current = { cursor: cursorLight, rim: rimLight };

    const spriteTex = createGlowSpriteTexture();
    const activeScene = buildBackgroundMode(
      sceneMode,
      isMobile,
      accent.hexInt,
      accent.secondaryHexInt,
      spriteTex
    );
    scene.add(activeScene.root);
    modeRef.current = activeScene;

    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };
    let targetScroll = window.scrollY || 0;
    let currentScroll = targetScroll;
    let prevScroll = targetScroll;

    const onPointerMove = (e) => {
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      targetScroll = window.scrollY || 0;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    let rafId = 0;
    let isTabVisible = !document.hidden;

    const renderLoop = () => {
      if (!isTabVisible) return;
      rafId = window.requestAnimationFrame(renderLoop);

      const t = performance.now() * 0.001;
      const speedFactor = effectiveMotion === 'subtle' ? 0.45 : 1;

      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.045;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.045;
      currentScroll += (targetScroll - currentScroll) * 0.065;

      const scrollVel = currentScroll - prevScroll;
      prevScroll = currentScroll;
      const scrollNorm = currentScroll * 0.003;

      // La luz puntual sigue suavemente el cursor detrás de las tarjetas
      cursorLight.position.x = currentPointer.x * 11;
      cursorLight.position.y = currentPointer.y * 7;

      camera.position.x = currentPointer.x * 0.95;
      camera.position.y = currentPointer.y * 0.65;
      camera.lookAt(0, 0, -4);

      activeScene.update(t * speedFactor, currentPointer, scrollNorm, scrollVel);
      renderer.render(scene, camera);
    };

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(renderLoop);
      } else {
        window.cancelAnimationFrame(rafId);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    rafId = window.requestAnimationFrame(renderLoop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      activeScene.dispose();
      spriteTex.dispose();
      renderer.dispose();
      modeRef.current = null;

      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [disabled, effectiveMotion, sceneMode]);

  if (disabled) return null;

  return <div ref={mountRef} className="three-bg-canvas" aria-hidden="true" />;
}
