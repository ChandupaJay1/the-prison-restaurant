import React, { useState } from 'react';
import { MapPin, Phone, Clock, Car, ShieldCheck, ExternalLink, Navigation } from 'lucide-react';
import Button from '../ui/Button';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function LocationsDetail() {
  const [activeBranchId, setActiveBranchId] = useState('piliyandala');

  const activeBranch = RESTAURANT_INFO.branches.find(b => b.id === activeBranchId) || RESTAURANT_INFO.branches[0];

  return (
    <div className="bg-prison-850 rounded-sm border border-prison-700/80 overflow-hidden shadow-2xl mb-16">
      
      {/* Branch Tab Header */}
      <div className="flex border-b border-prison-700 bg-prison-900">
        {RESTAURANT_INFO.branches.map((b) => {
          const isSelected = activeBranchId === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setActiveBranchId(b.id)}
              className={`flex-1 py-4 px-6 text-center text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
                isSelected
                  ? 'bg-prison-850 text-prison-gold'
                  : 'text-slate-400 hover:text-white hover:bg-prison-800'
              }`}
            >
              <span>{b.name}</span>
              {isSelected && (
                <div className="absolute top-0 inset-x-0 h-1 bg-prison-gold" />
              )}
            </button>
          );
        })}
      </div>

      {/* Branch Content */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Details Col */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-prison-gold/10 border border-prison-gold/30 text-prison-gold text-[11px] font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeBranch.isFlagship ? 'Flagship Dine-In & Lounge' : 'Express Dine-In & Delivery'}</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
                {activeBranch.name}
              </h3>
              
              <p className="mt-2 text-sm text-slate-300 leading-relaxed font-light">
                {activeBranch.address}
              </p>
            </div>

            {/* Hours & Phone */}
            <div className="p-4 rounded bg-prison-900 border border-prison-800 space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-prison-gold shrink-0" />
                <span><strong>Hours:</strong> {activeBranch.hours}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Direct Call:</strong> {activeBranch.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Car className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong>Parking:</strong> On-site customer parking available</span>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Location Features:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {activeBranch.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300 bg-prison-950 p-2 rounded border border-prison-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-prison-gold shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                to="/reservations"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                Book Table Here
              </Button>
              <Button
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                icon={Phone}
                className="w-full sm:w-auto"
              >
                Inquire on WhatsApp
              </Button>
            </div>
          </div>

          {/* Google Maps Embed Col */}
          <div className="lg:col-span-7 h-80 sm:h-96 rounded-sm overflow-hidden border border-prison-700 bg-prison-950 relative">
            <iframe
              src={activeBranch.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${activeBranch.name} Map`}
              className="w-full h-full"
            ></iframe>

            <div className="absolute bottom-3 right-3 bg-prison-950/90 text-white border border-prison-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm pointer-events-none">
              <Navigation className="w-3.5 h-3.5 text-prison-gold" />
              <span>{activeBranch.shortLocation}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
