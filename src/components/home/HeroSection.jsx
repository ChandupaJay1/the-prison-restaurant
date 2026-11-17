import React from 'react';
import { SecureImage } from '../../security';
import { motion } from 'framer-motion';
import { Utensils, Calendar, ShieldCheck, MapPin, Sparkles, Flame } from 'lucide-react';
import Button from '../ui/Button';
import KineticMarquee from '../3d/KineticMarquee';
import ThunderStormEffect from '../3d/ThunderStormEffect';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-prison-950 pt-16">
        {/* Background Image with Dark Vignette & Industrial Overlay */}
        <div className="absolute inset-0 z-0">
          <SecureImage
            src="./images/exterior-night-good-food-bad-boys.jpg"
            alt="The Prison Restaurant Storefront Night"
            className="w-full h-full object-cover object-center filter brightness-[0.16] contrast-125 scale-100"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-prison-950/80 to-prison-950/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-prison-950/90 via-transparent to-prison-950/90" />
          {/* Prison Bar Lines Overlay */}
          <div className="absolute inset-0 bg-prison-bars pointer-events-none opacity-30" />
        </div>

        {/* Crisp, Centered, Fully-Fitted Background Watermark: EAT _ DRINK _ ESCAPE */}
        <div className="absolute top-24 sm:top-28 left-0 right-0 select-none pointer-events-none z-[1] text-center flex items-center justify-center px-4">
          <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.16em] sm:tracking-[0.2em] text-white/15 uppercase whitespace-nowrap drop-shadow-sm">
            EAT _ DRINK _ ESCAPE
          </span>
        </div>

        {/* Cinematic Thunder & Lightning Storm Atmosphere */}
        <ThunderStormEffect interactive={false} />

        {/* Floating Top Hazard Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 hazard-stripe-bar z-10 opacity-70" />

        {/* Centered Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center my-auto">
          {/* Brand Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-prison-900/90 border border-prison-gold/40 text-prison-gold text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-glow-gold"
          >
            <Sparkles className="w-4 h-4 text-prison-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span>{RESTAURANT_INFO.sinhalaMotto}</span>
            <span className="text-slate-400">•</span>
            <span>{RESTAURANT_INFO.tagline}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[0.95] drop-shadow-2xl"
          >
            GOOD FOOD. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-prison-gold via-yellow-300 to-prison-orange">
              GREAT TIMES.
            </span>
          </motion.h1>

          {/* Secondary Catchphrase */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl font-light text-slate-200 tracking-wide max-w-3xl mx-auto"
          >
            Every Meal Served on Good Behavior.
          </motion.p>

          {/* Short Concept Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Sri Lanka's most talked-about novelty jail-themed dining and chill lounge. Savor slow-cooked Indian Dum Biriyani, Indian Grill Burgers, BBQ Paratas, and legendary Kottu recipes by founder <strong className="text-white">Mr. Kottu (Viraj Wickramanayake)</strong>.
          </motion.p>

          {/* Primary Call-To-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              to="/menu"
              variant="primary"
              size="lg"
              icon={Utensils}
              className="w-full sm:w-auto shadow-glow-gold text-base"
            >
              Explore Our Menu
            </Button>

            <Button
              to="/reservations"
              variant="secondary"
              size="lg"
              icon={Calendar}
              className="w-full sm:w-auto text-base hover:border-prison-gold"
            >
              Book A Table
            </Button>
          </motion.div>

          {/* Quick Highlights Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold uppercase tracking-wider text-slate-300"
          >
            <div className="flex items-center justify-center gap-2 p-2.5 rounded bg-prison-900/60 border border-white/5 backdrop-blur-sm">
              <Flame className="w-4 h-4 text-prison-gold shrink-0" />
              <span>Indian Dum Biriyani</span>
            </div>

            <div className="flex items-center justify-center gap-2 p-2.5 rounded bg-prison-900/60 border border-white/5 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Themed Prison Cells</span>
            </div>

            <div className="flex items-center justify-center gap-2 p-2.5 rounded bg-prison-900/60 border border-white/5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-prison-orange shrink-0" />
              <span>BYOB & Live Music</span>
            </div>

            <div className="flex items-center justify-center gap-2 p-2.5 rounded bg-prison-900/60 border border-white/5 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Piliyandala & Maharagama</span>
            </div>
          </motion.div>
        </div>

        {/* Dialed Coffee Kinetic Marquee Ticker */}
        <div className="relative z-10 mt-auto">
          <KineticMarquee direction="left" speed={28} />
        </div>
      </section>
    </>
  );
}
