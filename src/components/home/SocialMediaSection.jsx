import React from 'react';
import { SecureImage } from '../../security';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Heart, MessageCircle, ExternalLink, Share2, ThumbsUp } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { SOCIAL_POSTS } from '../../data/testimonialsData';

export default function SocialMediaSection() {
  return (
    <section className="py-20 md:py-28 bg-prison-950 relative border-t border-prison-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tagline="Join Our Community"
          title="Follow The Prison on Social Media"
          highlightWord="Social Media"
          subtitle="Stay updated with our latest promotions, 11:11 specials, weekend live music schedules, and behind-the-scenes moments from Piliyandala and Maharagama."
        />

        {/* Facebook Stats Bar */}
        <div className="max-w-2xl mx-auto mb-12 p-4 rounded-sm bg-prison-900 border border-prison-800 flex items-center justify-around text-center">
          <div>
            <span className="font-display font-bold text-2xl sm:text-3xl text-prison-gold block">
              8,800+
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Facebook Followers
            </span>
          </div>
          <div className="h-8 w-px bg-prison-800" />
          <div>
            <span className="font-display font-bold text-2xl sm:text-3xl text-emerald-400 block">
              Daily
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Fresh Hot Meals
            </span>
          </div>
          <div className="h-8 w-px bg-prison-800" />
          <div>
            <span className="font-display font-bold text-2xl sm:text-3xl text-white block">
              2
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400">
              Island Branches
            </span>
          </div>
        </div>

        {/* Social Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SOCIAL_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-prison-850 rounded-sm border border-prison-700/80 overflow-hidden flex flex-col justify-between hover:border-prison-gold/60 transition-colors shadow-xl group"
            >
              <div>
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-prison-800">
                  <div className="flex items-center gap-2.5">
                    <SecureImage
                      src="./images/the-prison-logo.jpg"
                      alt="The Prison Page Avatar"
                      className="w-9 h-9 rounded-full border border-prison-gold/40 object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        {post.author}
                      </h4>
                      <span className="text-[10px] text-slate-400 block">
                        {post.handle}
                      </span>
                    </div>
                  </div>
                  <Facebook className="w-4 h-4 text-blue-400" />
                </div>

                {/* Post Image */}
                <div className="relative h-48 bg-black overflow-hidden">
                  <SecureImage
                    src={post.image}
                    alt="Facebook Post Graphic"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-prison-950/80 px-2 py-0.5 rounded text-[10px] font-bold text-prison-gold border border-prison-gold/30">
                    {post.badge}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
                    {post.sinhalaText}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                    "{post.englishText}"
                  </p>
                </div>
              </div>

              {/* Engagement Footer */}
              <div className="p-4 pt-3 border-t border-prison-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-300">
                    <ThumbsUp className="w-3.5 h-3.5 text-prison-gold" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Share2 className="w-3 h-3" />
                    <span>{post.shares}</span>
                  </span>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-prison-gold hover:text-white flex items-center gap-1 text-[11px] uppercase tracking-wider"
                >
                  <span>View Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to Facebook */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href={RESTAURANT_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            icon={Facebook}
          >
            Follow on Facebook
          </Button>

          <Button
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="md"
            icon={Instagram}
          >
            Follow on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}
