import React from 'react';
import { Utensils, Sparkles, PieChart, Lightbulb } from 'lucide-react';
import { BENEFITS_ITEMS } from '../data/mockData';

export const Benefits: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils':
        return <Utensils className="w-5 h-5 text-emerald-700" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-700" />;
      case 'pie-chart':
        return <PieChart className="w-5 h-5 text-emerald-700" />;
      case 'lightbulb':
        return <Lightbulb className="w-5 h-5 text-emerald-700" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <section id="benefits" className="py-12 sm:py-16 bg-white border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with subtle title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Core Value
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-3">
            Designed for Daily Clarity & Ease
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            NutriMind shifts the burden from meticulous manual tracking to natural understanding.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#FBFDFB] hover:bg-emerald-50/40 rounded-2xl p-6 border border-stone-200/70 hover:border-emerald-200 shadow-xs hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-100/70 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <span>Intelligent Care</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
