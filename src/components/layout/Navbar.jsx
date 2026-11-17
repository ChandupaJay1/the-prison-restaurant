import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, UtensilsCrossed, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-prison-950/95 backdrop-blur-md border-b border-prison-800 shadow-xl py-3'
          : 'bg-prison-950/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-sm overflow-hidden border border-prison-gold/40 shadow-glow-gold group-hover:border-prison-gold transition-colors bg-black flex items-center justify-center">
              <img
                src="./images/the-prison-logo.jpg"
                alt="The Prison Logo"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl sm:text-2xl tracking-widest text-white uppercase group-hover:text-prison-gold transition-colors">
                  THE PRISON
                </span>
              </div>
              <span className="text-[10px] tracking-[0.25em] text-prison-gold uppercase font-semibold -mt-1">
                EAT _ DRINK _ ESCAPE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 rounded relative ${
                    isActive
                      ? 'text-prison-gold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-prison-gold rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              to="/menu"
              variant="outline"
              size="sm"
              icon={UtensilsCrossed}
            >
              Menu
            </Button>
            <Button
              to="/reservations"
              variant="primary"
              size="sm"
              icon={Calendar}
            >
              Book Table
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/reservations"
              className="bg-prison-gold text-prison-950 px-3 py-1.5 rounded-sm font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Book
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-prison-800 rounded focus:outline-none focus:ring-2 focus:ring-prison-gold"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-prison-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-b border-prison-800 bg-prison-950/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="hazard-stripe-bar h-1 rounded-full mb-3 opacity-60" />
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-base font-semibold uppercase tracking-wider rounded transition-colors ${
                      isActive
                        ? 'bg-prison-gold text-prison-950 font-bold'
                        : 'text-slate-200 hover:bg-prison-900 hover:text-prison-gold'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 grid grid-cols-2 gap-2 border-t border-prison-800 mt-4">
                <Button
                  to="/menu"
                  variant="outline"
                  size="md"
                  icon={UtensilsCrossed}
                  className="w-full text-xs"
                >
                  View Menu
                </Button>
                <Button
                  to="/reservations"
                  variant="primary"
                  size="md"
                  icon={Calendar}
                  className="w-full text-xs"
                >
                  Book Table
                </Button>
              </div>

              <div className="pt-3 text-center">
                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp: {RESTAURANT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
