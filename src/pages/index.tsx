// src/pages/index.tsx

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaLeaf, FaGavel, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Carousel, CarouselItem } from '../components/Carousel';
import { useDataSorting } from '../hooks/useDataSorting';  // Custom hook for sorting/filtering data
import { FeatureCard } from '../components/FeatureCard';  // Reusable feature card
import { featuresData, Feature } from '../data/featuresData'; // Static feature data (typed)

const IndexPage: React.FC = () => {
  // State for dynamic feature list
  const [currentFeature, setCurrentFeature] = useState<number>(0);

  // Custom hook for sorting features based on importance or user relevance
  const sortedFeatures = useDataSorting(featuresData, 'importance');

  // Carousel navigation
  const nextFeature = () => setCurrentFeature((prev) => (prev + 1) % sortedFeatures.length);
  const prevFeature = () => setCurrentFeature((prev) => (prev - 1 + sortedFeatures.length) % sortedFeatures.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-700">
      <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Guardian-IO</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600">Features</a></li>
            <li><a href="#contact" className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="hero" className="text-center py-16 bg-gradient-to-r from-blue-500 to-green-400 text-white">
        <h2 className="text-4xl font-extrabold mb-6">Empowering Ethical Business Practices</h2>
        <p className="text-lg max-w-xl mx-auto mb-8">
          Gain full visibility into your supply chain and ensure compliance with global labor and sustainability standards.
        </p>
        <a href="#features" className="bg-white text-blue-500 px-6 py-3 rounded-full font-bold shadow hover:bg-gray-200 transition">Explore Features</a>
      </section>

      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-12">Our Core Features</h3>

        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 text-gray-600 dark:text-white" onClick={prevFeature}>
            <FaArrowLeft size={24} />
          </button>

          {/* Carousel of features */}
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

      <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-800">
        <h3 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-8">Get in Touch</h3>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-4">
          Contact us to learn how Guardian-IO can help you meet your compliance and sustainability goals.
        </p>
        <div className="flex justify-center">
          <a href="mailto:contact@guardian-io.com" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700 transition">
            Email Us
          </a>
        </div>
      </section>

      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6">
        <p className="text-gray-600 dark:text-gray-300">© 2024 Guardian-IO. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IndexPage;
