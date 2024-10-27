// src/pages/index.tsx

import React, { useState, useEffect, FC } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Carousel, CarouselItem } from '../components/Carousel';
import { useDataSorting } from '../hooks/useDataSorting';  // Custom hook for sorting/filtering data
import { FeatureCard } from '../components/UIElements/FeatureCard';  // Reusable feature card
import { featuresData, Feature } from '../data/featuresData'; // Static feature data (typed)
import HeroSection from '../components/LandingPage/HeroSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import TestimonialSection from '../components/LandingPage/TestimonialSection';
import PartnersSection from '../components/LandingPage/PartnersSection';
import Footer from '../components/LandingPage/Footer';

// Typing for the main IndexPage component
const IndexPage: FC = () => {
  // State for dynamic feature list
  const [currentFeature, setCurrentFeature] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false); // New state for autoplay pause

  // Custom hook for sorting features based on importance or user relevance
  const sortedFeatures: Feature[] = useDataSorting(featuresData, 'importance');

  // Carousel navigation
  const nextFeature = () => setCurrentFeature((prev) => (prev + 1) % sortedFeatures.length);
  const prevFeature = () => setCurrentFeature((prev) => (prev - 1 + sortedFeatures.length) % sortedFeatures.length);

  // Autoplay feature - automatically navigate to the next feature every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(nextFeature, 5000); // Auto-slide every 5 seconds
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [isPaused, sortedFeatures.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-700">
      {/* Main Landing Page Sections */}
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PartnersSection />

      {/* Custom Feature Carousel Section */}
      <section
        id="features"
        className="py-16 bg-white dark:bg-gray-900"
        onMouseEnter={() => setIsPaused(true)}  // Pause autoplay on hover
        onMouseLeave={() => setIsPaused(false)} // Resume autoplay on mouse leave
      >
        <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-12">Our Core Features</h3>

        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 text-gray-600 dark:text-white" onClick={prevFeature}>
            <FaArrowLeft size={24} />
          </button>

          <Carousel>
            {sortedFeatures.map((feature: Feature, index: number) => (
              <CarouselItem key={feature.id} active={index === currentFeature}>
                <FeatureCard feature={feature} />
              </CarouselItem>
            ))}
          </Carousel>

          <button className="absolute right-0 text-gray-600 dark:text-white" onClick={nextFeature}>
            <FaArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndexPage;
