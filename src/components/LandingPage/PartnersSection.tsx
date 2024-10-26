// src/components/LandingPage/PartnersSection.tsx

import React from 'react';

const PartnersSection: React.FC = () => {
  const partners = [
    '/images/partner1.png',
    '/images/partner2.png',
    '/images/partner3.png',
    // Add more partner logos here
  ];

  return (
    <section className="partners-section py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Trusted by Leading Organizations</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {partners.map((logo, index) => (
          <div key={index} className="partner-logo flex items-center justify-center">
            <img src={logo} alt={`Partner ${index + 1}`} className="max-h-16" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
