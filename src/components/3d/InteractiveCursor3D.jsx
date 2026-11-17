import React, { useEffect, useState, useRef } from 'react';

/**
 * Interactive 3D Cursor (Dialed Coffee style magnetic pointer)
 * Tracks mouse with silky inertia, expands over clickable elements,
 * and shows "3D DRAG" or "VIEW" over interactive stages.
 */
export default function InteractiveCursor3D() {
  const [cursorState, setCursorState] = useState({
    x: -100,
    y: -100,
    isHovered: false,
    is3DStage: false,
    text: '',
    visible: false,
  });

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!cursorState.visible) {
        setCursorState((prev) => ({ ...prev, visible: true }));
      }

      // Check what element is under the cursor
      const target = e.target;
      const is3D = target.closest('[id="3d-showcase"], [class*="cursor-grab"], canvas');
      const isClickable = target.closest('a, button, [role="button"], input, select');

      setCursorState((prev) => ({
        ...prev,
        x: mouseX,
        y: mouseY,
        is3DStage: Boolean(is3D),
        isHovered: Boolean(isClickable),
        text: is3D ? 'DRAG 3D' : isClickable ? 'EXPLORE' : '',
      }));
    };

    const onMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Silky smooth ring lerp loop
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [cursorState.visible]);

  if (!cursorState.visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Spring Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-200 flex items-center justify-center will-change-transform ${
          cursorState.is3DStage
            ? 'w-16 h-16 bg-prison-gold/20 border-prison-gold text-prison-gold'
            : cursorState.isHovered
            ? 'w-12 h-12 bg-prison-orange/15 border-prison-orange/70'
            : 'w-8 h-8 bg-transparent border-prison-gold/50'
        }`}
      >
        {cursorState.is3DStage && (
          <span className="text-[9px] font-black uppercase tracking-tighter text-prison-gold select-none animate-pulse">
            3D DRAG
          </span>
        )}
      </div>

      {/* Center Laser Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-prison-gold will-change-transform transition-opacity duration-150 ${
          cursorState.is3DStage ? 'w-1.5 h-1.5 opacity-60' : 'w-2 h-2 opacity-90'
        }`}
      />
    </div>
  );
}
