import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, ShieldAlert, ArrowUpRight, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import PrisonHazardBorder from '../ui/PrisonHazardBorder';

export default function Footer() {
  return (
    <footer className="bg-prison-950 text-slate-300 relative border-t border-prison-800">
      {/* Top Hazard Accent Border */}
      <PrisonHazardBorder height="h-2" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-sm overflow-hidden border border-prison-gold/40 bg-black flex items-center justify-center shrink-0">
                <img
                  src="./images/the-prison-logo.jpg"
                  alt="The Prison Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-display font-bold text-2xl tracking-widest text-white uppercase block">
                  THE PRISON
                </span>
                <span className="text-[10px] tracking-[0.25em] text-prison-gold uppercase font-semibold block -mt-1">
                  EAT _ DRINK _ ESCAPE
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              Sri Lanka's premier jail-themed dining and lounge experience. Conceived by founder <strong className="text-white">{RESTAURANT_INFO.founder}</strong>, combining authentic slow-cooked Indian Dum Biriyani, Indian Grill burgers, BBQ parata, and legendary Kottu.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-prison-900 border border-prison-800 text-xs font-semibold text-prison-gold">
                <ShieldAlert className="w-4 h-4 text-prison-orange" />
                <span>{RESTAURANT_INFO.sinhalaMotto}</span>
                <span className="text-slate-400">({RESTAURANT_INFO.sinhalaMottoEn})</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-prison-900 hover:bg-prison-gold hover:text-prison-950 border border-prison-800 transition-colors flex items-center justify-center text-slate-300"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-prison-900 hover:bg-prison-orange hover:text-white border border-prison-800 transition-colors flex items-center justify-center text-slate-300"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-prison-900 hover:bg-emerald-500 hover:text-white border border-prison-800 transition-colors flex items-center justify-center text-slate-300"
                aria-label="WhatsApp Chat"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-4 border-l-2 border-prison-gold pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-prison-gold transition-colors inline-flex items-center gap-1.5">
                  <span className="text-prison-gold font-bold">›</span> Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-prison-gold transition-colors inline-flex items-center gap-1.5">
                  <span className="text-prison-gold font-bold">›</span> Our Story & Mr. Kottu
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-prison-gold transition-colors inline-flex items-center gap-1.5">
                  <span className="text-prison-gold font-bold">›</span> Full Menu & Verified Prices
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-prison-gold transition-colors inline-flex items-center gap-1.5">
                  <span className="text-prison-gold font-bold">›</span> Authentic Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-prison-gold transition-colors inline-flex items-center gap-1.5">
                  <span className="text-prison-gold font-bold">›</span> Book a Prison Cell Table
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-prison-gold transition-colors inline-flex items-center gap-1.5">
                  <span className="text-prison-gold font-bold">›</span> Locations & Contact
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-prison-900">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">Delivery Partner:</span>
              <a
                href={RESTAURANT_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <span>Available on Uber Eats</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 3: Branches */}
          <div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-4 border-l-2 border-prison-gold pl-2.5">
              Our Locations
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="p-3 rounded bg-prison-900/80 border border-prison-800">
                <span className="text-xs font-bold text-prison-gold uppercase tracking-wider block mb-1">
                  1. Piliyandala Flagship
                </span>
                <p className="text-xs text-slate-300 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-prison-orange shrink-0 mt-0.5" />
                  <span>Horana Road, Piliyandala (Opposite New Nipun Super)</span>
                </p>
                <p className="text-xs text-slate-400 mt-1 pl-5">
                  Prison Cell Dine-in • BYOB Lounge • Garden Lawn
                </p>
              </div>

              <div className="p-3 rounded bg-prison-900/80 border border-prison-800">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-1">
                  2. Maharagama Branch
                </span>
                <p className="text-xs text-slate-300 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-prison-orange shrink-0 mt-0.5" />
                  <span>High Level Road (Near Umandawa Green Hut)</span>
                </p>
                <p className="text-xs text-slate-400 mt-1 pl-5">
                  Indian Kitchen Counter • Dine-in • Takeaway
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-4 border-l-2 border-prison-gold pl-2.5">
              Contact & Hours
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-prison-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Opening Hours:</span>
                  <span className="text-white font-medium">{RESTAURANT_INFO.openingHours.weekdays}</span>
                  <span className="text-xs text-emerald-400 block font-semibold">{RESTAURANT_INFO.openingHours.status}</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Reservations & Hotline:</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-white hover:text-prison-gold font-medium">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-prison-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Official Email:</span>
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-xs text-slate-300 hover:text-white break-all">
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-5">
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-prison-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name} – {RESTAURANT_INFO.tagline}. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Developed & Published by</span>
            <a
              href="http://nerdtechlabs.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-prison-gold hover:text-yellow-300 font-bold tracking-wide inline-flex items-center gap-1 transition-colors group"
            >
              <span>NerdTech Labs</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
