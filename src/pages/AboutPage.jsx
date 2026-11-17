import React from 'react';
import { SecureImage } from '../security';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, Award, Wine, Trees, Music, ArrowRight, Heart } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import PrisonHazardBorder from '../components/ui/PrisonHazardBorder';
import ThunderStormEffect from '../components/3d/ThunderStormEffect';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-prison-950">
      
      {/* Hero Header */}
      <section className="relative py-24 sm:py-32 bg-prison-900 border-b border-prison-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SecureImage
            src="./images/interior-prison-feature-wall.jpg"
            alt="The Prison Interior"
            className="w-full h-full object-cover filter brightness-[0.25] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prison-950 via-prison-950/70 to-transparent" />
          <div className="absolute inset-0 bg-prison-bars opacity-30 pointer-events-none" />
        </div>

        {/* Cinematic Thunder & Lightning Storm Atmosphere */}
        <ThunderStormEffect interactive={false} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-prison-gold/15 border border-prison-gold/40 text-prison-gold text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>The Concept & Founders</span>
          </div>

          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl text-white tracking-wide leading-tight">
            Our Story: <span className="text-prison-gold">The Prison Experience</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            "Every Meal Served on Good Behavior" – How a bold culinary vision transformed into Sri Lanka's most talked-about novelty dining destination.
          </p>
        </div>
      </section>

      <PrisonHazardBorder height="h-1.5" />

      {/* Main Narrative Section */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-slate-300 font-light leading-relaxed">
            <span className="text-xs font-bold uppercase tracking-widest text-prison-gold block">
              The Genesis
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider leading-tight">
              Eat. Drink. Escape. <br />
              <span className="text-prison-orange">Food In Place of Handcuffs</span>
            </h2>

            <p className="text-base text-slate-300">
              In Sri Lankan culture, dining out is more than just nourishment—it is a shared event, an escape from the daily grind. Sri Lankan culinary entrepreneur <strong className="text-white">Viraj Wickramanayake</strong>, widely recognized islandwide as the innovator behind <strong className="text-white">Mr. Kottu</strong>, envisioned creating a restaurant space unlike anything Sri Lanka had ever seen before.
            </p>

            <p className="text-sm text-slate-400">
              Drawing inspiration from vintage penitentiaries and industrial loft aesthetics, <strong>The Prison</strong> embraces the theme with clever wit and meticulous attention to detail: heavy iron bar grilles enclosing intimate dining booths, warning caution lines marking transitions, vintage hanging drop bulbs, and staff outfitted in custom warden-style khaki uniforms.
            </p>

            <div className="p-4 rounded-sm bg-prison-900 border-l-4 border-prison-gold border-r border-t border-b border-prison-800">
              <p className="text-xs sm:text-sm text-white font-medium italic">
                "{RESTAURANT_INFO.sinhalaMotto}" — Our Sinhala slogan translates to "Food Instead of Handcuffs". It represents redemption through flavor: substituting judgment with hospitality, camaraderie, and culinary excellence.
              </p>
            </div>

            <p className="text-sm text-slate-400">
              Today, The Prison operates its vibrant flagship venue on Horana Road in Piliyandala, alongside an expanding presence in Maharagama, drawing families, corporate squads, youth, and food lovers from all corners of the Western Province.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-sm overflow-hidden border border-prison-700 shadow-2xl bg-black">
              <SecureImage
                src="./images/opening-ceremony-dancers-location.jpg"
                alt="Traditional Wes Dancers at The Prison Grand Opening"
                className="w-full h-80 object-cover"
              />
              <div className="p-3 bg-prison-900 text-xs text-slate-300 flex items-center justify-between">
                <span>Traditional Opening Blessings • Horana Rd, Piliyandala</span>
                <span className="text-prison-gold font-mono">Flagship Launch</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm overflow-hidden border border-prison-700 bg-black">
                <SecureImage
                  src="./images/founder-viraj-staff-uniforms.jpg"
                  alt="Founder Viraj Wickramanayake with Uniformed Staff"
                  className="w-full h-44 object-cover"
                />
                <div className="p-2 bg-prison-900 text-[11px] text-center text-slate-300">
                  Founder Viraj Wickramanayake & Team
                </div>
              </div>

              <div className="rounded-sm overflow-hidden border border-prison-700 bg-black">
                <SecureImage
                  src="./images/grand-opening-ribbon-cutting.jpg"
                  alt="Grand Opening Ribbon Cutting"
                  className="w-full h-44 object-cover"
                />
                <div className="p-2 bg-prison-900 text-[11px] text-center text-slate-300">
                  The Official Ribbon Cutting
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* The 4 Zones Section */}
      <section className="py-20 bg-prison-900/40 border-t border-prison-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tagline="The Floor Plan"
            title="Explore Our Four Distinct Zones"
            highlightWord="Four Distinct Zones"
            subtitle="Whether you crave privacy, lively social energy, open breezes, or express counter service, we have the ideal space."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Zone 1 */}
            <div className="bg-prison-850 p-6 rounded-sm border border-prison-700/80 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded bg-prison-900 border border-prison-700 text-prison-gold flex items-center justify-center mb-4">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                  The Cell Blocks
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Private and semi-private booth seating encased behind realistic jail metal bars and mesh. The favorite spot for date nights and small squad gatherings.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-prison-gold mt-6 block">
                Flagship Piliyandala
              </span>
            </div>

            {/* Zone 2 */}
            <div className="bg-prison-850 p-6 rounded-sm border border-prison-700/80 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded bg-prison-900 border border-prison-700 text-emerald-400 flex items-center justify-center mb-4">
                  <Trees className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                  The Prison Yard
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  A lush open-air garden lawn with white tables, overhead string festoon lighting, and gentle evening breezes. Perfect for alfresco dining.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mt-6 block">
                Outdoor Lawn
              </span>
            </div>

            {/* Zone 3 */}
            <div className="bg-prison-850 p-6 rounded-sm border border-prison-700/80 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded bg-prison-900 border border-prison-700 text-prison-orange flex items-center justify-center mb-4">
                  <Wine className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                  BYOB Lounge & Pool Table
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Bring your own bottle with zero corkage hassle. Play 8-ball on our competition pool table while listening to acoustic weekend sets.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-prison-orange mt-6 block">
                Social Lounge
              </span>
            </div>

            {/* Zone 4 */}
            <div className="bg-prison-850 p-6 rounded-sm border border-prison-700/80 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded bg-prison-900 border border-prison-700 text-sky-400 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                  The Indian Kitchen
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Our live culinary station specializing in slow-cooked Indian Dum Biriyanis, flame grilled chicken burgers, and handmade layered paratas.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mt-6 block">
                Culinary Engine
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 max-w-5xl mx-auto px-4 text-center">
        <h3 className="font-display font-bold text-3xl uppercase tracking-wider text-white">
          Come Experience It For Yourself
        </h3>
        <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          Reserve your cell booth in advance or walk in anytime between 11:00 AM and 11:30 PM.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/reservations" variant="primary" size="lg">
            Book A Table Now
          </Button>
          <Button to="/menu" variant="outline" size="lg">
            Browse Full Menu
          </Button>
        </div>
      </section>

    </div>
  );
}
