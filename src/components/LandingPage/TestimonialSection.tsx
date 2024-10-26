// src/components/LandingPage/TestimonialSection.tsx

import React, { useState, useEffect } from 'react';

const testimonials = [
  { quote: "Guardian-IO revolutionized our supply chain visibility.", author: "Global Retail Inc." },
  { quote: "Our compliance efforts have never been more streamlined.", author: "Ethical Textiles Co." },
  // Add more testimonials here
];

const TestimonialSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial-section py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Partners Say</h2>
      <div className="max-w-4xl mx-auto text-center">
        <blockquote className="text-xl italic mb-4">“{testimonials[current].quote}”</blockquote>
        <p className="text-lg font-semibold">- {testimonials[current].author}</p>
      </div>
    </section>
  );
};

export default TestimonialSection;
