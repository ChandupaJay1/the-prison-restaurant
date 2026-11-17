import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import TiltCard from '../3d/TiltCard';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function FeaturedBranches() {
  return (
    <section id="branches" className="py-20 md:py-28 bg-prison-900/40 relative border-t border-prison-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tagline="Our Locations"
          title="Visit Us in Piliyandala & Maharagama"
          highlightWord="Piliyandala & Maharagama"
          subtitle="Whether you're looking for an unforgettable themed jail-cell dining night in Piliyandala or quick Indian Kitchen bites in Maharagama, we are open and ready to serve your time."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {RESTAURANT_INFO.branches.map((branch, idx) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="h-full"
            >
              <TiltCard maxTilt={8} glare={true} className="h-full rounded-sm">
                <div className="bg-prison-850 rounded-sm border border-prison-700/80 p-6 sm:p-8 flex flex-col justify-between hover:border-prison-gold/60 transition-all duration-300 shadow-xl group relative overflow-hidden h-full">
              {/* Flagship ribbon */}
              {branch.isFlagship && (
                <div className="absolute top-0 right-0 bg-prison-gold text-prison-950 font-display font-bold text-xs uppercase px-4 py-1 tracking-wider shadow-md">
                  Flagship Venue
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Open Daily • Dine-In & Takeaway
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-wide text-white group-hover:text-prison-gold transition-colors">
                  {branch.name}
                </h3>

                <p className="mt-2 text-sm text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-prison-orange shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </p>

                <p className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-prison-gold shrink-0" />
                  <span>{branch.hours}</span>
                </p>

                {/* Features Badges */}
                <div className="mt-6 pt-5 border-t border-prison-700/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Venue Amenities:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {branch.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-prison-900 border border-prison-700 text-xs text-slate-300 font-medium"
                      >
                        <ShieldCheck className="w-3 h-3 text-prison-gold" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Branch Action Buttons */}
              <div className="mt-8 pt-5 border-t border-prison-700/60 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  to="/reservations"
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Reserve Here
                </Button>
                <Button
                  href={RESTAURANT_INFO.whatsappUrl}
                  variant="secondary"
                  size="sm"
                  icon={Phone}
                  className="w-full sm:w-auto"
                >
                  Call / WhatsApp
                </Button>
                <Button
                  to="/contact"
                  variant="ghost"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-prison-gold sm:ml-auto"
                >
                  Map Details
                </Button>
              </div>
            </div>
            </TiltCard>
          </motion.div>
          ))}
        </div>

        {/* Delivery Zone Banner */}
        <div className="mt-12 bg-prison-950 p-6 rounded-sm border border-prison-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-prison-gold/10 border border-prison-gold/30 text-prison-gold flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                Direct Delivery Coverage Radius
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                We deliver directly to: {RESTAURANT_INFO.deliveryZones.join(', ')} and surrounding borders.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              href={RESTAURANT_INFO.whatsappUrl}
              variant="outline"
              size="sm"
              icon={Phone}
            >
              Order on WhatsApp
            </Button>
            <Button
              href={RESTAURANT_INFO.uberEatsUrl}
              variant="secondary"
              size="sm"
              icon={ExternalLink}
              iconPosition="right"
            >
              Uber Eats
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
