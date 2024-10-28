import React from 'react';
import { useSpring, animated } from 'react-spring'; // For animations
import heroImage from '../assets/images/hero-bg.jpg'; // Lazy-loaded background image
import Button from '../../components/UIElements/Button'; // Import reusable Button component

const HeroSection: React.FC = () => {
    // Structured data for easy content management
    const heroContent = {
        title: 'Building Ethical, Transparent, and Scalable Supply Chains',
        subtitle: 'Guardian-IO ensures sustainability and human rights compliance at every step.',
        description:
            'Our mission is to help businesses build trust and meet global standards by providing full visibility into supply chains.',
        buttons: [
            { label: 'Get Started', path: '/get-started', style: 'primary' },
            { label: 'Learn More', path: '/about', style: 'secondary' }
        ]
    };

    // Animation for text fade-in and slide-up
    const fadeSlide = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 600 }
    });

    return (
        <section
            className="relative bg-cover bg-center text-gray-100 py-20 px-8 md:px-16"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            {/* Overlay for improved text readability */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Content */}
            <div className="relative max-w-3xl mx-auto text-center">
                <animated.div style={fadeSlide}>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        {heroContent.title}
                    </h1>
                    <p className="text-lg md:text-xl font-light mb-4">
                        {heroContent.subtitle}
                    </p>
                    <p className="text-sm md:text-base mb-8 leading-relaxed">
                        {heroContent.description}
                    </p>
                </animated.div>

                {/* CTA Buttons */}
                <div className="flex justify-center space-x-4">
                    {heroContent.buttons.map((button) => (
                        <Button key={button.label} label={button.label} path={button.path} style={button.style} />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 w-full flex justify-center">
                <div className="animate-bounce text-gray-100">
                    <span className="text-sm">Scroll down</span>
                    <svg
                        className="w-6 h-6 mx-auto mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
