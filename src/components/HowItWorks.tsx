import React from 'react';
import { MessageSquareQuote, Cpu, BarChart3, ArrowRight } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';

export const HowItWorks: React.FC = () => {
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <MessageSquareQuote className="w-6 h-6 text-emerald-700" />;
      case 1:
        return <Cpu className="w-6 h-6 text-emerald-700" />;
      case 2:
        return <BarChart3 className="w-6 h-6 text-emerald-700" />;
      default:
        return null;
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-[#FBFDFB] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Effortless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            From Meal to Insight
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3">
            Three intuitive steps bridging what you eat with how it nourishes your body.
          </p>
        </div>

        {/* Steps Flow (Horizontal on desktop, vertical on mobile) */}
        <div className="relative">
          {/* Connector Line on desktop */}
          <div 
            className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 -translate-y-8 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Step number badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-emerald-700/30 group-hover:text-emerald-700/60 transition-colors font-mono">
                      {step.stepNumber}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Step Title & Subtext */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {step.badge}
                    </span>
                    <h3 className="text-xl font-bold text-stone-900 mt-2">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed mt-3">
                    {step.description}
                  </p>
                </div>

                {/* Micro Example Hint */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>
                    {idx === 0 && 'e.g. "Two boiled eggs and black coffee"'}
                    {idx === 1 && 'Decomposes macronutrients & portions'}
                    {idx === 2 && 'Calorie breakdown & balance tips'}
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    Step {step.stepNumber}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
