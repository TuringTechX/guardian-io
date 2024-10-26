// src/components/TermsPage/TableOfContents.tsx

import React from 'react';
import { smoothScrollTo } from '../../utils/scrollHelper';
import { ContentSection } from '../../types/termsTypes';

interface TableOfContentsProps {
  content: ContentSection[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  return (
    <nav aria-label="Table of Contents" className="table-of-contents">
      <h2 className="text-2xl font-semibold mb-2">Table of Contents</h2>
      <ul className="list-disc list-inside">
        {content.map((section) => (
          <li key={section.id}>
            <button onClick={() => smoothScrollTo(section.id)}>{section.title}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
