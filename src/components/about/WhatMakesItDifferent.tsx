import React from 'react';
import { MessageSquareText, Layers, PieChart, Compass, ArrowUpRight } from 'lucide-react';

export const WhatMakesItDifferent: React.FC = () => {
  const cards = [
    {
      id: 'diff-natural-logging',
      icon: MessageSquareText,
      title: 'Natural Food Logging',
      description: 'Describe your meals in everyday language instead of navigating complicated food databases.',
      highlight: 'No barcode scanning needed'
    },
    {
      id: 'diff-meal-decomposition',
      icon: Layers,
      title: 'Meal Decomposition',
      description: 'Understand the likely ingredients and components that make up the food you eat.',
      highlight: 'Deep ingredient clarity'
    },
    {
      id: 'diff-macro-awareness',
      icon: PieChart,
      title: 'Macro Awareness',
      description: 'See estimated calories, protein, carbohydrates and fat in one simple view.',
      highlight: 'Clear macro breakdowns'
    },
    {
      id: 'diff-actionable-insights',
      icon: Compass,
      title: 'Actionable Insights',
      description: 'Go beyond numbers with a quick indication of which nutritional areas may deserve more attention.',
      highlight: 'Context without guilt'
    }
  ];

  return (
    <section id="what-makes-it-different" className="py-20 bg-white border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Key Differentiators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            More Than a Calorie Counter
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3">
            Most calorie apps act like tax accountants for your food. NutriMind acts like an encouraging, knowledgeable culinary partner.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={card.id}
                className="group relative bg-[#FBFDFB] hover:bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-emerald-300 shadow-xs hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-200 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-6 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 tracking-tight mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800">
                    {card.highlight}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
