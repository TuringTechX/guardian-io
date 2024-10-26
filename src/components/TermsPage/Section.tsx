// src/components/TermsPage/Section.tsx

import React from 'react';
import { ContentSection } from '../../types/termsTypes';

interface SectionProps {
  section: ContentSection;
}

export const Section: React.FC<SectionProps> = ({ section }) => {
  return (
    <section id={section.id} className="section mb-8">
      <h2 className="text-3xl font-semibold mb-4">{section.title}</h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">{paragraph}</p>
      ))}
    </section>
  );
};
