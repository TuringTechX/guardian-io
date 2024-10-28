// File: src/landingPage/LandingPage.tsx

import React, { useState, useCallback, useMemo } from 'react';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import PartnersSection from './sections/PartnersSection';
import TestimonialSection from './sections/TestimonialSection';
import Footer from './sections/Footer';
import { FaMoon, FaSun } from 'react-icons/fa';
import './styles/landingPage.css';

// Debounce function to limit rapid calls
const debounce = (func: () => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

const LandingPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark/light mode using bitwise XOR for efficiency
  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-mode', darkMode ^ 1);
  }, [darkMode]);

  // Memoized theme icon to prevent re-render
  const themeIcon = useMemo(() => (darkMode ? <FaSun /> : <FaMoon />), [darkMode]);

  // Map of sections for efficient retrieval
  const sections = useMemo(
    () =>
      new Map([
        ['Hero', <HeroSection key="hero" />],
        ['Features', <FeaturesSection key="features" />],
        ['Partners', <PartnersSection key="partners" />],
        ['Testimonials', <TestimonialSection key="testimonials" />],
        ['Footer', <Footer key="footer" />],
      ]),
    []
  );

  // Scroll to specific section using debounce to optimize rapid clicks
  const scrollToSection = useCallback(
    debounce((sectionId: string) => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 300),
    []
  );

  return (
    <div className={`landing-page ${darkMode ? 'dark' : 'light'}`}>
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {themeIcon}
      </button>

      {/* Render Sections */}
      {Array.from(sections.values())}

      {/* Navigation Buttons for demo (not part of production UI) */}
      <div className="navigation-buttons">
        <button onClick={() => scrollToSection('Hero')}>Go to Hero</button>
        <button onClick={() => scrollToSection('Features')}>Go to Features</button>
        <button onClick={() => scrollToSection('Partners')}>Go to Partners</button>
        <button onClick={() => scrollToSection('Testimonials')}>Go to Testimonials</button>
        <button onClick={() => scrollToSection('Footer')}>Go to Footer</button>
      </div>
    </div>
  );
};

export default LandingPage;
