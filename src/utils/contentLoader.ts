// src/utils/contentLoader.ts

import { ContentSection } from '../types/termsTypes';

export const termsContent: ContentSection[] = [
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    paragraphs: [
      'Welcome to Guardian-IO. By accessing our platform, you agree to our Terms of Service...',
      'User agreement details...',
      'License and usage restrictions...'
    ],
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    paragraphs: [
      'Guardian-IO is committed to safeguarding your personal information...',
      'Details about information collection...',
      'Explanation of data usage...'
    ],
  },
  {
    id: 'contact-information',
    title: 'Contact Information',
    paragraphs: [
      'If you have any questions, please contact us at:',
      'Email: support@guardian-io.com',
      'Address: 123 Guardian St., Tech City'
    ],
  },
];
