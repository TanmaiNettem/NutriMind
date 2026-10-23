import React from 'react';
import { Heart, Check, X, Shield, Sparkles, Smile, BatteryCharging, Leaf } from 'lucide-react';

export const NutritionWithoutJudgment: React.FC = () => {
  const whatWeEncourage = [
    { label: 'Mindful Awareness', detail: 'Understanding what foods fuel your day best without rigid anxiety.' },
    { label: 'Practical Balance', detail: 'Enjoying rich meals alongside wholesome, nutrient-dense ingredients.' },
    { label: 'Consistent Rhythm', detail: 'Building sustainable lifelong habits rather than short sprint deprivation.' },
    { label: 'Better Choices', detail: 'Adding beneficial fiber, protein, and colorful plants gradually over time.' },
    { label: 'Sustainable Living', detail: 'Honoring social traditions, cultural comfort foods, and joyous eating.' }
  ];

  const whatWeLeaveBehind = [
    'Extreme calorie deprivation & starvation quotas',
    'Punitive "good food vs. bad food" moral judgments',
    'Crash detoxes, juice cleanses, and rapid fad diets',
    'Unrealistic body ideals & digital shame notifications',
    'Obsessive decimal-point micro-weighing anxiety'
  ];

  return (
    <section id="nutrition-without-judgment" className="py-20 bg-gradient-to-b from-stone-50/50 to-emerald-50/30 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Mindset & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-stone-900 tracking-tight">
            Understand Your Food.{' '}
            <span className="text-emerald-700 block sm:inline">Don't Fear It.</span>
          </h2>
          <p className="text-stone-600 text-lg sm:text-xl font-medium mt-3">
            NutriMind is designed to encourage awareness, not guilt.
          </p>
          <p className="text-stone-500 text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
            Food is culture, energy, and nourishment. Our mission is to illuminate what you consume with kindness and clarity, freeing you from obsessive calorie guilt.
          </p>
        </div>

        {/* Side-by-Side Philosophy Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: What We Encourage (Positive Values) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      What NutriMind Encourages
                    </h3>
                    <p className="text-xs text-stone-500">
                      Gentle, sustainable nutrition perspective
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                  Empowering
                </span>
              </div>

              <div className="space-y-4">
                {whatWeEncourage.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-700" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-stone-900 mr-2">
                        {item.label}:
                      </span>
                      <span className="text-sm text-stone-600">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 text-xs text-stone-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>We celebrate food diversity, comfort favorites, and everyday culinary enjoyment.</span>
            </div>
          </div>

          {/* Right Column: What We Reject */}
          <div className="lg:col-span-5 bg-stone-50/90 rounded-3xl p-6 sm:p-8 border border-stone-200/80 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      What We Reject
                    </h3>
                    <p className="text-xs text-stone-500">
                      Harmful and restrictive diet dogma
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-stone-600 bg-stone-200/60 px-2.5 py-1 rounded-full">
                  Zero Guilt
                </span>
              </div>

              <div className="space-y-3.5">
                {whatWeLeaveBehind.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-stone-600">
                    <div className="w-5 h-5 rounded-full bg-rose-100/70 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200/60 text-xs text-stone-500">
              <span>Notice: NutriMind provides general nutritional awareness and is not intended for clinical diagnosis, treatment, or eating disorder management.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
