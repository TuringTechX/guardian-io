// src/pages/terms.tsx

import React, { useEffect, useState } from 'react';
import { TableOfContents } from '../components/TermsPage/TableOfContents';
import { BackToTopButton } from '../components/TermsPage/BackToTopButton';
import '../styles/terms.css';

const TermsPage: React.FC = () => {
  // State to track scroll position for BackToTopButton visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic content for Table of Contents
  const tocContent = [
    { id: 'terms-of-service', title: 'Terms of Service' },
    { id: 'privacy-policy', title: 'Privacy Policy' },
    { id: 'contact-information', title: 'Contact Information' },
  ];

  return (
    <div className="terms-page container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service & Privacy Policy</h1>
      <TableOfContents content={tocContent} />

      {/* Terms of Service Section */}
      <section id="terms-of-service" className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Terms of Service</h2>
        <p className="mb-4">
          Welcome to Guardian-IO. By accessing our platform, you agree to be bound by the following Terms of Service.
        </p>
        <div className="terms-content mb-8">
          <h3 className="text-2xl font-semibold mb-2">1. User Agreement</h3>
          <p>Explanation of user agreement...</p>

          <h3 className="text-2xl font-semibold mb-2">2. License and Restrictions</h3>
          <p>Explanation of licenses and usage restrictions...</p>

          {/* More sections... */}
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy-policy" className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>
        <p className="mb-4">
          Guardian-IO is committed to safeguarding your personal information. Please review our policies below.
        </p>
        <div className="privacy-content mb-8">
          <h3 className="text-2xl font-semibold mb-2">1. Information Collection</h3>
          <p>Details about information collection...</p>

          <h3 className="text-2xl font-semibold mb-2">2. Data Usage</h3>
          <p>Explanation of how we use your data...</p>

          {/* More sections... */}
        </div>
      </section>

      {/* Contact Information Section */}
      <section id="contact-information" className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
        <p>If you have any questions, please contact us at:</p>
        <p>Email: support@guardian-io.com</p>
        <p>Address: 123 Guardian St., Tech City</p>
      </section>

      {showBackToTop && <BackToTopButton />}
    </div>
  );
};

export default TermsPage;
