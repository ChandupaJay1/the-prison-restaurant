import React from 'react';
import { GALLERY_CATEGORIES } from '../../data/galleryData';

export default function GalleryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
      {GALLERY_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
              isActive
                ? 'bg-prison-gold text-prison-950 border-prison-gold shadow-glow-gold'
                : 'bg-prison-900 text-slate-300 border-prison-800 hover:bg-prison-850 hover:text-white hover:border-prison-700'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
