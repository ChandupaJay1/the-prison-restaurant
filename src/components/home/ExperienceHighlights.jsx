import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Wine, Music, Trees, Flame, Tv } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function ExperienceHighlights() {
  const iconMap = {
    ShieldAlert: ShieldAlert,
    Wine: Wine,
    Music: Music,
    Trees: Trees,
    Flame: Flame,
    Tv: Tv
  };

  return (
    <section className="py-20 md:py-28 bg-prison-950 relative border-t border-prison-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tagline="The Atmosphere"
          title="More Than A Meal – An Unforgettable Escape"
          highlightWord="Unforgettable Escape"
          subtitle="Discover what makes The Prison Sri Lanka's most engaging hangout spot. Every corner is carefully designed for groups, dates, celebrations, and late night cravings."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {RESTAURANT_INFO.amenities.map((item, idx) => {
            const Icon = iconMap[item.icon] || ShieldAlert;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-prison-850/80 p-6 sm:p-7 rounded-sm border border-prison-700/60 hover:border-prison-gold/50 transition-all duration-300 shadow-lg group hover:-translate-y-1 relative"
              >
                <div className="w-12 h-12 rounded bg-prison-900 border border-prison-700 text-prison-gold group-hover:bg-prison-gold group-hover:text-prison-950 group-hover:border-prison-gold transition-colors flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white group-hover:text-prison-gold transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Subtle bottom indicator */}
                <div className="mt-5 w-8 h-0.5 bg-prison-700 group-hover:w-16 group-hover:bg-prison-gold transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Real Atmosphere Quote Banner */}
        <div className="mt-14 p-8 rounded-sm bg-gradient-to-r from-prison-900 via-prison-850 to-prison-900 border border-prison-gold/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-prison-bars opacity-20 pointer-events-none" />
          <h4 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
            "CRIME PAYS... WITH GREAT FOOD!"
          </h4>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Book your cell booth in advance for birthdays, parties, or weekend BYOB nights.
          </p>
        </div>
      </div>
    </section>
  );
}
