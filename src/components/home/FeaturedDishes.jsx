import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Flame, Users, ArrowRight, Sparkles } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import TiltCard from '../3d/TiltCard';
import { MENU_ITEMS } from '../../data/menuData';

export default function FeaturedDishes() {
  // Select top featured items
  const featured = [
    MENU_ITEMS.find(i => i.id === 'biryani-single'),
    MENU_ITEMS.find(i => i.id === 'biryani-3p'),
    MENU_ITEMS.find(i => i.id === 'burger-single'),
    MENU_ITEMS.find(i => i.id === 'parata-quarter'),
  ].filter(Boolean);

  return (
    <section className="py-20 md:py-28 bg-prison-900/60 relative border-y border-prison-800">
      {/* Background Prison Bars Texture */}
      <div className="absolute inset-0 bg-prison-bars opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tagline="Handcrafted Cravings"
          title="Signature Dishes & Verified Prices"
          highlightWord="Verified Prices"
          subtitle="Direct from our kitchen counters in Piliyandala and Maharagama. Every price listed below is verified from our official in-store and promotional menu."
        />

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard maxTilt={10} glare={true} className="h-full rounded-sm">
                <div className="group bg-prison-850 rounded-sm border border-prison-700/80 overflow-hidden flex flex-col hover:border-prison-gold/60 transition-all duration-300 shadow-xl h-full">
              {/* Image Container with Badges */}
              <div className="relative h-56 overflow-hidden bg-black">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-transparent to-transparent opacity-80" />

                {/* Price Tag Pill */}
                <div className="absolute bottom-3 left-3 bg-prison-gold text-prison-950 px-3 py-1 rounded-sm font-display font-bold text-lg tracking-wider shadow-lg flex items-center gap-1">
                  <span>{dish.priceFormatted}</span>
                </div>

                {/* Verified Price Badge */}
                {dish.isVerifiedPrice && (
                  <div className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-prison-gold">
                      {dish.category === 'biryani' ? 'Indian Dum Biriyani' : dish.category === 'burgers' ? 'Grill Burger' : 'BBQ & Parata'}
                    </span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      {dish.servings}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white group-hover:text-prison-gold transition-colors line-clamp-1">
                    {dish.name}
                  </h3>
                  
                  {dish.sinhalaName && (
                    <p className="text-xs text-slate-400 mb-2 font-medium">
                      {dish.sinhalaName}
                    </p>
                  )}

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mt-2 font-light">
                    {dish.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3 border-t border-prison-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 italic">
                    {dish.verificationNote}
                  </span>
                  <Link
                    to="/menu"
                    className="text-xs font-bold uppercase tracking-wider text-prison-gold hover:text-white flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
            </TiltCard>
          </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Button
            to="/menu"
            variant="outline"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
          >
            Explore Complete Menu & Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
