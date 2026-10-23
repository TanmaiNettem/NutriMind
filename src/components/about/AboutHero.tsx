import React from 'react';
import { 
  Sparkles, 
  ArrowDown, 
  ArrowRight, 
  Utensils, 
  Cpu, 
  PieChart, 
  Lightbulb, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface AboutHeroProps {
  onStartTracking: () => void;
  onExplorePurpose: () => void;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onStartTracking, onExplorePurpose }) => {
  return (
    <section id="about-hero" className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
      {/* Background glow ambiance */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-emerald-100/40 via-teal-50/20 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Mission Copy */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>ABOUT NUTRIMIND</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-stone-900 tracking-tight leading-[1.15] mb-6">
              Nutrition Should Be{' '}
              <span className="text-emerald-700 block mt-1">
                Easier to Understand.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal mb-8 max-w-xl">
              NutriMind turns the meals you describe into simple nutrition insights, helping you understand what you're eating without making food tracking feel complicated.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                id="btn-about-hero-start"
                type="button"
                onClick={onStartTracking}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-base rounded-xl shadow-lg shadow-emerald-800/15 hover:shadow-xl hover:shadow-emerald-800/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Start Tracking</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-about-hero-purpose"
                type="button"
                onClick={onExplorePurpose}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-semibold text-base rounded-xl shadow-xs hover:border-stone-300 transition-all"
              >
                <span>Why We Built It</span>
              </button>
            </div>

            <div className="pt-6 border-t border-stone-200/70 flex items-center gap-6 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Human-friendly logging
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Evidence-informed approach
              </span>
            </div>
          </div>

          {/* Right Column: Tasteful Abstract Nutrition/AI Visual Composition */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              
              {/* Outer decorative container */}
              <div className="rounded-3xl bg-white/95 backdrop-blur-sm border border-emerald-100/90 p-6 sm:p-8 shadow-xl shadow-stone-200/50 relative">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full">
                    NutriMind Architecture
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    Meal → Meaning
                  </span>
                </div>

                {/* Vertical Visual Composition: Food → AI Understanding → Nutrition → Insight */}
                <div className="space-y-3 relative text-left">
                  
                  {/* Step 1: Food */}
                  <div className="relative z-10 flex items-center gap-4 p-4 rounded-2xl bg-[#FBFDFB] border border-stone-200/80 shadow-xs hover:border-emerald-200 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 flex-shrink-0">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        Step 1 • Everyday Food
                      </span>
                      <h4 className="text-sm font-bold text-stone-900">
                        Describe What You Ate
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        "Two chapatis, bowl of dal, and roasted carrots"
                      </p>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  <div className="flex justify-center -my-1 relative z-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Step 2: AI Understanding */}
                  <div className="relative z-10 flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 shadow-xs">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        Step 2 • AI Understanding
                      </span>
                      <h4 className="text-sm font-bold text-stone-900">
                        Decompose Into Components
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Identifies ingredients, estimated portions, and meal structure
                      </p>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  <div className="flex justify-center -my-1 relative z-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Step 3: Nutrition */}
                  <div className="relative z-10 flex items-center gap-4 p-4 rounded-2xl bg-[#FBFDFB] border border-stone-200/80 shadow-xs hover:border-emerald-200 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700 flex-shrink-0">
                      <PieChart className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                        Step 3 • Nutrition Estimation
                      </span>
                      <h4 className="text-sm font-bold text-stone-900">
                        Calories & Macronutrient Breakdown
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Clear perspective across protein, carbohydrates, fats & fiber
                      </p>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  <div className="flex justify-center -my-1 relative z-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Step 4: Insight */}
                  <div className="relative z-10 flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-xs">
                    <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                        Step 4 • Actionable Guidance
                      </span>
                      <h4 className="text-sm font-bold text-stone-900">
                        Supportive Nutrition Insight
                      </h4>
                      <p className="text-xs text-emerald-900 font-medium mt-0.5">
                        "Great fiber from lentils. Adding protein will sustain fullness longer."
                      </p>
                    </div>
                  </div>

                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Zero barcode scanning required</span>
                  <span className="text-emerald-700 font-semibold font-mono">NutriMind Design</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
