import React from 'react';
import HeroSection from '../components/home/HeroSection';
import DishShowcase3D from '../components/3d/DishShowcase3D';
import FeaturedDishes from '../components/home/FeaturedDishes';
import KineticMarquee from '../components/3d/KineticMarquee';
import BrandStoryTeaser from '../components/home/BrandStoryTeaser';
import FeaturedBranches from '../components/home/FeaturedBranches';
import ExperienceHighlights from '../components/home/ExperienceHighlights';
import TestimonialsSection from '../components/home/TestimonialsSection';
import SocialMediaSection from '../components/home/SocialMediaSection';
import CtaBanner from '../components/home/CtaBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 3D WebGL Hero Section */}
      <HeroSection />

      {/* Dialed Coffee Inspired 3D WebGL Dish Showcase */}
      <DishShowcase3D />

      {/* Kinetic Industrial Typography Marquee */}
      <KineticMarquee
        items={[
          'AUTHENTIC FLAVORS',
          'INDIAN DUM BIRIYANI',
          'MR. KOTTU SIGNATURE',
          'CHARCOAL GRILL BURGERS',
          'BBQ PARATA',
          'NOVELTY PRISON CELLS',
          'EAT _ DRINK _ ESCAPE',
          'PILIYANDALA & MAHARAGAMA'
        ]}
        direction="right"
        speed={32}
      />

      {/* Featured Dishes with 3D Tilt Cards */}
      <FeaturedDishes />

      {/* Brand Story & Themed Experience */}
      <BrandStoryTeaser />

      {/* Dual Branch Locations */}
      <FeaturedBranches />

      {/* Highlights & Amenities */}
      <ExperienceHighlights />

      {/* Customer Reviews & Food Vlogs */}
      <TestimonialsSection />

      {/* Facebook & Instagram Community Showcase */}
      <SocialMediaSection />

      {/* Call to Action Banner */}
      <CtaBanner />
    </div>
  );
}
