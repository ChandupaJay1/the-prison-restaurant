import React from 'react';
import { SecureImage } from '../../security';
import { motion } from 'framer-motion';
import { Maximize2, Tag } from 'lucide-react';

export default function GalleryCard({ item, index = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => onClick(item)}
      className="group relative h-72 sm:h-80 rounded-sm overflow-hidden border border-prison-800 bg-black cursor-pointer shadow-lg hover:border-prison-gold/60 transition-all duration-300"
    >
      <SecureImage
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-prison-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Tag Badge */}
      <div className="absolute top-3 left-3 bg-prison-900/90 border border-prison-gold/40 text-prison-gold px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
        <Tag className="w-3 h-3 text-prison-gold" />
        <span>{item.tag}</span>
      </div>

      {/* Zoom Icon Button */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-prison-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
        <Maximize2 className="w-4 h-4 text-prison-gold" />
      </div>

      {/* Caption Content */}
      <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wider leading-snug group-hover:text-prison-gold transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-slate-300 line-clamp-2 mt-1 font-light opacity-90">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
