// src/components/UIElements/FeatureCard.tsx

import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  benefits: string[];
  tools: string[];
  tags?: string[]; // Optional tags like "New", "Popular"
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, benefits, tools, tags = [] }) => (
  <div className="feature-card shadow-lg rounded-lg p-5 bg-white relative transition-transform transform hover:scale-105">
    {/* Optional Tags */}
    {tags.length > 0 && (
      <div className="absolute top-2 right-2 flex space-x-1">
        {tags.map(tag => (
          <span key={tag} className="tag-badge bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
            {tag}
          </span>
        ))}
      </div>
    )}

    {/* Card Content */}
    <div className="card-content">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {/* Benefits */}
      <div className="benefits mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Benefits:</h3>
        <ul className="list-disc list-inside space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index} className="text-gray-600 text-sm">
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Tools */}
      <div className="tools">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Tools Involved:</h3>
        <ul className="list-none flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <li key={index} className="tool-badge bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default FeatureCard;
