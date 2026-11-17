import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Tv, MessageSquare } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { TESTIMONIALS_DATA } from '../../data/testimonialsData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-prison-900/50 relative border-t border-prison-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tagline="Guest Word"
          title="What Diners & Food Vlogs Are Saying"
          highlightWord="Diners & Food Vlogs"
          subtitle="Genuine community reaction, broadcast highlights, and foodie reviews on The Prison's food and jail concept."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-prison-850 p-6 sm:p-8 rounded-sm border border-prison-700/70 relative flex flex-col justify-between hover:border-prison-gold/50 transition-colors shadow-lg"
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-prison-gold text-prison-gold" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-prison-700 opacity-60" />
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-prison-700/60 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-white text-base uppercase tracking-wider">
                    {t.name}
                  </h4>
                  <span className="text-xs text-prison-gold block font-medium">
                    {t.role}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">
                    {t.source}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {t.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
