import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Calendar,
  Layers,
  UtensilsCrossed
} from 'lucide-react';
import Button from '../ui/Button';
import { RESTAURANT_INFO } from '../../data/restaurantData';

const SHOWCASE_DISHES = [
  {
    id: 'biryani',
    name: 'Indian Dum Biriyani',
    sinhalaName: 'ඉන්දියන් දම් බිරියානි',
    category: 'Dum Special',
    portions: [
      { label: 'Single', price: 'Rs. 900', note: '1 Person • Chicken Handi' },
      { label: '3-Pack', price: 'Rs. 2,400', note: '3 Persons • Family Feast' },
      { label: '6-Pack', price: 'Rs. 3,800', note: '6 Persons • Jumbo Pot' },
    ],
    description: 'Slow-dum cooked in sealed handi clay pots with long-grain basmati rice, tender chicken, caramelized onions, boiled egg, mint sambol, and rich spiced gravy.',
    image: './images/menu-indian-dum-biryani.jpg',
    spiceLevel: 2,
    spiceText: 'Medium Spiced',
    preparation: 'Slow Dum 6 Hours',
    servings: '1 – 6 Persons',
    tags: ['Verified Menu Price', 'Clay Pot Dum', 'Top Bestseller'],
    color: '#f59e0b',
  },
  {
    id: 'burger',
    name: 'Indian Grill Chicken Burger',
    sinhalaName: 'ඉන්දියන් ග්‍රිල් චිකන් බර්ගර්',
    category: 'Flame Grill',
    portions: [
      { label: 'Single', price: 'Rs. 500', note: '1 Pc • Sesame Brioche' },
      { label: '4-Pcs Box', price: 'Rs. 1,996', note: '4 Pcs • Group Box' },
    ],
    description: 'Flame-grilled spiced chicken patty nestled between toasted sesame brioche buns with melted cheddar cheese, crisp greens, and signature herb dressing.',
    image: './images/menu-indian-grill-burger.jpg',
    spiceLevel: 1,
    spiceText: 'Mild Herb Spice',
    preparation: 'Charcoal Flame Grilled',
    servings: '1 – 4 Persons',
    tags: ['Verified 11:11 Price', 'Brioche Bun', 'Inmate Special'],
    color: '#ea580c',
  },
  {
    id: 'bbq-parata',
    name: 'BBQ Parata with Roasted Chicken',
    sinhalaName: 'බාබකියු පරාටා සමග චිකන්',
    category: 'Tandoor & BBQ',
    portions: [
      { label: 'Quarter', price: 'Rs. 650', note: 'Quarter Chicken + Paratas' },
      { label: 'Half', price: 'Rs. 1,200', note: 'Half Chicken + Paratas' },
    ],
    description: 'Crispy, multi-layered golden paratas accompanied by succulent flame-roasted chicken infused with secret tandoori barbecue spices, fresh lime, and spicy dipping gravy.',
    image: './images/menu-bbq-chicken-parata.jpg',
    spiceLevel: 3,
    spiceText: 'Fiery Barbecue',
    preparation: 'Tandoori Charcoal Smoked',
    servings: '1 – 2 Persons',
    tags: ['Verified Menu Price', 'Layered Parata', 'Charcoal Smoked'],
    color: '#f97316',
  },
  {
    id: 'kottu',
    name: "Founder's Signature Cheese Kottu",
    sinhalaName: 'මිස්ටර් කොත්තු සිග්නේචර් කොත්තුව',
    category: 'Mr. Kottu Special',
    portions: [
      { label: 'Regular', price: 'Counter Special', note: 'Single Plate' },
      { label: 'Sharing', price: 'Counter Special', note: 'Cell Sharing Pot' },
    ],
    description: "The crown jewel crafted according to founder Viraj Wickramanayake's (Mr. Kottu) world-famous technique. Golden rotti ribbons chopped on hot steel with chicken, egg, and velvety cheese.",
    image: './images/menu-kottu-rotti-spread.jpg',
    spiceLevel: 2,
    spiceText: 'Custom Heat',
    preparation: 'Iron Griddle Chopped',
    servings: '1 – 3 Persons',
    tags: ['Mr. Kottu Technique', 'Cheese Melt', 'Dinner Essential'],
    color: '#eab308',
  },
];

export default function DishShowcase3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPortionIdx, setSelectedPortionIdx] = useState(0);
  const canvasRef = useRef(null);

  const activeDish = SHOWCASE_DISHES[currentIndex];
  const activePortion = activeDish.portions[selectedPortionIdx] || activeDish.portions[0];

  // 3D Canvas References
  const stageRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    turntableGroup: null,
    floatingCardGroup: null,
    posterMesh: null,
    particles: null,
    textureLoader: null,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    drag: { isDown: false, startX: 0, rotY: 0 },
    animId: null,
    isVisible: true,
  });

  const nextDish = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_DISHES.length);
    setSelectedPortionIdx(0);
    if (stageRef.current.turntableGroup) {
      stageRef.current.drag.rotY += Math.PI * 0.45;
    }
  };

  const prevDish = () => {
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_DISHES.length) % SHOWCASE_DISHES.length);
    setSelectedPortionIdx(0);
    if (stageRef.current.turntableGroup) {
      stageRef.current.drag.rotY -= Math.PI * 0.45;
    }
  };

  // Three.js Scene Setup
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    stageRef.current.scene = scene;

    // Modern studio camera with responsive mobile framing
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    const updateCameraFraming = (w, h) => {
      const aspect = w / Math.max(h, 1);
      camera.aspect = aspect;
      camera.position.set(0, 0.1, aspect < 1 ? Math.min(6.4, 4.7 / aspect) : 4.7);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    updateCameraFraming(width, height);
    stageRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    stageRef.current.renderer = renderer;

    const textureLoader = new THREE.TextureLoader();
    stageRef.current.textureLoader = textureLoader;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainKeyLight.position.set(2, 4, 5);
    scene.add(mainKeyLight);

    const amberRim = new THREE.PointLight(0xf59e0b, 3.8, 16);
    amberRim.position.set(-3.5, 2.5, -2);
    scene.add(amberRim);

    const neonUnderglow = new THREE.PointLight(0xea580c, 3.0, 14);
    neonUnderglow.position.set(0, -3, 2);
    scene.add(neonUnderglow);

    // Main Stage Container
    const turntable = new THREE.Group();
    scene.add(turntable);
    stageRef.current.turntableGroup = turntable;

    // --- 1. Modern MagLev Hovering Base ---
    const baseGroup = new THREE.Group();
    baseGroup.position.y = -1.35;
    turntable.add(baseGroup);

    // Floating outer dark titanium ring
    const outerRingGeo = new THREE.TorusGeometry(2.05, 0.055, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.9,
      roughness: 0.25,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    baseGroup.add(outerRing);

    // Glowing inner neon halo ring
    const neonHaloGeo = new THREE.TorusGeometry(1.85, 0.035, 16, 64);
    const neonHaloMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
      metalness: 0.4,
      roughness: 0.2,
    });
    const neonHalo = new THREE.Mesh(neonHaloGeo, neonHaloMat);
    neonHalo.rotation.x = Math.PI / 2;
    neonHalo.position.y = 0.05;
    baseGroup.add(neonHalo);

    // Center illuminated MagLev core
    const coreGeo = new THREE.CylinderGeometry(1.65, 1.7, 0.1, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x090c0e,
      metalness: 0.85,
      roughness: 0.35,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    baseGroup.add(core);

    // Radial floor shadow disk
    const shadowGeo = new THREE.CircleGeometry(2.3, 32);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    sGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.25)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowDisk = new THREE.Mesh(shadowGeo, shadowMat);
    shadowDisk.rotation.x = -Math.PI / 2;
    shadowDisk.position.y = -0.06;
    baseGroup.add(shadowDisk);

    // --- 2. Floating Modern Holographic Showcase Tablet ---
    const floatingCardGroup = new THREE.Group();
    floatingCardGroup.position.set(0, 0.05, 0);
    turntable.add(floatingCardGroup);
    stageRef.current.floatingCardGroup = floatingCardGroup;

    const cardW = 2.45;
    const cardH = 2.45;
    const cardD = 0.08;

    // Dark obsidian glass body
    const bodyGeo = new THREE.BoxGeometry(cardW, cardH, cardD);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0c1015,
      metalness: 0.82,
      roughness: 0.2,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    floatingCardGroup.add(bodyMesh);

    // Sleek gold border bezel
    const bezelGeo = new THREE.BoxGeometry(cardW + 0.04, cardH + 0.04, cardD - 0.02);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.88,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.3,
    });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    floatingCardGroup.add(bezel);

    // Front high-resolution poster display
    const posterGeo = new THREE.PlaneGeometry(cardW - 0.06, cardH - 0.06);
    const posterMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
    });
    const posterMesh = new THREE.Mesh(posterGeo, posterMat);
    posterMesh.position.set(0, 0, cardD / 2 + 0.005);
    floatingCardGroup.add(posterMesh);
    stageRef.current.posterMesh = posterMesh;

    // Back Plate: Luxury prison emblem (visible when rotated 180°)
    const backEmblemGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.02, 32);
    const backEmblemMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });
    const backEmblem = new THREE.Mesh(backEmblemGeo, backEmblemMat);
    backEmblem.rotation.x = Math.PI / 2;
    backEmblem.position.set(0, 0, -cardD / 2 - 0.01);
    floatingCardGroup.add(backEmblem);

    // 4 Modern Corner HUD Brackets
    const cornerSize = 0.25;
    const cornerThick = 0.025;
    const cornerMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    const createCorner = (x, y) => {
      const g = new THREE.Group();
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(cornerSize, cornerThick, 0.02), cornerMat);
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(cornerThick, cornerSize, 0.02), cornerMat);
      hBar.position.set(x > 0 ? -cornerSize / 2 : cornerSize / 2, 0, 0);
      vBar.position.set(0, y > 0 ? -cornerSize / 2 : cornerSize / 2, 0);
      g.add(hBar);
      g.add(vBar);
      g.position.set(x, y, cardD / 2 + 0.01);
      return g;
    };

    floatingCardGroup.add(createCorner(-cardW / 2 + 0.03, cardH / 2 - 0.03));
    floatingCardGroup.add(createCorner(cardW / 2 - 0.03, cardH / 2 - 0.03));
    floatingCardGroup.add(createCorner(-cardW / 2 + 0.03, -cardH / 2 + 0.03));
    floatingCardGroup.add(createCorner(cardW / 2 - 0.03, -cardH / 2 + 0.03));

    // --- 3. Orbiting Sparkles & Spice Dust ---
    const pCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pSpeeds = new Float32Array(pCount);

    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.3 + Math.random() * 1.2;
      pPositions[i * 3] = Math.cos(angle) * radius;
      pPositions[i * 3 + 1] = -1.1 + Math.random() * 2.4;
      pPositions[i * 3 + 2] = Math.sin(angle) * radius;
      pSpeeds[i] = 0.006 + Math.random() * 0.01;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.065,
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeo, pMat);
    turntable.add(particles);
    stageRef.current.particles = particles;

    // Load initial texture
    textureLoader.load(SHOWCASE_DISHES[0].image, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      posterMat.map = tex;
      posterMat.needsUpdate = true;
    });

    // --- 4. Unified Pointer Events (Mobile Touch & Desktop Mouse Safe) ---
    const handlePointerDown = (e) => {
      if (!Number.isFinite(e.clientX)) return;
      stageRef.current.drag.isDown = true;
      stageRef.current.drag.startX = e.clientX;
    };

    const handlePointerMove = (e) => {
      if (!Number.isFinite(e.clientX) || !Number.isFinite(e.clientY)) return;

      // Subtle hover tilt for mouse pointers only (prevents jumpy mobile tap behavior)
      if (e.pointerType === 'mouse') {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const normX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
          const normY = Math.max(-1, Math.min(1, -(((e.clientY - rect.top) / rect.height) * 2 - 1)));
          stageRef.current.mouse.targetX = normX;
          stageRef.current.mouse.targetY = normY;
        }
      }

      if (!stageRef.current.drag.isDown) return;
      const deltaX = e.clientX - stageRef.current.drag.startX;
      if (Number.isFinite(deltaX)) {
        stageRef.current.drag.rotY += deltaX * 0.009;
      }
      stageRef.current.drag.startX = e.clientX;
    };

    const handlePointerUp = () => {
      stageRef.current.drag.isDown = false;
    };

    const handlePointerLeave = () => {
      stageRef.current.mouse.targetX = 0;
      stageRef.current.mouse.targetY = 0;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        updateCameraFraming(newW, newH);
        renderer.setSize(newW, newH);
      }
    };
    window.addEventListener('resize', handleResize);

    // --- 5. Render Loop with Smooth Levitation & Inertia ---
    let clock = new THREE.Clock();
    const animate = () => {
      stageRef.current.animId = requestAnimationFrame(animate);

      if (!stageRef.current.isVisible) return;
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp with finite guards
      const { mouse, drag, turntableGroup, floatingCardGroup } = stageRef.current;
      if (!Number.isFinite(mouse.targetX)) mouse.targetX = 0;
      if (!Number.isFinite(mouse.targetY)) mouse.targetY = 0;
      if (!Number.isFinite(drag.rotY)) drag.rotY = 0;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Smooth floating card levitation
      if (floatingCardGroup) {
        floatingCardGroup.position.y = 0.05 + Math.sin(elapsed * 1.5) * 0.06;
        floatingCardGroup.rotation.x = 0.04 - mouse.y * 0.15;
        floatingCardGroup.rotation.z = -mouse.x * 0.08;
      }

      // Turntable Y-rotation
      if (turntableGroup) {
        if (drag.isDown) {
          turntableGroup.rotation.y += (drag.rotY - turntableGroup.rotation.y) * 0.14;
        } else {
          // Keep poster facing user with slight organic breathing sway
          const targetY = drag.rotY + mouse.x * 0.25 + Math.sin(elapsed * 0.8) * 0.08;
          turntableGroup.rotation.y += (targetY - turntableGroup.rotation.y) * 0.08;
        }
      }

      // Orbiting particles
      if (particles) {
        const pos = particles.geometry.attributes.position.array;
        for (let i = 0; i < pCount; i++) {
          const idx = i * 3;
          const x = pos[idx];
          const z = pos[idx + 2];
          const angle = pSpeeds[i];
          pos[idx] = x * Math.cos(angle) - z * Math.sin(angle);
          pos[idx + 2] = x * Math.sin(angle) + z * Math.cos(angle);
          pos[idx + 1] += Math.sin(elapsed * 2 + i) * 0.001;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (stageRef.current.animId) cancelAnimationFrame(stageRef.current.animId);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      try {
        renderer.dispose();
      } catch (e) {}
    };
  }, []);

  // Update texture when dish changes
  useEffect(() => {
    const { textureLoader, posterMesh } = stageRef.current;
    if (textureLoader && posterMesh && posterMesh.material) {
      textureLoader.load(activeDish.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        posterMesh.material.map = tex;
        posterMesh.material.needsUpdate = true;
      });
      stageRef.current.drag.rotY = 0;
    }
  }, [currentIndex, activeDish.image]);

  const whatsappMessage = encodeURIComponent(
    `Hello The Prison Restaurant! I would like to order: ${activeDish.name} - ${activePortion.label} (${activePortion.price}).`
  );

  return (
    <section id="3d-showcase" className="py-20 md:py-28 bg-prison-950 relative overflow-hidden border-t border-prison-800">
      {/* Dynamic Background Aura Glow */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-25 transition-all duration-700"
        style={{ background: activeDish.color }}
      />
      <div className="absolute inset-0 bg-prison-mesh opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Header Bar with Segmented Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prison-gold/15 border border-prison-gold/40 text-prison-gold text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md shadow-glow-gold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              Interactive 3D Dish Experience
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-white">
              Signature <span className="text-prison-gold">Inmate Specials</span>
            </h2>
            <p className="mt-2 text-slate-400 max-w-xl text-sm sm:text-base">
              Explore our award-winning menu items in real-time WebGL 3D. Click portions to inspect details and order directly.
            </p>
          </div>

          {/* Modern Segmented Control Dock */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-prison-900/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-x-auto">
            {SHOWCASE_DISHES.map((dish, idx) => (
              <button
                key={dish.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setSelectedPortionIdx(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                  idx === currentIndex
                    ? 'bg-gradient-to-r from-prison-gold to-yellow-500 text-prison-950 shadow-glow-gold font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{dish.name.split(' ')[0]}</span>
                {idx === currentIndex && (
                  <span className="w-1.5 h-1.5 rounded-full bg-prison-950 animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Modern Glassmorphic 3D Stage Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-gradient-to-b from-prison-900/60 via-prison-950/80 to-prison-950/95 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-5 overflow-hidden group">
              
              {/* Glass Glare Highlights */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-prison-gold/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Three.js WebGL Canvas Viewport */}
              <div
                ref={canvasRef}
                className="w-full h-[390px] sm:h-[460px] md:h-[500px] cursor-grab active:cursor-grabbing relative touch-pan-y select-none"
              />

              {/* Floating Bottom Navigation Dock */}
              <div className="relative z-20 pt-2 flex items-center justify-between gap-4 border-t border-white/5">
                <button
                  onClick={prevDish}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-prison-900/90 border border-prison-700/80 text-slate-300 hover:text-prison-gold hover:border-prison-gold transition-all duration-200 text-xs font-bold uppercase tracking-wider shadow-md active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Dish Step Indicator */}
                <div className="flex items-center gap-2">
                  {SHOWCASE_DISHES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => {
                        setCurrentIndex(dotIdx);
                        setSelectedPortionIdx(0);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dotIdx === currentIndex
                          ? 'w-6 bg-prison-gold shadow-glow-gold'
                          : 'w-2 bg-prison-800 hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextDish}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-prison-900/90 border border-prison-700/80 text-slate-300 hover:text-prison-gold hover:border-prison-gold transition-all duration-200 text-xs font-bold uppercase tracking-wider shadow-md active:scale-95"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Drag instruction overlay */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-prison-950/70 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
                ✦ Drag to Rotate 360°
              </div>
            </div>
          </div>

          {/* Right Column: Modern Specs & Interactive Portion Selector */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg bg-prison-orange/15 text-prison-orange border border-prison-orange/30">
                      {activeDish.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {activeDish.sinhalaName}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-[1.05]">
                    {activeDish.name}
                  </h3>

                  {/* Dynamic Price Display */}
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display font-black text-4xl sm:text-5xl text-prison-gold tracking-tight">
                      {activePortion.price}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      • {activePortion.note}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeDish.description}
                </p>

                {/* Modern Portion Selector Buttons */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
                    <span>Select Portion / Pack Size:</span>
                    <span className="text-[11px] text-prison-gold font-normal">Instant Price Update</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {activeDish.portions.map((portion, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setSelectedPortionIdx(pIdx)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                          selectedPortionIdx === pIdx
                            ? 'bg-prison-gold/15 border-prison-gold shadow-glow-gold text-white'
                            : 'bg-prison-900/60 border-prison-800 text-slate-300 hover:border-prison-700 hover:bg-prison-900'
                        }`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {portion.label}
                        </span>
                        <span className="font-display font-bold text-lg text-prison-gold mt-1">
                          {portion.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modern Specifications Matrix */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-prison-900/50 border border-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-prison-orange/15 border border-prison-orange/30 flex items-center justify-center shrink-0">
                      <Flame className="w-4 h-4 text-prison-orange" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Spice Heat</div>
                      <div className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                        <span>{activeDish.spiceText}</span>
                        <span className="flex gap-0.5 ml-1">
                          {[1, 2, 3].map((lvl) => (
                            <span
                              key={lvl}
                              className={`w-1.5 h-1.5 rounded-full ${
                                lvl <= activeDish.spiceLevel ? 'bg-prison-orange' : 'bg-prison-800'
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-prison-gold/15 border border-prison-gold/30 flex items-center justify-center shrink-0">
                      <UtensilsCrossed className="w-4 h-4 text-prison-gold" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Preparation</div>
                      <div className="text-xs font-bold text-white mt-0.5">{activeDish.preparation}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Serving Size</div>
                      <div className="text-xs font-bold text-white mt-0.5">{activeDish.servings}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Authenticity</div>
                      <div className="text-xs font-bold text-white mt-0.5">100% Verified Price</div>
                    </div>
                  </div>
                </div>

                {/* Verified Tags */}
                <div className="flex flex-wrap gap-2">
                  {activeDish.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-prison-900 border border-prison-800 text-slate-300"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                {/* Call-to-Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-950/50 transition-all duration-200 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Order via WhatsApp
                  </a>

                  <Button to="/reservations" variant="gold" className="flex-1 rounded-xl">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book VIP Cell Table
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
