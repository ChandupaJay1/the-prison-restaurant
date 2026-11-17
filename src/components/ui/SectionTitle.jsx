import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({
  tagline,
  title,
  subtitle,
  centered = true,
  alignLeft = false,
  highlightWord,
  className = ''
}) {
  const isCentered = centered && !alignLeft;

  return (
    <div className={`mb-12 md:mb-16 ${isCentered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {tagline && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded bg-prison-gold/10 border border-prison-gold/30 text-prison-gold text-xs font-bold uppercase tracking-widest ${isCentered ? 'justify-center' : ''}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-prison-gold animate-pulse"></span>
          <span>{tagline}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-wide text-white leading-tight"
      >
        {title && highlightWord && title.includes(highlightWord) ? (
          <>
            {title.substring(0, title.indexOf(highlightWord))}
            <span className="text-prison-gold relative inline-block">
              {highlightWord}
              <span className="absolute bottom-1 left-0 right-0 h-1 bg-prison-gold/30 -z-10 transform -rotate-1"></span>
            </span>
            {title.substring(title.indexOf(highlightWord) + highlightWord.length)}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative Prison Hazard Bar */}
      <div className={`mt-5 flex items-center gap-1.5 ${isCentered ? 'justify-center' : 'justify-start'}`}>
        <span className="w-12 h-1 bg-prison-gold rounded-full"></span>
        <span className="w-3 h-1 bg-prison-orange rounded-full"></span>
        <span className="w-1.5 h-1 bg-slate-600 rounded-full"></span>
      </div>
    </div>
  );
}
