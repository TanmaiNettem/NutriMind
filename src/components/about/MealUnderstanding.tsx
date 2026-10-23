import React from 'react';
import { 
  ArrowRight, 
  ArrowDown, 
  Sparkles, 
  Layers, 
  Flame, 
  Dumbbell, 
  Wheat, 
  Droplet, 
  Lightbulb, 
  Info,
  CheckCircle2
} from 'lucide-react';

export const MealUnderstanding: React.FC = () => {
  return (
    <section id="meal-understanding" className="py-20 bg-[#FBFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Cognitive Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            From What You Ate to What It Means
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3">
            See how an everyday natural meal description gets transformed step-by-step into clear, structured nutritional clarity.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1 rounded-full">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            <span>Demonstration pipeline • All values shown below are illustrative sample metrics</span>
          </div>
        </div>

        {/* 4-Step Pipeline Display */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
          
          {/* STEP 01: MEAL DESCRIPTION */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left relative group">
            <div className="absolute top-6 right-6 text-3xl font-mono font-extrabold text-stone-200 group-hover:text-emerald-100 transition-colors">
              01
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                User Input
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-3 mb-2">
                Meal Description
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Expressed naturally without searching menus or barcodes.
              </p>

              {/* Card content */}
              <div className="bg-stone-50 border border-stone-200/70 rounded-2xl p-4 my-2">
                <span className="text-[11px] font-medium text-stone-400 block mb-1">
                  Example Input:
                </span>
                <p className="text-sm font-semibold text-stone-900 italic leading-snug">
                  "Two dosas with chutney and sambar"
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-emerald-700">Natural Voice/Text</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 hidden lg:block" />
              <ArrowDown className="w-4 h-4 text-emerald-600 block lg:hidden" />
            </div>
          </div>

          {/* STEP 02: MEAL DECOMPOSITION */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left relative group">
            <div className="absolute top-6 right-6 text-3xl font-mono font-extrabold text-stone-200 group-hover:text-emerald-100 transition-colors">
              02
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                AI Decomposition
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-3 mb-2">
                Meal Decomposition
              </h3>
              <p className="text-xs text-stone-500 mb-3">
                Breaks the meal down into likely raw culinary components:
              </p>

              {/* Sub-components */}
              <div className="space-y-2 text-xs">
                {/* Dosa */}
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <span className="font-bold text-stone-800 block text-[11px]">
                    Dosa (2 medium)
                  </span>
                  <span className="text-stone-500 text-[10px]">
                    • Rice • Urad dal • Oil
                  </span>
                </div>

                {/* Sambar */}
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <span className="font-bold text-stone-800 block text-[11px]">
                    Sambar (1 cup)
                  </span>
                  <span className="text-stone-500 text-[10px]">
                    • Yellow Lentils • Vegetables • Spices
                  </span>
                </div>

                {/* Chutney */}
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <span className="font-bold text-stone-800 block text-[11px]">
                    Coconut Chutney (2 tbsp)
                  </span>
                  <span className="text-stone-500 text-[10px]">
                    • Fresh Coconut • Spices • Seasoning
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-emerald-700">Ingredient Mapping</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 hidden lg:block" />
              <ArrowDown className="w-4 h-4 text-emerald-600 block lg:hidden" />
            </div>
          </div>

          {/* STEP 03: NUTRITION ESTIMATION */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left relative group">
            <div className="absolute top-6 right-6 text-3xl font-mono font-extrabold text-stone-200 group-hover:text-emerald-100 transition-colors">
              03
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                Estimation
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-3 mb-2">
                Nutrition Estimation
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Aggregated macro and calorie estimates for the meal:
              </p>

              {/* Sample Metrics */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-emerald-50/70 border border-emerald-100 p-2.5 rounded-xl">
                  <div className="flex items-center justify-between text-[10px] text-emerald-800 font-semibold mb-0.5">
                    <span>Calories</span>
                    <Flame className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-lg font-extrabold text-stone-900">480</span>
                  <span className="text-[10px] text-stone-500 ml-1">kcal</span>
                </div>

                <div className="bg-stone-50 border border-stone-200/60 p-2.5 rounded-xl">
                  <div className="flex items-center justify-between text-[10px] text-stone-600 font-semibold mb-0.5">
                    <span>Protein</span>
                    <Dumbbell className="w-3 h-3 text-teal-600" />
                  </div>
                  <span className="text-lg font-extrabold text-stone-900">14</span>
                  <span className="text-[10px] text-stone-500 ml-1">g</span>
                </div>

                <div className="bg-stone-50 border border-stone-200/60 p-2.5 rounded-xl">
                  <div className="flex items-center justify-between text-[10px] text-stone-600 font-semibold mb-0.5">
                    <span>Carbs</span>
                    <Wheat className="w-3 h-3 text-amber-600" />
                  </div>
                  <span className="text-lg font-extrabold text-stone-900">68</span>
                  <span className="text-[10px] text-stone-500 ml-1">g</span>
                </div>

                <div className="bg-stone-50 border border-stone-200/60 p-2.5 rounded-xl">
                  <div className="flex items-center justify-between text-[10px] text-stone-600 font-semibold mb-0.5">
                    <span>Fat</span>
                    <Droplet className="w-3 h-3 text-stone-500" />
                  </div>
                  <span className="text-lg font-extrabold text-stone-900">16</span>
                  <span className="text-[10px] text-stone-500 ml-1">g</span>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-emerald-700 mt-2 block italic text-center">
                Sample / Demonstration Values
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-emerald-700">Macro Synthesis</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 hidden lg:block" />
              <ArrowDown className="w-4 h-4 text-emerald-600 block lg:hidden" />
            </div>
          </div>

          {/* STEP 04: QUICK INSIGHT */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left relative group">
            <div className="absolute top-6 right-6 text-3xl font-mono font-extrabold text-emerald-200 group-hover:text-emerald-300 transition-colors">
              04
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                Actionable Advice
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-3 mb-2">
                Quick Insight
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Supportive reflection on how to round out the meal:
              </p>

              {/* Insight callout */}
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-2xl p-4 border border-emerald-200/80 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Balanced Nutrition</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                  "Your meal provides a good carbohydrate base. Consider adding a protein-rich food to improve balance."
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-emerald-700">Supportive Guidance</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
