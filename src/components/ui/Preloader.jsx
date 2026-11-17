import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecureImage, loadSecureMedia } from '../../security';

/**
 * Sleek Cinematic Prison-Gate Preloader
 * Preloads core encrypted vault media while animating a crisp 0-100% progress reveal,
 * then splits open like steel jail doors to unveil The Prison Restaurant.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scroll while preloader is active
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Warm up critical Secure Media Vault assets in parallel
    const preloadAssets = [
      './images/the-prison-logo.jpg',
      './images/exterior-night-good-food-bad-boys.jpg',
      './images/menu-indian-dum-biryani.jpg',
    ];
    Promise.all(preloadAssets.map((p) => loadSecureMedia(p))).catch(() => {});

    // Crisp ~1.25s smooth progress ramp
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 10;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = prevOverflow || '';
        }, 280);
      } else {
        setProgress(current);
      }
    }, 110);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = prevOverflow || '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="prison-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.7 } }}
          className="fixed inset-0 z-[9990] pointer-events-auto overflow-hidden flex items-center justify-center select-none"
        >
          {/* Left Steel Gate Panel */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-prison-950 border-r border-prison-gold/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-prison-bars opacity-35" />
            <div className="absolute top-0 left-0 right-0 h-1 hazard-stripe-bar opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 h-1 hazard-stripe-bar opacity-80" />
          </motion.div>

          {/* Right Steel Gate Panel */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-prison-950 border-l border-prison-gold/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-prison-bars opacity-35" />
            <div className="absolute top-0 left-0 right-0 h-1 hazard-stripe-bar opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 h-1 hazard-stripe-bar opacity-80" />
          </motion.div>

          {/* Center Emblem & Compact Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute -inset-12 bg-prison-gold/15 rounded-full blur-3xl pointer-events-none" />

            {/* Tactical Framed Logo */}
            <div className="relative p-2.5 mb-5">
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-prison-gold" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-prison-gold" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-prison-gold" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-prison-gold" />

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden border border-prison-gold/40 bg-black shadow-glow-gold flex items-center justify-center">
                <SecureImage
                  src="./images/the-prison-logo.jpg"
                  alt="The Prison Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Brand Title */}
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-[0.22em] text-white uppercase">
              THE <span className="text-prison-gold">PRISON</span>
            </h1>

            <p className="mt-1 text-[10px] sm:text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
              EAT _ DRINK _ ESCAPE
            </p>

            {/* Sleek Compact Progress Bar */}
            <div className="mt-6 w-52 sm:w-64">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                <span className="text-slate-400">
                  {progress < 100 ? 'Unlocking Cell Doors...' : 'Ready to Escape'}
                </span>
                <span className="text-prison-gold font-mono">
                  {String(progress).padStart(2, '0')}%
                </span>
              </div>
              <div className="h-1 w-full rounded-full bg-prison-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-prison-gold via-yellow-300 to-prison-orange shadow-glow-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.15 }}
                />
              </div>
            </div>

            {/* Subtle Motto */}
            <p className="mt-4 text-[11px] text-prison-gold/80 font-medium tracking-wider">
              මාංචු වෙනුවට කෑම
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
