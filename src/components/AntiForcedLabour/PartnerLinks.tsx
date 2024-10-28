// src/components/AntiForcedLabour/PartnerLinks.tsx

import React, { useState } from 'react';

interface Partner {
  id: string;
  name: string;
  description: string;
  url: string;
  iconUrl?: string;   // Optional: URL to the partner's logo/icon
  tags?: string[];    // Optional tags like "Featured" or "New"
}

interface PartnerLinksProps {
  partners: Partner[];
}

export const PartnerLinks: React.FC<PartnerLinksProps> = ({ partners }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePartners, setVisiblePartners] = useState(10); // Batch loading for performance

  // Filtered and Sorted Partner List
  const filteredPartners = partners
    .filter(partner => 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      partner.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const loadMorePartners = () => setVisiblePartners(prev => prev + 10);

  return (
    <div className="partner-links p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Our Anti-Forced Labour Partners</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search partners..."
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Partner Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPartners.slice(0, visiblePartners).map(partner => (
          <a
            key={partner.id}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-link flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm transition duration-150"
          >
            {/* Icon or Logo */}
            {partner.iconUrl ? (
              <img src={partner.iconUrl} alt={`${partner.name} logo`} className="w-12 h-12 mr-4 rounded-full" />
            ) : (
              <div className="w-12 h-12 mr-4 bg-blue-500 text-white flex items-center justify-center rounded-full">
                {partner.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Partner Info */}
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-bold text-blue-700">{partner.name}</h3>
                {/* Tags */}
                {partner.tags && partner.tags.map(tag => (
                  <span
                    key={tag}
                    className="ml-2 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">{partner.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {visiblePartners < filteredPartners.length && (
        <button
          onClick={loadMorePartners}
          className="mt-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PartnerLinks;
