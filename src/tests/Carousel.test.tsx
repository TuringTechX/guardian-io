// src/tests/Carousel.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IndexPage from '../pages/index';
import { featuresData } from '../data/featuresData';

// Mock the components used in IndexPage
jest.mock('../components/LandingPage/HeroSection', () => () => <div>HeroSection</div>);
jest.mock('../components/LandingPage/FeaturesSection', () => () => <div>FeaturesSection</div>);
jest.mock('../components/LandingPage/TestimonialSection', () => () => <div>TestimonialSection</div>);
jest.mock('../components/LandingPage/PartnersSection', () => () => <div>PartnersSection</div>);
jest.mock('../components/LandingPage/Footer', () => () => <div>Footer</div>);

describe('Carousel Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<IndexPage />);
    expect(getByText('HeroSection')).toBeInTheDocument();
    expect(getByText('FeaturesSection')).toBeInTheDocument();
    expect(getByText('TestimonialSection')).toBeInTheDocument();
    expect(getByText('PartnersSection')).toBeInTheDocument();
  });

  it('should move to the next feature when the right arrow is clicked', () => {
    const { getByRole } = render(<IndexPage />);
    const rightArrow = getByRole('button', { name: /right arrow/i });
    
    // Click the right arrow
    fireEvent.click(rightArrow);

    // Assuming the featureData has elements, we should move to the next feature
    // Test if the next feature is displayed (depends on FeatureCard implementation)
    // Example: expect(getByText(featuresData[1].title)).toBeInTheDocument();
  });

  it('should move to the previous feature when the left arrow is clicked', () => {
    const { getByRole } = render(<IndexPage />);
    const leftArrow = getByRole('button', { name: /left arrow/i });
    
    // Click the left arrow
    fireEvent.click(leftArrow);

    // Test if the previous feature is displayed
    // Example: expect(getByText(featuresData[0].title)).toBeInTheDocument();
  });

  it('should pause the carousel on hover and resume when hover is removed', () => {
    const { getByTestId } = render(<IndexPage />);
    const carousel = getByTestId('carousel-container');

    // Simulate hover
    fireEvent.mouseEnter(carousel);

    // Add checks related to the pause, possibly by mocking setInterval or checking isPaused state
    // Simulate mouse leave
    fireEvent.mouseLeave(carousel);

    // Check if autoplay resumes
  });
});
