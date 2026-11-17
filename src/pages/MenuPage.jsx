import React, { useState, useMemo } from 'react';
import { SecureImage } from '../security';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ShieldCheck, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react';
import MenuCategoryFilter from '../components/menu/MenuCategoryFilter';
import MenuItemCard from '../components/menu/MenuItemCard';
import MenuSpecialDeals from '../components/menu/MenuSpecialDeals';
import PrisonHazardBorder from '../components/ui/PrisonHazardBorder';
import ThunderStormEffect from '../components/3d/ThunderStormEffect';
import Button from '../components/ui/Button';
import { MENU_ITEMS } from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);

  // Filtered dishes
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.sinhalaName && item.sinhalaName.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));

      // Verified match
      const matchesVerified = !showOnlyVerified || item.isVerifiedPrice;

      return matchesCategory && matchesSearch && matchesVerified;
    });
  }, [selectedCategory, searchQuery, showOnlyVerified]);

  return (
    <div className="min-h-screen bg-prison-950">
      
      {/* Menu Header */}
      <section className="relative py-20 sm:py-28 bg-prison-900 border-b border-prison-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SecureImage
            src="./images/interior-dining-bbq-parata-menu.jpg"
            alt="The Prison Menu Board Dining"
            className="w-full h-full object-cover filter brightness-[0.22] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-prison-950/75 to-transparent" />
          <div className="absolute inset-0 bg-prison-bars opacity-30 pointer-events-none" />
        </div>

        {/* Cinematic Thunder & Lightning Storm Atmosphere */}
        <ThunderStormEffect interactive={false} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-prison-gold/15 border border-prison-gold/40 text-prison-gold text-xs font-bold uppercase tracking-widest mb-4">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Authentic Sri Lankan & Indian Kitchen</span>
          </div>

          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl text-white tracking-wide leading-tight">
            The Prison <span className="text-prison-gold">Menu & Verified Prices</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            From steaming clay pots of authentic Indian Dum Biriyani to flame-grilled chicken burgers, hot BBQ paratas, and the legendary Kottu creations of Mr. Kottu.
          </p>

          {/* Price Transparency Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold backdrop-blur-sm shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Authentic Menu: All listed prices are verified from official in-store displays and posters.</span>
          </div>
        </div>
      </section>

      <PrisonHazardBorder height="h-1.5" />

      {/* Main Menu Content */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Special Deals Component */}
        <MenuSpecialDeals />

        {/* Filters & Search Controls */}
        <MenuCategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showOnlyVerified={showOnlyVerified}
          onToggleVerified={() => setShowOnlyVerified(!showOnlyVerified)}
        />

        {/* Dish Count Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-prison-800 text-xs uppercase tracking-wider text-slate-400">
          <span>Showing {filteredItems.length} Offerings</span>
          {showOnlyVerified && (
            <span className="text-emerald-400 font-bold">Filtered: Verified Prices Only</span>
          )}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item, idx) => (
              <MenuItemCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-prison-900/60 rounded-sm border border-prison-800 p-8">
            <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
              No Dishes Found
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
              We couldn't find any dishes matching "{searchQuery}". Try searching for "Biriyani", "Burger", "Parata", or clear your filters.
            </p>
            <div className="mt-5">
              <Button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setShowOnlyVerified(false); }}
                variant="outline"
                size="sm"
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Order on WhatsApp / Inquiries Banner */}
        <div className="mt-16 p-8 rounded-sm bg-prison-900 border border-prison-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
              Ready to Order for Dine-In or Takeaway?
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Call our hotline or message us on WhatsApp with your selected items for immediate preparation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={MessageCircle}
              className="shadow-glow-gold"
            >
              Order via WhatsApp
            </Button>
            <Button
              to="/reservations"
              variant="secondary"
              size="lg"
            >
              Reserve Cell Booth
            </Button>
          </div>
        </div>

      </section>

    </div>
  );
}
