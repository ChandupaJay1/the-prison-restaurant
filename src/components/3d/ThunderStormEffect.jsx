import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Zap } from 'lucide-react';

/**
 * ThunderStormEffect Component
 * Adds cinematic lightning strikes, procedural electric bolts, sky flashes,
 * and realistic storm atmosphere to The Prison Restaurant hero.
 */
export default function ThunderStormEffect({ interactive = true }) {
  const canvasRef = useRef(null);
  const flashOverlayRef = useRef(null);
  const [isStriking, setIsStriking] = useState(false);
  const strikeTimerRef = useRef(null);

  // Generate fractal lightning bolt path
  const createLightningPath = (x1, y1, x2, y2, displace, minDisplace = 5) => {
    const points = [];
    
    function subdivide(x1, y1, x2, y2, d) {
      if (d < minDisplace) {
        points.push({ x: x1, y: y1 }, { x: x2, y: y2 });
        return;
      }
      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * d;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * d;
      subdivide(x1, y1, midX, midY, d / 2);
      subdivide(midX, midY, x2, y2, d / 2);
    }

    subdivide(x1, y1, x2, y2, displace);
    return points;
  };

  // Draw procedural lightning on canvas
  const drawLightning = useCallback((targetX) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const startX = targetX || width * (0.2 + Math.random() * 0.6);
    const endX = startX + (Math.random() - 0.5) * 200;
    const groundY = height * (0.65 + Math.random() * 0.3);

    // Main bolt points
    const mainBolt = createLightningPath(startX, 0, endX, groundY, 80, 8);

    // Draw main trunk
    const drawBoltSegment = (points, color, blur, lineWidth) => {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = blur;
      ctx.lineJoin = 'miter';

      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    // Layer 1: Electric Blue Halo Glow
    drawBoltSegment(mainBolt, 'rgba(56, 189, 248, 0.7)', 25, 6);
    // Layer 2: Intense Cyan Outer Core
    drawBoltSegment(mainBolt, 'rgba(186, 230, 253, 0.9)', 12, 3.5);
    // Layer 3: Blinding White Plasma Center
    drawBoltSegment(mainBolt, '#ffffff', 5, 1.8);

    // Generate 2-4 branching side-bolts
    const branchCount = 2 + Math.floor(Math.random() * 3);
    for (let b = 0; b < branchCount; b++) {
      const parentIdx = Math.floor(mainBolt.length * (0.25 + (b / branchCount) * 0.5));
      if (mainBolt[parentIdx]) {
        const p = mainBolt[parentIdx];
        const branchEndX = p.x + (Math.random() - 0.5) * 160;
        const branchEndY = p.y + 60 + Math.random() * 120;
        const branchPoints = createLightningPath(p.x, p.y, branchEndX, branchEndY, 35, 6);

        drawBoltSegment(branchPoints, 'rgba(56, 189, 248, 0.5)', 15, 2.5);
        drawBoltSegment(branchPoints, '#ffffff', 4, 1.0);
      }
    }
  }, []);

  // Execute realistic multi-strobe lightning discharge
  const triggerThunder = useCallback((atX = null) => {
    setIsStriking(true);

    // Trigger audio event for AudioAtmosphere to play synchronized rumble
    try {
      window.dispatchEvent(new CustomEvent('prison-thunder-strike', { detail: { intensity: 1.0 } }));
    } catch (e) {}

    const overlay = flashOverlayRef.current;
    const canvas = canvasRef.current;

    // Realistic lightning strobe timings:
    // Strobe 1: Initial ionization flash (35ms)
    if (overlay) overlay.style.opacity = '0.35';

    setTimeout(() => {
      // Gap
      if (overlay) overlay.style.opacity = '0.05';

      setTimeout(() => {
        // Strobe 2: Main return stroke discharge (80ms)
        if (overlay) overlay.style.opacity = '0.75';
        drawLightning(atX);

        setTimeout(() => {
          // Strobe 3: Secondary discharge / flutter (60ms)
          if (overlay) overlay.style.opacity = '0.45';

          setTimeout(() => {
            // Smooth afterglow fade out
            if (overlay) {
              overlay.style.transition = 'opacity 0.4s ease-out';
              overlay.style.opacity = '0';
            }

            // Clear bolt from canvas
            setTimeout(() => {
              if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
              }
              if (overlay) {
                overlay.style.transition = 'none';
              }
              setIsStriking(false);
            }, 300);
          }, 60);
        }, 80);
      }, 35);
    }, 40);
  }, [drawLightning]);

  // Periodic automatic randomized strikes
  useEffect(() => {
    const scheduleNextStrike = () => {
      // Strikes randomly every 7 to 13 seconds
      const nextDelay = 7000 + Math.random() * 6000;
      strikeTimerRef.current = setTimeout(() => {
        triggerThunder();
        scheduleNextStrike();
      }, nextDelay);
    };

    // Initial strike after 2.5 seconds of mounting
    strikeTimerRef.current = setTimeout(() => {
      triggerThunder();
      scheduleNextStrike();
    }, 2500);

    return () => {
      if (strikeTimerRef.current) clearTimeout(strikeTimerRef.current);
    };
  }, [triggerThunder]);

  // Responsive canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* 1. Lightning Discharge Canvas (Draws electric branches) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[6] mix-blend-screen"
      />

      {/* 2. Atmospheric Sky Flash Strobe Layer */}
      <div
        ref={flashOverlayRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[5] bg-gradient-to-b from-sky-200 via-sky-400/20 to-prison-gold/15 mix-blend-overlay opacity-0 will-change-[opacity]"
      />

      {/* 3. Subtle Storm Rain / Lightning Mist Overlay */}
      <div 
        aria-hidden="true" 
        className={`absolute inset-0 pointer-events-none z-[4] transition-opacity duration-300 ${
          isStriking ? 'opacity-40' : 'opacity-10'
        }`}
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
        }}
      />

      {/* 4. Interactive "Strike Thunder" Trigger Button in Hero */}
      {interactive && (
        <button
          onClick={() => triggerThunder()}
          title="Click to Strike Thunder!"
          className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-prison-950/80 border border-sky-500/40 text-sky-400 hover:text-white hover:border-sky-400 hover:bg-sky-950/60 shadow-lg text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-200 active:scale-95 group"
        >
          <Zap className={`w-3.5 h-3.5 text-sky-400 group-hover:text-yellow-300 transition-colors ${isStriking ? 'animate-bounce text-yellow-300' : ''}`} />
          <span className="hidden sm:inline">Strike Thunder</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping ml-0.5" />
        </button>
      )}
    </>
  );
}
