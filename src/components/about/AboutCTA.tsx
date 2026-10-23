import React from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Leaf, ShieldCheck } from 'lucide-react';

interface AboutCTAProps {
  onStartTracking: () => void;
  onBackToHome: () => void;
}

export const AboutCTA: React.FC<AboutCTAProps> = ({ onStartTracking, onBackToHome }) => {
  return (
    <section id="about-cta" className="py-20 sm:py-24 bg-gradient-to-b from-[#FBFDFB] to-emerald-50/40 border-t border-stone-200/70 relative overflow-hidden">
      {/* Background glow decoration */}
      <div 
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-200/20 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
          <Leaf className="w-3.5 h-3.5 text-emerald-700" />
          <span>JOIN THE MOVEMENT FOR SIMPLE NUTRITION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
          Ready to Understand What You Eat?
        </h2>

        <p className="text-stone-600 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Turn everyday meals into simple nutrition insights. Experience the freedom of food logging designed for human beings.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-about-cta-start"
            type="button"
            onClick={onStartTracking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-base rounded-2xl shadow-xl shadow-emerald-800/15 hover:shadow-2xl hover:shadow-emerald-800/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Tracking</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-about-cta-back"
            type="button"
            onClick={onBackToHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-semibold text-base rounded-2xl shadow-xs hover:border-stone-300 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-stone-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            No strict calorie counting pressure
          </span>
          <span className="hidden sm:inline text-stone-300">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Clear ingredient breakdowns
          </span>
        </div>

      </div>
    </section>
  );
};
