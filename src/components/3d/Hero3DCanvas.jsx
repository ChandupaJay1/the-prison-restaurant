import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Shield, Eye, Flame } from 'lucide-react';

/**
 * Hero3DCanvas (Dialed Coffee inspired 3D WebGL centerpiece)
 * Features an interactive 3D jail-cell & floating handcuffs stage with dynamic ember particles,
 * realistic PBR lighting, mouse parallax, and 360-degree drag rotation.
 */
export default function Hero3DCanvas() {
  const mountRef = useRef(null);
  const [activeSceneMode, setActiveSceneMode] = useState('all'); // 'all', 'handcuffs', 'embers', 'bars'
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // References to keep Three.js state across renders
  const sceneState = useRef({
    scene: null,
    camera: null,
    renderer: null,
    group: null,
    handcuffsGroup: null,
    barsGroup: null,
    particleSystem: null,
    spotLight: null,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    drag: { isDown: false, startX: 0, startY: 0, rotX: 0, rotY: 0 },
    animFrameId: null,
    isVisible: true,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090b, 0.04);
    sceneState.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);
    sceneState.current.camera = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    sceneState.current.renderer = renderer;

    // 3. Lighting (Atmospheric Gold & Steel Neon)
    const ambientLight = new THREE.AmbientLight(0x1b232c, 1.2);
    scene.add(ambientLight);

    // Warm amber spotlight (mimicking warm tavern lights & grill fire)
    const amberLight = new THREE.PointLight(0xf59e0b, 4.5, 25);
    amberLight.position.set(3, 4, 4);
    scene.add(amberLight);

    // Cool neon rim light (mimicking neon signs and steel reflection)
    const rimLight = new THREE.PointLight(0x38bdf8, 3.0, 20);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Orange underglow
    const underGlow = new THREE.PointLight(0xea580c, 3.5, 18);
    underGlow.position.set(0, -4, 2);
    scene.add(underGlow);

    // 4. Main Scene Container Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    sceneState.current.group = mainGroup;

    // 5. Materials
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.92,
      roughness: 0.18,
    });

    const darkSteelMaterial = new THREE.MeshStandardMaterial({
      color: 0x222a35,
      metalness: 0.85,
      roughness: 0.35,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x78350f,
      emissiveIntensity: 0.25,
    });

    // 6. Model: 3D Steel Jail Bars
    const barsGroup = new THREE.Group();
    const barRadius = 0.055;
    const barHeight = 8;
    const barCount = 10;
    const barSpacing = 0.95;

    for (let i = -barCount / 2; i <= barCount / 2; i++) {
      const barGeo = new THREE.CylinderGeometry(barRadius, barRadius, barHeight, 16);
      const barMesh = new THREE.Mesh(barGeo, darkSteelMaterial);
      barMesh.position.x = i * barSpacing;
      barMesh.position.z = -1.8 + Math.abs(i) * 0.15; // subtle curved jail perimeter
      barsGroup.add(barMesh);
    }

    // Top and bottom cross rails
    const crossRailGeo = new THREE.BoxGeometry((barCount + 1) * barSpacing, 0.12, 0.16);
    const topRail = new THREE.Mesh(crossRailGeo, darkSteelMaterial);
    topRail.position.set(0, 3.2, -1.5);
    barsGroup.add(topRail);

    const bottomRail = new THREE.Mesh(crossRailGeo, darkSteelMaterial);
    bottomRail.position.set(0, -3.2, -1.5);
    barsGroup.add(bottomRail);

    mainGroup.add(barsGroup);
    sceneState.current.barsGroup = barsGroup;

    // 7. Model: 3D Handcuffs (Centerpiece)
    const handcuffsGroup = new THREE.Group();

    const createCuff = (side = 1) => {
      const cuff = new THREE.Group();

      // Main shackle loop (Torus)
      const loopGeo = new THREE.TorusGeometry(0.85, 0.09, 20, 60, Math.PI * 1.55);
      const loopMesh = new THREE.Mesh(loopGeo, side === 1 ? chromeMaterial : goldMaterial);
      cuff.add(loopMesh);

      // Lock mechanism block
      const lockBoxGeo = new THREE.BoxGeometry(0.35, 0.55, 0.25);
      const lockBoxMesh = new THREE.Mesh(lockBoxGeo, darkSteelMaterial);
      lockBoxMesh.position.set(0.82, -0.2, 0);
      cuff.add(lockBoxMesh);

      // Swivel connector ring
      const swivelGeo = new THREE.TorusGeometry(0.2, 0.05, 16, 32);
      const swivelMesh = new THREE.Mesh(swivelGeo, chromeMaterial);
      swivelMesh.position.set(0.98, -0.45, 0);
      swivelMesh.rotation.y = Math.PI / 2;
      cuff.add(swivelMesh);

      return cuff;
    };

    const leftCuff = createCuff(1);
    leftCuff.position.set(-1.45, 0.25, 0.4);
    leftCuff.rotation.set(0.3, 0.4, 0.2);
    handcuffsGroup.add(leftCuff);

    const rightCuff = createCuff(2);
    rightCuff.position.set(1.45, -0.25, 0.2);
    rightCuff.rotation.set(-0.25, -0.45, -0.3);
    handcuffsGroup.add(rightCuff);

    // Connecting Chain Links
    const chainLinksCount = 5;
    for (let c = 0; c < chainLinksCount; c++) {
      const linkGeo = new THREE.TorusGeometry(0.22, 0.05, 14, 28);
      const linkMesh = new THREE.Mesh(linkGeo, chromeMaterial);
      const t = (c / (chainLinksCount - 1)) * 2 - 1; // -1 to +1
      linkMesh.position.set(t * 1.05, Math.sin(c * 0.8) * 0.15, 0.3 - Math.abs(t) * 0.1);
      linkMesh.rotation.set(0.2, c % 2 === 0 ? 0 : Math.PI / 2, c * 0.3);
      handcuffsGroup.add(linkMesh);
    }

    // Glowing Prison Plate Medallion
    const discGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.06, 32);
    const discMesh = new THREE.Mesh(discGeo, goldMaterial);
    discMesh.rotation.x = Math.PI / 2;
    discMesh.position.set(0, 0, -0.2);
    handcuffsGroup.add(discMesh);

    // Inner dark plate with "PRISON" style
    const innerDiscGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.07, 32);
    const innerDiscMesh = new THREE.Mesh(
      innerDiscGeo,
      new THREE.MeshStandardMaterial({
        color: 0x07090b,
        roughness: 0.6,
        metalness: 0.4,
      })
    );
    innerDiscMesh.rotation.x = Math.PI / 2;
    innerDiscMesh.position.set(0, 0, -0.19);
    handcuffsGroup.add(innerDiscMesh);

    mainGroup.add(handcuffsGroup);
    sceneState.current.handcuffsGroup = handcuffsGroup;

    // 8. 3D Floating Embers & Particle Sparks (Dialed Coffee style particles)
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      const pIdx = p * 3;
      positions[pIdx] = (Math.random() - 0.5) * 14;
      positions[pIdx + 1] = (Math.random() - 0.5) * 10 - 2;
      positions[pIdx + 2] = (Math.random() - 0.5) * 10;

      velocities[pIdx] = (Math.random() - 0.5) * 0.012;
      velocities[pIdx + 1] = 0.015 + Math.random() * 0.035; // drift upward
      velocities[pIdx + 2] = (Math.random() - 0.5) * 0.012;

      scales[p] = 0.5 + Math.random() * 1.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Particle Canvas Texture (Glow Dot)
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(251, 191, 36, 1)');
    grad.addColorStop(0.3, 'rgba(234, 88, 12, 0.8)');
    grad.addColorStop(0.8, 'rgba(225, 29, 72, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);
    sceneState.current.particleSystem = particleSystem;

    // 9. Mouse Move Tracking (Smooth Parallax)
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      sceneState.current.mouse.targetX = normX;
      sceneState.current.mouse.targetY = normY;
    };

    // 10. Click and Drag to Rotate 360° (Touch + Pointer)
    const handlePointerDown = (e) => {
      sceneState.current.drag.isDown = true;
      sceneState.current.drag.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      sceneState.current.drag.startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      setIsInteracting(true);
      setHasInteracted(true);
    };

    const handlePointerMove = (e) => {
      if (!sceneState.current.drag.isDown) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = currentX - sceneState.current.drag.startX;
      const deltaY = currentY - sceneState.current.drag.startY;

      sceneState.current.drag.rotY += deltaX * 0.007;
      sceneState.current.drag.rotX += deltaY * 0.005;

      // Limit vertical pitch to avoid flipping
      sceneState.current.drag.rotX = Math.max(-0.8, Math.min(0.8, sceneState.current.drag.rotX));

      sceneState.current.drag.startX = currentX;
      sceneState.current.drag.startY = currentY;
    };

    const handlePointerUp = () => {
      sceneState.current.drag.isDown = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Touch support
    container.addEventListener('touchmove', handleMouseMove, { passive: true });
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 11. Responsive Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 12. Visibility Observer (Pause render loop when offscreen for max performance)
    const observer = new IntersectionObserver(([entry]) => {
      sceneState.current.isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // 13. Render Loop (60 FPS with Damping / Lerp)
    let clock = new THREE.Clock();

    const animate = () => {
      sceneState.current.animFrameId = requestAnimationFrame(animate);

      if (!sceneState.current.isVisible) return;

      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth mouse lerp
      const { mouse, drag } = sceneState.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Floating gentle breath motion for handcuffs
      if (handcuffsGroup) {
        handcuffsGroup.position.y = Math.sin(elapsed * 1.2) * 0.18;
        handcuffsGroup.rotation.z = Math.cos(elapsed * 0.8) * 0.05;
      }

      // Parallax + Drag Rotation Application
      if (mainGroup) {
        // Drag rotation smoothly applied with inertia
        mainGroup.rotation.y += (drag.rotY + mouse.x * 0.45 - mainGroup.rotation.y) * 0.08;
        mainGroup.rotation.x += (drag.rotX - mouse.y * 0.25 - mainGroup.rotation.x) * 0.08;

        // Auto slow spin when not dragging
        if (!drag.isDown) {
          drag.rotY += 0.002;
        }
      }

      // Upward Ember Particles animation
      if (particleSystem) {
        const posAttr = particleSystem.geometry.attributes.position;
        const posArr = posAttr.array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          posArr[idx] += velocities[idx];
          posArr[idx + 1] += velocities[idx + 1];
          posArr[idx + 2] += velocities[idx + 2];

          // Reset particle if it drifts too high
          if (posArr[idx + 1] > 6) {
            posArr[idx + 1] = -4;
            posArr[idx] = (Math.random() - 0.5) * 12;
            posArr[idx + 2] = (Math.random() - 0.5) * 8;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Dynamic light pulse
      amberLight.intensity = 4.0 + Math.sin(elapsed * 4) * 0.8;
      underGlow.intensity = 3.0 + Math.cos(elapsed * 3) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (sceneState.current.animFrameId) {
        cancelAnimationFrame(sceneState.current.animFrameId);
      }
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      try {
        renderer.dispose();
      } catch (e) {}
    };
  }, []);

  // Filter 3D visibility by activeSceneMode
  useEffect(() => {
    const { handcuffsGroup, barsGroup, particleSystem } = sceneState.current;
    if (handcuffsGroup) handcuffsGroup.visible = activeSceneMode === 'all' || activeSceneMode === 'handcuffs';
    if (barsGroup) barsGroup.visible = activeSceneMode === 'all' || activeSceneMode === 'bars';
    if (particleSystem) particleSystem.visible = activeSceneMode === 'all' || activeSceneMode === 'embers';
  }, [activeSceneMode]);

  const resetRotation = () => {
    sceneState.current.drag.rotX = 0;
    sceneState.current.drag.rotY = 0;
    sceneState.current.mouse.targetX = 0;
    sceneState.current.mouse.targetY = 0;
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[620px] select-none overflow-hidden">
      {/* 3D WebGL Canvas Mounting Container */}
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />

      {/* Floating 3D Control Pill Bar (Dialed Coffee / Awwwards interactive HUD) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 bg-prison-950/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-prison-700/80 shadow-card-dark text-xs">
        <span className="text-[11px] font-bold uppercase tracking-widest text-prison-gold px-2 flex items-center gap-1.5">
          <RotateCw className="w-3 h-3 animate-spin text-prison-gold" style={{ animationDuration: '6s' }} />
          3D STAGE:
        </span>

        <button
          onClick={() => setActiveSceneMode('all')}
          className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-colors ${
            activeSceneMode === 'all'
              ? 'bg-prison-gold text-prison-950 shadow-glow-gold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All 3D
        </button>

        <button
          onClick={() => setActiveSceneMode('handcuffs')}
          className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-colors ${
            activeSceneMode === 'handcuffs'
              ? 'bg-prison-gold text-prison-950 shadow-glow-gold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Handcuffs
        </button>

        <button
          onClick={() => setActiveSceneMode('bars')}
          className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-colors ${
            activeSceneMode === 'bars'
              ? 'bg-prison-gold text-prison-950 shadow-glow-gold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Cell Bars
        </button>

        <button
          onClick={() => setActiveSceneMode('embers')}
          className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-colors ${
            activeSceneMode === 'embers'
              ? 'bg-prison-gold text-prison-950 shadow-glow-gold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Embers
        </button>

        <button
          onClick={resetRotation}
          title="Reset 3D Angle"
          className="px-2 py-1 text-slate-400 hover:text-prison-gold transition-colors ml-1"
        >
          Reset
        </button>
      </div>

      {/* Floating Interaction Prompt (fades once clicked/dragged) */}
      {!hasInteracted && (
        <div className="absolute top-4 right-4 z-20 pointer-events-none animate-pulse bg-prison-900/90 border border-prison-gold/40 text-prison-gold text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5 shadow-glow-gold">
          <span>✦ Drag to Rotate 360°</span>
        </div>
      )}
    </div>
  );
}
