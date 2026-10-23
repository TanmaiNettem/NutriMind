import React from 'react';
import { Search, ListFilter, Scale, RefreshCw, Sparkles, Check, X, AlertCircle } from 'lucide-react';

export const OurPurpose: React.FC = () => {
  return (
    <section id="our-purpose" className="py-16 sm:py-20 bg-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Our Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Why We Built NutriMind
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3">
            Nutrition tracking shouldn't require a master's degree in database querying.
          </p>
        </div>

        {/* Two-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual representation of traditional food tracking frustration */}
          <div className="lg:col-span-6 bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200/80 text-left">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Traditional Food Tracking
                </span>
              </div>
              <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Data entry fatigue
              </span>
            </div>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-stone-200/60 text-stone-600 text-sm">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-stone-800 block">1. Search for Food</span>
                  <span className="text-xs text-stone-400">Sift through 100+ generic or conflicting brand entries</span>
                </div>
                <X className="w-4 h-4 text-stone-300" />
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-stone-200/60 text-stone-600 text-sm">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
                  <ListFilter className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-stone-800 block">2. Select Food</span>
                  <span className="text-xs text-stone-400">Guess which entry matches home cooking or restaurant prep</span>
                </div>
                <X className="w-4 h-4 text-stone-300" />
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-stone-200/60 text-stone-600 text-sm">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-stone-800 block">3. Find Portion</span>
                  <span className="text-xs text-stone-400">Convert cups to grams or milliliters manually</span>
                </div>
                <X className="w-4 h-4 text-stone-300" />
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-stone-200/60 text-stone-600 text-sm">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-stone-800 block">4. Adjust Quantity</span>
                  <span className="text-xs text-stone-400">Fiddle with decimals and obscure serving unit sizes</span>
                </div>
                <X className="w-4 h-4 text-stone-300" />
              </div>

              {/* Step 5 */}
              <div className="flex items-center gap-3.5 p-3.5 bg-rose-50/60 rounded-xl border border-rose-100 text-rose-900 text-sm">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold block">5. Repeat for Every Single Ingredient</span>
                  <span className="text-xs text-rose-700">High friction leads 80% of users to abandon tracking in 2 weeks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The NutriMind Approach */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>The NutriMind Approach</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
              "Food logging shouldn't feel like data entry."
            </h3>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              People think about food as meals, not database entries. NutriMind is designed around the way people naturally describe what they eat.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              When you eat dinner, you don't think in terms of five separate barcodes or Gram-to-Ounce conversion charts. You think: <em>"I had rice, lentils, and mixed veggies with a dash of ghee."</em>
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-700" />
                </div>
                <p className="text-sm text-stone-700 font-medium">
                  <strong>Natural Expression:</strong> Speak or type your meal just like you would describe it to a friend.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-700" />
                </div>
                <p className="text-sm text-stone-700 font-medium">
                  <strong>Intelligent Deconstruction:</strong> The AI identifies likely components, preparations, and portions behind the scenes.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-700" />
                </div>
                <p className="text-sm text-stone-700 font-medium">
                  <strong>Meaningful Takeaways:</strong> Get actionable insights on nutrient balance instead of just dry spreadsheets.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
