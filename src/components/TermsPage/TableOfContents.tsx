// src/components/TermsPage/TableOfContents.tsx

import React, { useEffect, useState } from 'react';
import { smoothScrollTo } from '../../utils/scrollHelper';
import { ContentSection } from '../../types/termsTypes';
import { debounce } from '../../utils/debounce';

interface TableOfContentsProps {
  content: ContentSection[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Create a map for quick section lookup by ID
//  const sectionMap = new Map(content.map((section) => [section.id, section]));

  // Handle scroll and update active section based on scroll position
  const handleScroll = debounce(() => {
    let currentSection: string | null = null;
    
    for (const section of content) {
      const element = document.getElementById(section.id);
      if (element) {
        const { top } = element.getBoundingClientRect();
        if (top >= 0 && top <= window.innerHeight / 2) {
          currentSection = section.id;
          break;
        }
      }
    }
    
    setActiveSection(currentSection);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [content]);

  return (
    <nav aria-label="Table of Contents" className="table-of-contents">
      <h2 className="text-2xl font-semibold mb-2">Table of Contents</h2>
      <ul className="list-disc list-inside">
        {content.map((section) => (
          <li key={section.id} className={activeSection === section.id ? 'active' : ''}>
            <button onClick={() => smoothScrollTo(section.id)}>
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
