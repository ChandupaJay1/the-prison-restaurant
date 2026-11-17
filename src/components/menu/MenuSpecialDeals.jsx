import React from 'react';
import { SecureImage } from '../../security';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { SPECIAL_DEALS } from '../../data/menuData';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function MenuSpecialDeals() {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-prison-gold" />
        <h3 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
          Featured Value Deals & Group Sharing Boxes
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SPECIAL_DEALS.map((deal, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-prison-850 to-prison-900 rounded-sm border border-prison-gold/40 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-prison-gold transition-colors"
          >
            <div className="absolute top-0 right-0 bg-prison-gold text-prison-950 px-3 py-0.5 font-bold text-[10px] uppercase tracking-wider">
              {deal.badge}
            </div>

            <div>
              <div className="h-40 rounded-sm overflow-hidden mb-4 bg-black">
                <SecureImage
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="font-display font-bold text-xl uppercase tracking-wide text-white">
                {deal.title}
              </h4>

              <div className="text-prison-gold font-display font-bold text-lg mt-1 mb-2">
                {deal.price}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {deal.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-prison-700/60">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20The%20Prison!%20I%20am%20interested%20in%20ordering%20the%20deal:%20${encodeURIComponent(deal.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded bg-prison-900 hover:bg-prison-gold hover:text-prison-950 text-slate-200 border border-prison-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{deal.cta}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
