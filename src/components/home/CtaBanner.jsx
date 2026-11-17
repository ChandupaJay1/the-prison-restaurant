import React from 'react';
import { Calendar, Phone, UtensilsCrossed } from 'lucide-react';
import Button from '../ui/Button';
import PrisonHazardBorder from '../ui/PrisonHazardBorder';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function CtaBanner() {
  return (
    <section className="relative bg-prison-950 overflow-hidden">
      <PrisonHazardBorder height="h-1.5" />

      <div className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-prison-gold mb-3 block">
          {RESTAURANT_INFO.secondaryMotto}
        </span>

        <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-wide text-white leading-tight">
          Ready to Serve Your Sentence?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Book an authentic prison cell booth for your gang, order a piping hot Indian Dum Biriyani feast, or grab an Indian Grill Chicken burger on the run.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to="/reservations"
            variant="primary"
            size="lg"
            icon={Calendar}
            className="w-full sm:w-auto shadow-glow-gold"
          >
            Book A Table Online
          </Button>

          <Button
            to="/menu"
            variant="secondary"
            size="lg"
            icon={UtensilsCrossed}
            className="w-full sm:w-auto"
          >
            Explore Menu & Prices
          </Button>

          <Button
            href={RESTAURANT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="orange"
            size="lg"
            icon={Phone}
            className="w-full sm:w-auto"
          >
            Quick WhatsApp
          </Button>
        </div>
      </div>

      <PrisonHazardBorder height="h-1.5" />
    </section>
  );
}
