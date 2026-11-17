import React, { useEffect, useState, useRef } from 'react';

/**
 * Custom Tactical Reticle & Ambient Spotlight Cursor
 * Tailored for The Prison Restaurant's dark industrial luxury aesthetic.
 * Zero-lag RAF positioning, ambient glow aura, precision corner brackets,
 * and clean orbital icon feedback over 3D stages (no text clutter).
 */
export default function InteractiveCursor3D() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [is3DStage, setIs3DStage] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const coreRef = useRef(null);
  const reticleRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let reticleX = -100;
    let reticleY = -100;
    let auraX = -100;
    let auraY = -100;
    let animId;
    let isVis = false;
    let prevHover = false;
    let prev3D = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVis) {
        isVis = true;
        reticleX = mouseX;
        reticleY = mouseY;
        auraX = mouseX;
        auraY = mouseY;
        setVisible(true);
      }

      const target = e.target;
      const hovering3D = Boolean(target?.closest?.('[id="3d-showcase"] canvas, [class*="cursor-grab"]'));
      const hoveringClickable = Boolean(target?.closest?.('a, button, [role="button"], input, select, textarea'));

      if (hovering3D !== prev3D) {
        prev3D = hovering3D;
        setIs3DStage(hovering3D);
      }
      if (hoveringClickable !== prevHover) {
        prevHover = hoveringClickable;
        setIsHovered(hoveringClickable);
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => {
      isVis = false;
      setVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      reticleX += (mouseX - reticleX) * 0.2;
      reticleY += (mouseY - reticleY) * 0.2;

      auraX += (mouseX - auraX) * 0.1;
      auraY += (mouseY - auraY) * 0.1;

      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticleX}px, ${reticleY}px, 0)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 1. Soft Warm Ambient Spotlight Glow */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-prison-gold/10 blur-xl will-change-transform"
      />

      {/* 2. Precision Tactical Reticle Frame */}
      <div
        ref={reticleRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
            isPressed
              ? 'scale-75'
              : is3DStage
              ? 'w-12 h-12 scale-105'
              : isHovered
              ? 'w-11 h-11 rotate-45'
              : 'w-8 h-8 rotate-0'
          }`}
        >
          {is3DStage ? (
            /* Orbital Ring with Minimalist Left/Right Arrows (No text) */
            <div className="w-full h-full rounded-full border border-dashed border-prison-gold/80 bg-prison-gold/10 backdrop-blur-[1px] flex items-center justify-between px-1.5 shadow-[0_0_15px_rgba(245,158,11,0.35)]">
              <svg className="w-2.5 h-2.5 text-prison-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <svg className="w-2.5 h-2.5 text-prison-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ) : (
            /* 4 Industrial Corner Brackets */
            <>
              <span
                className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 rounded-tl-[2px] transition-colors duration-200 ${
                  isHovered ? 'border-prison-orange' : 'border-prison-gold/80'
                }`}
              />
              <span
                className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 rounded-tr-[2px] transition-colors duration-200 ${
                  isHovered ? 'border-prison-orange' : 'border-prison-gold/80'
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 rounded-bl-[2px] transition-colors duration-200 ${
                  isHovered ? 'border-prison-orange' : 'border-prison-gold/80'
                }`}
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 rounded-br-[2px] transition-colors duration-200 ${
                  isHovered ? 'border-prison-orange' : 'border-prison-gold/80'
                }`}
              />
            </>
          )}
        </div>
      </div>

      {/* 3. Precision Glowing Diamond Core */}
      <div
        ref={coreRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div
          className={`rotate-45 transition-all duration-150 ${
            isPressed
              ? 'w-2.5 h-2.5 bg-white shadow-[0_0_12px_#ffffff]'
              : isHovered
              ? 'w-2 h-2 bg-prison-orange shadow-[0_0_10px_#ea580c]'
              : 'w-1.5 h-1.5 bg-prison-gold shadow-[0_0_8px_#f59e0b]'
          }`}
        />
      </div>
    </div>
  );
}
