import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Wine, ShieldAlert, Phone, Users, Check } from 'lucide-react';
import ReservationForm from '../components/reservation/ReservationForm';
import PrisonHazardBorder from '../components/ui/PrisonHazardBorder';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-prison-950">
      
      {/* Reservation Header */}
      <section className="relative py-20 sm:py-28 bg-prison-900 border-b border-prison-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="./images/interior-prison-feature-wall.jpg"
            alt="The Prison Booths"
            className="w-full h-full object-cover filter brightness-[0.22] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-prison-950/75 to-transparent" />
          <div className="absolute inset-0 bg-prison-bars opacity-30 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-prison-gold/15 border border-prison-gold/40 text-prison-gold text-xs font-bold uppercase tracking-widest mb-4">
            <Calendar className="w-4 h-4" />
            <span>Online Table Booking</span>
          </div>

          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl text-white tracking-wide leading-tight">
            Reserve Your <span className="text-prison-gold">Cell Behind Bars</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Guarantee your private jail cell booth or outdoor garden table in advance. Instant online confirmation with WhatsApp synchronization.
          </p>
        </div>
      </section>

      <PrisonHazardBorder height="h-1.5" />

      {/* Main Reservation Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form (8 Cols) */}
          <div className="lg:col-span-8">
            <ReservationForm />
          </div>

          {/* Right Column: Policies & Tips (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* BYOB Card */}
            <div className="bg-prison-850 p-6 rounded-sm border border-prison-700/80 shadow-xl">
              <div className="flex items-center gap-3 text-prison-orange mb-3">
                <Wine className="w-6 h-6" />
                <h4 className="font-display font-bold text-lg uppercase tracking-wider text-white">
                  BYOB Policy
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Guests at our Piliyandala Flagship are warmly invited to bring their favorite wine, beer, or spirits. We provide chilled glassware, ice buckets, and fresh chasers.
              </p>
            </div>

            {/* Reservation Guidelines */}
            <div className="bg-prison-850 p-6 rounded-sm border border-prison-700/80 shadow-xl">
              <h4 className="font-display font-bold text-lg uppercase tracking-wider text-white mb-4 border-l-2 border-prison-gold pl-2.5">
                Good Behavior Guidelines
              </h4>
              <ul className="space-y-3 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-prison-gold shrink-0 mt-0.5" />
                  <span><strong>15-Minute Grace Period:</strong> Reserved tables are held for 15 minutes past scheduled time before being offered to walk-ins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-prison-gold shrink-0 mt-0.5" />
                  <span><strong>Cell Booth Allocation:</strong> Cell booths are assigned on a first-reserved basis; early booking is recommended for weekends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-prison-gold shrink-0 mt-0.5" />
                  <span><strong>Large Gatherings (15+ Guests):</strong> For company parties or mega celebrations, please call our hotline directly.</span>
                </li>
              </ul>
            </div>

            {/* Quick Hotline Card */}
            <div className="bg-gradient-to-br from-prison-900 to-prison-850 p-6 rounded-sm border border-prison-gold/40 shadow-xl text-center">
              <Phone className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-display font-bold text-base uppercase tracking-wider text-white">
                Prefer Phone Booking?
              </h4>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Call our direct restaurant hotline for immediate assistance.
              </p>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="inline-block bg-prison-gold hover:bg-prison-gold-light text-prison-950 px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-colors shadow-glow-gold"
              >
                Call: {RESTAURANT_INFO.phone}
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
