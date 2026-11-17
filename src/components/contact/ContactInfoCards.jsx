import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldAlert } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function ContactInfoCards() {
  const cards = [
    {
      title: 'Piliyandala Flagship',
      icon: MapPin,
      badge: 'Main Branch',
      content: RESTAURANT_INFO.branches[0].address,
      subcontent: 'Opposite New Nipun Super, Horana Road',
      actionText: 'View on Map',
      actionHref: '#piliyandala-map',
      color: 'text-prison-gold'
    },
    {
      title: 'Maharagama Branch',
      icon: MapPin,
      badge: 'Indian Kitchen',
      content: RESTAURANT_INFO.branches[1].address,
      subcontent: 'Near Umandawa Green Hut, High Level Road',
      actionText: 'View on Map',
      actionHref: '#maharagama-map',
      color: 'text-prison-orange'
    },
    {
      title: 'Hotline & WhatsApp',
      icon: Phone,
      badge: 'Direct Line',
      content: RESTAURANT_INFO.phone,
      subcontent: 'Instant WhatsApp reservations & orders',
      actionText: 'Message Now',
      actionHref: RESTAURANT_INFO.whatsappUrl,
      isExternal: true,
      color: 'text-emerald-400'
    },
    {
      title: 'Email & Inquiries',
      icon: Mail,
      badge: 'Official',
      content: RESTAURANT_INFO.email,
      subcontent: 'Private event bookings & feedback',
      actionText: 'Send Email',
      actionHref: `mailto:${RESTAURANT_INFO.email}`,
      color: 'text-sky-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-prison-850 p-6 rounded-sm border border-prison-700/80 flex flex-col justify-between hover:border-prison-gold/50 transition-all duration-300 shadow-xl group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded bg-prison-900 border border-prison-700 flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-prison-900 text-slate-300 border border-prison-800">
                  {card.badge}
                </span>
              </div>

              <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                {card.title}
              </h4>

              <p className="text-sm text-slate-200 mt-2 font-medium break-words">
                {card.content}
              </p>

              <p className="text-xs text-slate-400 mt-1 font-light">
                {card.subcontent}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-prison-700/60">
              <a
                href={card.actionHref}
                target={card.isExternal ? '_blank' : '_self'}
                rel={card.isExternal ? 'noopener noreferrer' : ''}
                className="text-xs font-bold uppercase tracking-wider text-prison-gold hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>{card.actionText}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
