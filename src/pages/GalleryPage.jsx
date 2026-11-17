import React, { useState, useMemo } from 'react';
import { SecureImage } from '../security';
import { Camera, ShieldCheck, Sparkles } from 'lucide-react';
import GalleryFilter from '../components/gallery/GalleryFilter';
import GalleryCard from '../components/gallery/GalleryCard';
import LightboxModal from '../components/gallery/LightboxModal';
import PrisonHazardBorder from '../components/ui/PrisonHazardBorder';
import ThunderStormEffect from '../components/3d/ThunderStormEffect';
import { GALLERY_ITEMS } from '../data/galleryData';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const currentIndex = activeItem
    ? filteredItems.findIndex(i => i.id === activeItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex <= 0) {
      setActiveItem(filteredItems[filteredItems.length - 1]);
    } else {
      setActiveItem(filteredItems[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= filteredItems.length - 1) {
      setActiveItem(filteredItems[0]);
    } else {
      setActiveItem(filteredItems[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-prison-950">
      
      {/* Gallery Header */}
      <section className="relative py-20 sm:py-28 bg-prison-900 border-b border-prison-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SecureImage
            src="./images/exterior-storefront-neon-night.jpg"
            alt="The Prison Storefront Night"
            className="w-full h-full object-cover filter brightness-[0.25] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-prison-950/70 to-transparent" />
          <div className="absolute inset-0 bg-prison-bars opacity-30 pointer-events-none" />
        </div>

        {/* Cinematic Thunder & Lightning Storm Atmosphere */}
        <ThunderStormEffect interactive={false} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-prison-gold/15 border border-prison-gold/40 text-prison-gold text-xs font-bold uppercase tracking-widest mb-4">
            <Camera className="w-4 h-4" />
            <span>Authentic Imagery Tour</span>
          </div>

          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl text-white tracking-wide leading-tight">
            The Prison <span className="text-prison-gold">Visual Gallery</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Take a visual tour through our themed barred cell booths, neon storefront, lush open lawn garden, grand opening ceremony, and authentic Indian Dum Biriyanis.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-xs text-slate-400 bg-prison-950/80 px-3 py-1 rounded border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Authentic Photos sourced from The Prison's official Facebook and dining venues.</span>
          </div>
        </div>
      </section>

      <PrisonHazardBorder height="h-1.5" />

      {/* Main Gallery Content */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filters */}
        <GalleryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={idx}
              onClick={(it) => setActiveItem(it)}
            />
          ))}
        </div>

      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={Boolean(activeItem)}
        activeItem={activeItem}
        onClose={() => setActiveItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={currentIndex}
        totalCount={filteredItems.length}
      />

    </div>
  );
}
