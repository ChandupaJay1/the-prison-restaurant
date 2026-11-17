import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AtmosphericParticles3D (Background Ambience Layer)
 * Adds subtle floating embers, sparks, and depth motes across the page,
 * matching the high-end dark luxury aesthetic of Dialed Coffee.
 */
export default function AtmosphericParticles3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false, // lightweight background
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particle setup
    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 16;
      positions[idx + 1] = (Math.random() - 0.5) * 14;
      positions[idx + 2] = (Math.random() - 0.5) * 10;

      velocities[idx] = (Math.random() - 0.5) * 0.005;
      velocities[idx + 1] = 0.006 + Math.random() * 0.012; // upward float
      velocities[idx + 2] = (Math.random() - 0.5) * 0.005;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom circle glow particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(251, 191, 36, 0.9)');
    grad.addColorStop(0.4, 'rgba(234, 88, 12, 0.6)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);

    const texture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.15,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Parallax scroll shift
      camera.position.y = -scrollY * 0.001;

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        pos[idx] += velocities[idx] + Math.sin(elapsed + i) * 0.002;
        pos[idx + 1] += velocities[idx + 1];
        pos[idx + 2] += velocities[idx + 2];

        // Wrap around top
        if (pos[idx + 1] > 8 - camera.position.y) {
          pos[idx + 1] = -8 - camera.position.y;
          pos[idx] = (Math.random() - 0.5) * 16;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      try {
        renderer.dispose();
      } catch (e) {}
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-70"
    />
  );
}
