import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  CheckCircle2, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight,
  Wine
} from 'lucide-react';
import Button from '../ui/Button';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function ReservationForm() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      branch: 'piliyandala',
      seatingArea: 'cell',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      guests: '4',
      occasion: 'Dinner with friends',
      specialRequests: ''
    }
  });

  const onSubmit = (data) => {
    // Generate unique booking code
    const bookingCode = `PRISON-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullData = { ...data, bookingCode };
    setBookingData(fullData);
    setBookingSuccess(true);
  };

  const handleReset = () => {
    setBookingSuccess(false);
    setBookingData(null);
    reset();
  };

  // WhatsApp formatted confirmation URL
  const getWhatsAppBookingUrl = () => {
    if (!bookingData) return RESTAURANT_INFO.whatsappUrl;
    const branchName = bookingData.branch === 'piliyandala' ? 'Piliyandala Flagship' : 'Maharagama';
    const text = `*New Table Reservation Request* ⛓️🔒\n` +
      `*Code:* ${bookingData.bookingCode}\n` +
      `*Name:* ${bookingData.fullName}\n` +
      `*Phone:* ${bookingData.phone}\n` +
      `*Branch:* ${branchName}\n` +
      `*Date:* ${bookingData.date}\n` +
      `*Time:* ${bookingData.time}\n` +
      `*Guests:* ${bookingData.guests} persons\n` +
      `*Seating:* ${bookingData.seatingArea}\n` +
      `*Occasion:* ${bookingData.occasion}\n` +
      (bookingData.specialRequests ? `*Notes:* ${bookingData.specialRequests}` : '');
    
    return `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-prison-850 rounded-sm border border-prison-700/80 p-6 sm:p-10 shadow-2xl relative">
      
      {/* Success Modal / State */}
      {bookingSuccess && bookingData ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5 shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-prison-gold block mb-1">
            Reservation Request Submitted
          </span>
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider">
            You Are Booked Behind Bars!
          </h3>

          <div className="my-6 p-5 rounded bg-prison-900 border border-prison-800 text-left max-w-lg mx-auto space-y-2.5 text-sm">
            <div className="flex justify-between border-b border-prison-800 pb-2">
              <span className="text-slate-400 font-medium">Booking Ref:</span>
              <span className="font-mono font-bold text-prison-gold">{bookingData.bookingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Guest Name:</span>
              <span className="text-white font-medium">{bookingData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Branch:</span>
              <span className="text-white font-medium capitalize">
                {bookingData.branch === 'piliyandala' ? 'Piliyandala Flagship' : 'Maharagama'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date & Time:</span>
              <span className="text-white font-medium">{bookingData.date} at {bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Party Size:</span>
              <span className="text-white font-medium">{bookingData.guests} Guests</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Seating Preference:</span>
              <span className="text-white font-medium capitalize">{bookingData.seatingArea}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-8 font-light">
            Our prison host will hold your reserved table. For immediate instant confirmation, please click below to send your details directly via WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={MessageSquare}
              className="w-full sm:w-auto shadow-glow-gold"
            >
              Send Confirmation on WhatsApp
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Book Another Table
            </Button>
          </div>
        </motion.div>
      ) : (
        /* Reservation Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="border-b border-prison-700/60 pb-5 mb-6">
            <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-wider text-white">
              Reserve Your Table Behind Bars
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select your preferred branch, cell booth, or outdoor garden lawn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Kasun Perera"
                  {...register('fullName', { required: 'Please enter your name' })}
                  className="w-full bg-prison-950 border border-prison-700 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold"
                />
              </div>
              {errors.fullName && (
                <p className="text-prison-red text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Contact Phone / WhatsApp *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="e.g. 077 123 4567"
                  {...register('phone', { 
                    required: 'Please provide a valid contact number',
                    pattern: {
                      value: /^[0-9+ -]{9,15}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  className="w-full bg-prison-950 border border-prison-700 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold"
                />
              </div>
              {errors.phone && (
                <p className="text-prison-red text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Branch Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Branch *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  {...register('branch', { required: true })}
                  className="w-full bg-prison-950 border border-prison-700 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold cursor-pointer"
                >
                  <option value="piliyandala">Piliyandala Flagship (Horana Road)</option>
                  <option value="maharagama">Maharagama Branch (High Level Road)</option>
                </select>
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Seating Area Preference *
              </label>
              <div className="relative">
                <ShieldAlert className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  {...register('seatingArea')}
                  className="w-full bg-prison-950 border border-prison-700 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold cursor-pointer"
                >
                  <option value="cell">Themed Barred Prison Cell Booth</option>
                  <option value="ac-hall">Main AC Dining Hall</option>
                  <option value="garden">Lush Outdoor Garden Lawn</option>
                  <option value="byob-lounge">Chill BYOB Lounge & Pool Table</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Reservation Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('date', { required: 'Please select a date' })}
                  className="w-full bg-prison-950 border border-prison-700 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold"
                />
              </div>
              {errors.date && (
                <p className="text-prison-red text-xs mt-1">{errors.date.message}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Reservation Time *
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  {...register('time', { required: true })}
                  className="w-full bg-prison-950 border border-prison-700 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold cursor-pointer"
                >
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="18:00">06:00 PM (Dinner)</option>
                  <option value="19:00">07:00 PM</option>
                  <option value="20:00">08:00 PM (Peak Dinner)</option>
                  <option value="21:00">09:00 PM</option>
                  <option value="22:00">10:00 PM (Late Night)</option>
                </select>
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Number of Guests *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  {...register('guests')}
                  className="w-full bg-prison-950 border border-prison-700 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold cursor-pointer"
                >
                  <option value="1">1 Person (Inmate Solo)</option>
                  <option value="2">2 Persons (Couple)</option>
                  <option value="3">3 Persons (Dum Biriyani Pot)</option>
                  <option value="4">4 Persons</option>
                  <option value="5">5 Persons</option>
                  <option value="6">6 Persons (Dum Biriyani Jumbo Feast)</option>
                  <option value="8">8 Persons</option>
                  <option value="10">10+ Persons (Party Cell)</option>
                  <option value="15">15+ Group Gathering (BYOB Session)</option>
                </select>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Occasion / Gathering Type
              </label>
              <div className="relative">
                <Sparkles className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  {...register('occasion')}
                  className="w-full bg-prison-950 border border-prison-700 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold cursor-pointer"
                >
                  <option value="Dinner with friends">Casual Dinner / Hangout</option>
                  <option value="Birthday Party">Birthday Celebration</option>
                  <option value="BYOB Group Night">Weekend BYOB Session</option>
                  <option value="Family Gathering">Family Dining & Kids</option>
                  <option value="Corporate / Team Dinner">Corporate / Team Dinner</option>
                </select>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Special Requests or Dietary Requirements (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Please arrange a prison cell booth with birthday decor, extra spicy biryani, or bringing our own beverages..."
              {...register('specialRequests')}
              className="w-full bg-prison-950 border border-prison-700 rounded-sm p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold"
            ></textarea>
          </div>

          {/* Notice note */}
          <div className="p-3.5 rounded bg-prison-900/80 border border-prison-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Wine className="w-4 h-4 text-prison-gold shrink-0 mt-0.5" />
            <span>
              <strong>BYOB Policy:</strong> Guests are welcome to bring their own bottle to our Piliyandala Flagship Lounge. Tables are held for 15 minutes past reservation time.
            </span>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto shadow-glow-gold"
            >
              {isSubmitting ? 'Confirming...' : 'Lock In My Reservation'}
            </Button>
          </div>
        </form>
      )}

    </div>
  );
}
