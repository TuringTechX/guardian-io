// src/components/UIElements/Footer.tsx

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { LanguageContext } from '../../context/LanguageContext';
import SocialMediaIcons from './SocialMediaIcons';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import '../../styles/footer.css';

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { currentLanguage } = useContext(LanguageContext);

  const year = new Date().getFullYear();

  return (
    <footer className={`footer ${theme === 'dark' ? 'footer-dark' : 'footer-light'}`}>
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
        
        <div className="footer-middle">
          <SocialMediaIcons />
          <LanguageSelector />
        </div>
        
        <div className="footer-bottom">
          <span className="footer-copy">&copy; {year} Guardian-IO. {currentLanguage === 'en' ? 'All Rights Reserved.' : 'Todos los derechos reservados.'}</span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
