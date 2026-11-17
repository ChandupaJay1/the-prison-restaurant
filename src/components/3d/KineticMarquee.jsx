import React from 'react';

/**
 * Kinetic Marquee Ticker (Dialed Coffee editorial typography style)
 * Dual-row infinite scrolling kinetic text with industrial prison styling.
 */
export default function KineticMarquee({
  items = [
    'THE PRISON',
    'මාංචු වෙනුවට කෑම',
    'EAT _ DRINK _ ESCAPE',
    'MR. KOTTU',
    'INDIAN DUM BIRIYANI',
    'INDIAN GRILL BURGERS',
    'BBQ PARATA',
    'BYOB & LIVE LOUNGE',
    'PILIYANDALA & MAHARAGAMA',
    'FOOD INSTEAD OF HANDCUFFS',
  ],
  direction = 'left',
  speed = 28,
  className = '',
}) {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden select-none py-3 border-y border-prison-800 bg-prison-950/90 relative ${className}`}>
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-prison-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-prison-950 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex items-center gap-6 whitespace-nowrap will-change-transform ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span className="font-display font-black text-sm sm:text-base md:text-lg tracking-widest uppercase text-slate-400 hover:text-prison-gold transition-colors duration-200">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-prison-orange/80 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
