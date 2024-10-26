// src/components/LandingPage/FeaturesSection.tsx

import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  const features = [
    { title: 'Supply Chain Transparency', description: 'Track every step of your supply chain using blockchain technology.' },
    { title: 'Labour Rights Compliance', description: 'Ensure compliance with international labor standards.' },
    { title: 'Sustainable Supply Chains', description: 'Promote environmentally responsible and economically sustainable practices.' },
    // Add more features here
  ];

  return (
    <section className="features-section py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Our Core Features</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card bg-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
