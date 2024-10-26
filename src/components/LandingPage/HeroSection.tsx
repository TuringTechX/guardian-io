// src/components/LandingPage/HeroSection.tsx

import React from 'react';
import Button from '../UIElements/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section relative">
      <video autoPlay muted loop className="hero-video">
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="hero-content text-center absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-4">Empowering Ethical Supply Chains</h1>
        <p className="text-lg mb-6">Join the global movement to build transparent, sustainable supply chains.</p>
        <Button label="Get Started" onClick={() => window.location.href = '/register'} />
      </div>
    </section>
  );
};

export default HeroSection;
