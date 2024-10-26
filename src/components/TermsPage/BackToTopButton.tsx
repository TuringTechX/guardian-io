// src/components/TermsPage/BackToTopButton.tsx

import React, { useState, useEffect } from 'react';
import { smoothScrollTo } from '../../utils/scrollHelper';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return isVisible ? (
    <button onClick={() => smoothScrollTo('top')} className="back-to-top">
      ↑ Back to Top
    </button>
  ) : null;
};
