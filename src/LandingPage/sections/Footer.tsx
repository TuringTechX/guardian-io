import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

// Lazy load LanguageSelector and AccessibilityOptions components
const LanguageSelector = lazy(() => import('../../components/LanguageSelector'));
const AccessibilityOptions = lazy(() => import('../../components/AccessibilityOptions'));

const Footer: React.FC = () => {
    const contactInfo = {
        address: '123 Guardian Lane, Ethical City, EC 12345',
        email: 'support@guardian-io.com',
        phone: '+1 (123) 456-7890'
    };

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Sustainability', path: '/sustainability' },
        { name: 'CSR Initiatives', path: '/csr' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms' },
    ];

    const socialLinks = [
        { icon: <FaFacebook />, url: 'https://facebook.com/guardian-io', label: 'Facebook' },
        { icon: <FaTwitter />, url: 'https://twitter.com/guardian-io', label: 'Twitter' },
        { icon: <FaLinkedin />, url: 'https://linkedin.com/company/guardian-io', label: 'LinkedIn' },
        { icon: <FaInstagram />, url: 'https://instagram.com/guardian-io', label: 'Instagram' },
    ];

    return (
        <footer className="bg-gray-800 text-gray-300 py-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Information */}
                <div>
                    <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                    <p className="mt-2">{contactInfo.address}</p>
                    <p>Email: {contactInfo.email}</p>
                    <p>Phone: {contactInfo.phone}</p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link to={link.path} className="hover:underline">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media and Extras */}
                <div className="flex flex-col space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                        <div className="flex space-x-4 mt-2">
                            {socialLinks.map(({ icon, url, label }) => (
                                <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="hover:text-blue-400 text-xl"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Lazy-loaded Language Selector and Accessibility Options */}
                    <Suspense fallback={<div>Loading settings...</div>}>
                        <LanguageSelector />
                        <AccessibilityOptions />
                    </Suspense>
                </div>
            </div>

            {/* Legal Disclaimers */}
            <div className="mt-8 border-t border-gray-600 pt-4 text-sm text-center text-gray-500">
                <p>© {new Date().getFullYear()} Guardian-IO. All rights reserved.</p>
                <p>
                    Our mission is to foster ethical, sustainable, and transparent business practices globally.
                    <Link to="/accessibility-statement" className="hover:underline ml-2">Accessibility Statement</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
