import React, { useEffect } from 'react';
import { AboutHero } from './AboutHero';
import { OurPurpose } from './OurPurpose';
import { MealUnderstanding } from './MealUnderstanding';
import { WhatMakesItDifferent } from './WhatMakesItDifferent';
import { NutritionWithoutJudgment } from './NutritionWithoutJudgment';
import { WhatNutriMindHelpsUnderstand } from './WhatNutriMindHelpsUnderstand';
import { AIApproach } from './AIApproach';
import { OurPrinciples } from './OurPrinciples';
import { AboutCTA } from './AboutCTA';

interface AboutPageProps {
  onStartTracking: () => void;
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartTracking, onNavigateHome }) => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="about-page" className="flex-1 w-full">
      {/* 1. About Hero */}
      <AboutHero 
        onStartTracking={onStartTracking} 
        onExplorePurpose={() => handleScrollToSection('our-purpose')} 
      />

      {/* 2. Our Purpose */}
      <OurPurpose />

      {/* 3. How NutriMind Thinks About a Meal */}
      <MealUnderstanding />

      {/* 4. What Makes It Different */}
      <WhatMakesItDifferent />

      {/* 5. Nutrition Without Judgment */}
      <NutritionWithoutJudgment />

      {/* 6. What NutriMind Helps You Understand */}
      <WhatNutriMindHelpsUnderstand />

      {/* 7. Our Approach to AI */}
      <AIApproach />

      {/* 8. Our Principles */}
      <OurPrinciples />

      {/* 9. Final CTA */}
      <AboutCTA 
        onStartTracking={onStartTracking} 
        onBackToHome={onNavigateHome} 
      />
    </main>
  );
};
