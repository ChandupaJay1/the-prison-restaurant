import React from 'react';
import { Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function TopBanner() {
  return (
    <div className="bg-prison-950 border-b border-prison-800/80 text-xs py-2 px-4 text-slate-300 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 text-prison-gold font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{RESTAURANT_INFO.sinhalaMotto}</span>
            <span className="text-slate-400 font-normal">({RESTAURANT_INFO.sinhalaMottoEn})</span>
          </span>
          <span className="hidden md:inline-block text-prison-700">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-prison-gold" />
            <span>{RESTAURANT_INFO.openingHours.weekdays}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
          <a
            href={RESTAURANT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-prison-gold transition-colors inline-flex items-center gap-1 font-medium text-[11px] sm:text-xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hotline: {RESTAURANT_INFO.phone}</span>
          </a>

          <span className="hidden sm:inline-block text-prison-700">|</span>

          <a
            href="#branches"
            className="hover:text-prison-gold transition-colors inline-flex items-center gap-1 text-[11px] sm:text-xs"
          >
            <MapPin className="w-3.5 h-3.5 text-prison-orange" />
            <span>Piliyandala & Maharagama</span>
          </a>
        </div>
      </div>
    </div>
  );
}
