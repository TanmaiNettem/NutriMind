import React from 'react';
import { ArrowRight, Sparkles, Shield, CheckCircle } from 'lucide-react';

interface FinalCTAProps {
  onStartTracking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartTracking }) => {
  return (
    <section id="final-cta" className="py-20 bg-[#FBFDFB] relative overflow-hidden">
      {/* Background glow decoration */}
      <div 
        className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10"
        aria-hidden="true"
      >
        <div className="w-[800px] h-[350px] bg-gradient-to-r from-emerald-100/40 via-teal-100/30 to-emerald-100/40 rounded-full blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl p-8 sm:p-14 md:p-16 text-center shadow-2xl relative overflow-hidden border border-stone-800">
          
          {/* Subtle accent border at top */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Begin Your Nutrition Journey</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5">
            Know Your Food.{' '}
            <span className="text-emerald-400 block sm:inline">
              Make Better Choices.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto mb-9 font-normal leading-relaxed">
            Start turning your everyday meals into simple nutrition insights.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              id="btn-final-start-tracking"
              type="button"
              onClick={onStartTracking}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-stone-950 font-bold text-base rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <span>Start Tracking</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Minimal reassurance bullets */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Free to get started
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Natural language meals
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Zero tedious database lookups
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
