import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { RESTAURANT_INFO } from '../../data/restaurantData';

export default function DirectContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form submitted:", data);
    setSubmitted(true);
  };

  return (
    <div className="bg-prison-850 p-6 sm:p-10 rounded-sm border border-prison-700/80 shadow-2xl">
      <div className="mb-6 border-b border-prison-700/60 pb-4">
        <h3 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
          Send Us A Direct Message
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
          Have a question about event hosting, catering, or menu availability? Drop us a note.
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-display font-bold text-2xl text-white uppercase tracking-wider">
            Message Sent Successfully!
          </h4>
          <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto font-light">
            Thank you for reaching out to The Prison. Our team will review your message and reply via email or phone shortly.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => { setSubmitted(false); reset(); }}
              variant="outline"
              size="md"
            >
              Send Another Note
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Ruwan Silva"
                {...register('name', { required: 'Please enter your name' })}
                className="w-full bg-prison-950 border border-prison-700 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold"
              />
              {errors.name && <p className="text-prison-red text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="e.g. 077 123 4567"
                {...register('phone', { required: 'Please enter your phone number' })}
                className="w-full bg-prison-950 border border-prison-700 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold"
              />
              {errors.phone && <p className="text-prison-red text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. ruwan@example.com"
                {...register('email')}
                className="w-full bg-prison-950 border border-prison-700 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Subject
              </label>
              <select
                {...register('subject')}
                className="w-full bg-prison-950 border border-prison-700 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Private Event Booking">Private Event / Birthday Booking</option>
                <option value="Catering & Bulk Orders">Catering & Bulk Dum Biriyani Orders</option>
                <option value="Feedback / Compliment">Feedback & Compliments</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Your Message *
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your inquiry..."
              {...register('message', { required: 'Please write your message' })}
              className="w-full bg-prison-950 border border-prison-700 rounded-sm p-3.5 text-sm text-white focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold"
            ></textarea>
            {errors.message && <p className="text-prison-red text-xs mt-1">{errors.message.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              icon={Send}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            <span className="text-xs text-slate-400">
              Or chat instantly on{' '}
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:underline"
              >
                WhatsApp hotline
              </a>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
