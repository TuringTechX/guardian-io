// src/components/UIElements/SocialMediaIcons.tsx

import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  { icon: <FaFacebook />, url: 'https://www.facebook.com/Guardian-IO' },
  { icon: <FaTwitter />, url: 'https://twitter.com/Guardian-IO' },
  { icon: <FaLinkedin />, url: 'https://linkedin.com/company/Guardian-IO' },
  { icon: <FaInstagram />, url: 'https://instagram.com/Guardian-IO' },
];

const SocialMediaIcons: React.FC = () => (
  <div className="social-icons">
    {socialLinks.map(({ icon, url }, index) => (
      <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="social-icon">
        {icon}
      </a>
    ))}
  </div>
);

export default SocialMediaIcons;
