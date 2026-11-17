import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Award, Sparkles, ArrowRight, Check } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function BrandStoryTeaser() {
  return (
    <section className="py-20 md:py-28 bg-prison-950 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-prison-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage with Authentic Photos */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image: Feature Wall & Cell Interior */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 rounded-sm overflow-hidden border-2 border-prison-800 shadow-2xl bg-black"
              >
                <img
                  src="./images/interior-prison-feature-wall.jpg"
                  alt="The Prison Interior Wall and Dining Booths"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-prison-950 via-prison-950/60 to-transparent p-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-prison-gold block">
                    Flagship Interior • Piliyandala
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Themed Cell Booths & Industrial Mood Lighting
                  </span>
                </div>
              </motion.div>

              {/* Overlapping Secondary Image: Founder & Staff in Uniform */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-8 -right-4 sm:-right-8 z-20 w-3/5 rounded-sm overflow-hidden border-2 border-prison-gold/60 shadow-glow-gold bg-black hidden sm:block"
              >
                <img
                  src="./images/founder-viraj-staff-uniforms.jpg"
                  alt="Founder Viraj Wickramanayake and Team in Branded Uniforms"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-prison-950/90 p-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-prison-gold block">
                    Mr. Kottu & The Prison Crew
                  </span>
                </div>
              </motion.div>

              {/* Handcuffs Motto Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -top-6 -left-4 z-30 bg-prison-900 border border-prison-gold/50 text-white p-3 rounded-sm shadow-xl flex items-center gap-2.5 backdrop-blur-md"
              >
                <ShieldAlert className="w-6 h-6 text-prison-orange animate-pulse" />
                <div>
                  <span className="text-xs font-bold text-prison-gold uppercase tracking-wider block">
                    {RESTAURANT_INFO.sinhalaMotto}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {RESTAURANT_INFO.sinhalaMottoEn}
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-prison-gold/10 border border-prison-gold/30 text-prison-gold text-xs font-bold uppercase tracking-widest mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>The Story & Vision</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                Behind The Bars: <br />
                <span className="text-prison-gold">Eat. Drink. Escape.</span>
              </h2>

              <p className="mt-5 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Conceived and launched by culinary entrepreneur <strong className="text-white">Viraj Wickramanayake (widely recognized across Sri Lanka as Mr. Kottu)</strong>, The Prison was born out of a desire to break completely away from ordinary dining.
              </p>

              <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                Why just sit in an ordinary restaurant when you can serve your sentence inside an authentic jail cell booth, surrounded by metal grilles, mood drop bulbs, and staff dressed in warden uniforms? At The Prison, the only verdict is extraordinary food.
              </p>

              {/* Pillars List */}
              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-prison-gold/20 text-prison-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">Authentic Indian Dum Biriyani & Indian Kitchen</strong>
                    <span className="text-xs text-slate-400">Slow cooked with premium spices in clay pots, certified verified value.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-prison-gold/20 text-prison-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">Island-Famous Kottu Heritage</strong>
                    <span className="text-xs text-slate-400">Created by Mr. Kottu himself — loaded Cheese Kottu, Palandi, and Dolphin recipes.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-prison-gold/20 text-prison-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">BYOB Lounge, Pool Table & Garden Atmosphere</strong>
                    <span className="text-xs text-slate-400">Bring your own bottle, enjoy weekend live music, and chill under garden fairy lights.</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-9 flex items-center gap-4">
                <Button
                  to="/about"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Read Full Restaurant Story
                </Button>
                <Button
                  to="/gallery"
                  variant="ghost"
                  size="md"
                >
                  View Photo Tour
                </Button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
