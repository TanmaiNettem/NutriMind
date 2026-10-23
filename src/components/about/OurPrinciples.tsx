import React from 'react';
import { Feather, Eye, Wrench, Scale } from 'lucide-react';

export const OurPrinciples: React.FC = () => {
  const principles = [
    {
      id: 'principle-simple',
      title: 'Simple',
      icon: Feather,
      description: 'Make nutrition easier to understand without overwhelming tables or jargon.'
    },
    {
      id: 'principle-transparent',
      title: 'Transparent',
      icon: Eye,
      description: 'Clearly communicate that nutrition values are estimates, keeping science honest.'
    },
    {
      id: 'principle-practical',
      title: 'Practical',
      icon: Wrench,
      description: 'Focus on useful information users can act on right now at their next meal.'
    },
    {
      id: 'principle-balanced',
      title: 'Balanced',
      icon: Scale,
      description: 'Encourage sustainable and balanced nutrition rather than punishment or extremes.'
    }
  ];

  return (
    <section id="our-principles" className="py-20 bg-white border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Our Principles
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3">
            The foundational standards that guide how we build NutriMind and speak to our community.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-[#FBFDFB] hover:bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 text-xs font-semibold text-emerald-700">
                  NutriMind Standard
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
