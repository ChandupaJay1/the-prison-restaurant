import React from 'react';
import { SecureImage } from '../security';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ExternalLink } from 'lucide-react';
import ContactInfoCards from '../components/contact/ContactInfoCards';
import LocationsDetail from '../components/contact/LocationsDetail';
import DirectContactForm from '../components/contact/DirectContactForm';
import PrisonHazardBorder from '../components/ui/PrisonHazardBorder';
import ThunderStormEffect from '../components/3d/ThunderStormEffect';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-prison-950">
      
      {/* Contact Header */}
      <section className="relative py-20 sm:py-28 bg-prison-900 border-b border-prison-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SecureImage
            src="./images/exterior-night-good-food-bad-boys.jpg"
            alt="The Prison Night Street View"
            className="w-full h-full object-cover filter brightness-[0.22] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-prison-950/75 to-transparent" />
          <div className="absolute inset-0 bg-prison-bars opacity-30 pointer-events-none" />
        </div>

        {/* Cinematic Thunder & Lightning Storm Atmosphere */}
        <ThunderStormEffect interactive={false} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-prison-gold/15 border border-prison-gold/40 text-prison-gold text-xs font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-4 h-4" />
            <span>Find & Reach Us</span>
          </div>

          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl text-white tracking-wide leading-tight">
            Contact & <span className="text-prison-gold">Branch Locations</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Visit us in Piliyandala or Maharagama, inquire about party bookings, or connect directly via WhatsApp.
          </p>
        </div>
      </section>

      <PrisonHazardBorder height="h-1.5" />

      {/* Main Content */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Info Cards Grid */}
        <ContactInfoCards />

        {/* Locations Detail with Interactive Map */}
        <div id="piliyandala-map">
          <LocationsDetail />
        </div>

        {/* Delivery Zone Feature & Direct Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Delivery Coverage Map Photo */}
          <div className="lg:col-span-5 bg-prison-850 p-6 rounded-sm border border-prison-700/80 shadow-xl space-y-4">
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
              Direct Delivery Coverage
            </h3>

            <div className="rounded overflow-hidden border border-prison-800 bg-black">
              <SecureImage
                src="./images/map-delivery-coverage-zone.jpg"
                alt="Delivery Coverage Map for The Prison"
                className="w-full h-64 object-cover"
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              We deliver piping hot Indian Dum Biriyani pots, Indian Grill burgers, and BBQ parata sets across all key regions:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {RESTAURANT_INFO.deliveryZones.map((zone, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-semibold px-2 py-0.5 rounded bg-prison-900 border border-prison-800 text-prison-gold"
                >
                  {zone}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-prison-700/60 flex items-center justify-between">
              <span className="text-xs text-slate-400">Order via Uber Eats:</span>
              <a
                href={RESTAURANT_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Uber Eats App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Direct Message Form */}
          <div className="lg:col-span-7">
            <DirectContactForm />
          </div>

        </div>

      </section>

    </div>
  );
}
