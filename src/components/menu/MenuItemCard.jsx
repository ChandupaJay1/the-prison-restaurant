import React from 'react';
import { SecureImage } from '../../security';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Flame, Users, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function MenuItemCard({ item, index = 0 }) {
  const whatsappDishUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20The%20Prison!%20I%20would%20like%20to%20order%20or%20inquire%20about:%20${encodeURIComponent(item.name)}${item.priceFormatted ? `%20(${item.priceFormatted})` : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-prison-850 rounded-sm border border-prison-700/80 overflow-hidden flex flex-col justify-between hover:border-prison-gold/60 transition-all duration-300 shadow-xl group hover:-translate-y-1"
    >
      <div>
        {/* Image Container */}
        <div className="relative h-48 sm:h-52 bg-black overflow-hidden">
          <SecureImage
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-prison-950/20 to-transparent" />

          {/* Badges on Top */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            {item.isVerifiedPrice ? (
              <span className="bg-emerald-950/95 text-emerald-300 border border-emerald-500/60 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md backdrop-blur-sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Verified Price</span>
              </span>
            ) : (
              <span className="bg-prison-900/95 text-slate-300 border border-prison-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                {item.category === 'kottu' ? 'Original Mr. Kottu' : 'Chef Special'}
              </span>
            )}

            {item.isPopular && (
              <span className="bg-prison-orange text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Flame className="w-3 h-3 fill-current" />
                <span>Popular</span>
              </span>
            )}
          </div>

          {/* Price Pill */}
          <div className="absolute bottom-2.5 left-2.5 bg-prison-gold text-prison-950 font-display font-bold text-lg px-2.5 py-0.5 rounded-sm shadow-lg flex items-center gap-1">
            <span>{item.priceFormatted}</span>
          </div>

          {/* Serving Pill */}
          {item.servings && (
            <div className="absolute bottom-2.5 right-2.5 bg-prison-950/90 text-slate-300 text-[11px] font-medium px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
              <Users className="w-3 h-3 text-prison-gold" />
              <span>{item.servings}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {item.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-prison-900 text-slate-300 border border-prison-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white group-hover:text-prison-gold transition-colors leading-tight">
            {item.name}
          </h3>

          {item.sinhalaName && (
            <p className="text-xs text-slate-400 font-medium mt-0.5 mb-2">
              {item.sinhalaName}
            </p>
          )}

          <p className="text-xs text-slate-300 leading-relaxed font-light mt-2 line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer with Verification Note & WhatsApp CTA */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0">
        <div className="pt-3 border-t border-prison-700/60 flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-400 italic line-clamp-1">
            {item.verificationNote}
          </span>

          <a
            href={whatsappDishUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
