// File: /home/user/guardian-io/src/landingPage/sections/FeaturesSection.tsx

import React from 'react';
import { FaGlobe, FaUserShield, FaLeaf, FaHandshake, FaBalanceScale, FaPeopleCarry } from 'react-icons/fa';
import './featuresSection.css';

// Feature item structure for modularity
interface Feature {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      icon: <FaGlobe />,
      title: 'Supply Chain Transparency',
      description: 'Track every step of your supply chain to ensure ethical standards and full transparency.',
    },
    {
      id: 2,
      icon: <FaUserShield />,
      title: 'Labor Rights & Human Rights Compliance',
      description: 'Ensure compliance with labor laws and international human rights standards.',
    },
    {
      id: 3,
      icon: <FaLeaf />,
      title: 'Sustainable Sourcing',
      description: 'Promote eco-friendly and sustainable sourcing practices to reduce environmental impact.',
    },
    {
      id: 4,
      icon: <FaHandshake />,
      title: 'Ethical Sourcing',
      description: 'Source materials responsibly, supporting fair wages and safe working conditions.',
    },
    {
      id: 5,
      icon: <FaBalanceScale />,
      title: 'Anti-Forced Labor Compliance',
      description: 'Prevent forced labor, child labor, and modern slavery within your supply chain.',
    },
    {
      id: 6,
      icon: <FaPeopleCarry />,
      title: 'Corporate Social Responsibility (CSR)',
      description: 'Integrate CSR into your supply chain to uphold ethical and social responsibilities.',
    },
  ];

  return (
    <section className="features-section" id="features">
      <h2 className="features-title">Platform Features</h2>
      <p className="features-subtitle">Empowering Ethical and Sustainable Supply Chains</p>
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-item">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
