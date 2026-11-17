import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-prison-900 border border-prison-700 text-white text-xs px-3.5 py-2 rounded-lg shadow-xl shadow-black/50 animate-bounce">
          <span>Need a table or takeaway? Chat on WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={RESTAURANT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
        aria-label="Chat on WhatsApp"
      >
        {/* Radar wave pulse effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-75 pointer-events-none"></span>

        <MessageCircle className="w-7 h-7 fill-current relative z-10" />

        {/* Status Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-prison-950 rounded-full"></span>
      </a>
    </div>
  );
}
