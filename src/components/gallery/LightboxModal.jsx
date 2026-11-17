import React, { useEffect } from 'react';
import { SecureImage } from '../../security';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  activeItem,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !activeItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-prison-900/80 border border-prison-700 text-slate-300 hover:text-white hover:bg-prison-gold hover:text-prison-950 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Counter Pill */}
        <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-50 bg-prison-900/90 border border-prison-700 text-xs font-mono text-prison-gold px-3 py-1 rounded">
          {currentIndex + 1} / {totalCount}
        </div>

        {/* Prev Button */}
        <button
          onClick={onPrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-prison-900/80 border border-prison-700 text-white hover:bg-prison-gold hover:text-prison-950 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-prison-900/80 border border-prison-700 text-white hover:bg-prison-gold hover:text-prison-950 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Content Container */}
        <motion.div
          key={activeItem.id}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded overflow-hidden border border-prison-800 shadow-2xl bg-black">
            <SecureImage
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[65vh] w-auto object-contain mx-auto"
            />
          </div>

          {/* Details below image */}
          <div className="mt-4 text-center max-w-2xl px-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-prison-gold/15 border border-prison-gold/40 text-prison-gold text-[10px] font-bold uppercase tracking-wider mb-2">
              <Tag className="w-3 h-3" />
              <span>{activeItem.tag}</span>
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-wider">
              {activeItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
              {activeItem.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
