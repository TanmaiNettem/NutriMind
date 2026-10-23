import React, { useState } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Wheat, 
  Droplet, 
  Sparkles, 
  Check, 
  Apple, 
  ShieldCheck, 
  HeartHandshake, 
  Activity 
} from 'lucide-react';

interface NutrientDetail {
  name: string;
  role: string;
  whyItMatters: string;
  sampleRatio: string;
  colorClass: string;
  badgeClass: string;
  icon: React.ReactNode;
}

export const NutritionInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'macronutrients' | 'fiber'>('all');

  const nutrients: NutrientDetail[] = [
    {
      name: 'Calories',
      role: 'Foundational Energy',
      whyItMatters: 'Calories are the energy your brain and body require to thrive. Instead of treating calories as a penalty, NutriMind views them as cellular fuel.',
      sampleRatio: 'Energy Baseline',
      colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      icon: <Flame className="w-5 h-5 text-emerald-600" />,
    },
    {
      name: 'Protein',
      role: 'Repair & Satiety',
      whyItMatters: 'Essential for maintaining lean muscle, cellular regeneration, immune function, and keeping hunger steady between daily activities.',
      sampleRatio: '20% – 30% balance',
      colorClass: 'text-teal-700 bg-teal-50 border-teal-200',
      badgeClass: 'bg-teal-100 text-teal-800',
      icon: <Dumbbell className="w-5 h-5 text-teal-600" />,
    },
    {
      name: 'Carbs',
      role: 'Cognitive & Cellular Fuel',
      whyItMatters: 'The body’s preferred fuel for brain clarity and sustained stamina. NutriMind distinguishes complex, fiber-rich carbs from ultra-refined sugars.',
      sampleRatio: '45% – 60% balance',
      colorClass: 'text-amber-700 bg-amber-50 border-amber-200',
      badgeClass: 'bg-amber-100 text-amber-800',
      icon: <Wheat className="w-5 h-5 text-amber-600" />,
    },
    {
      name: 'Fat',
      role: 'Hormonal & Nutrient Support',
      whyItMatters: 'Crucial for absorbing fat-soluble vitamins (A, D, E, K), nervous system sheath protection, and long-lasting cellular vitality.',
      sampleRatio: '20% – 35% balance',
      colorClass: 'text-stone-700 bg-stone-100 border-stone-200',
      badgeClass: 'bg-stone-200 text-stone-800',
      icon: <Droplet className="w-5 h-5 text-stone-600" />,
    },
    {
      name: 'Fiber',
      role: 'Gut Wellness & Metabolic Calm',
      whyItMatters: 'Often forgotten in traditional calorie counters. Adequate fiber feeds microbiome biodiversity and moderates glucose absorption for level energy.',
      sampleRatio: '28g – 38g daily goal',
      colorClass: 'text-green-800 bg-green-50 border-green-200',
      badgeClass: 'bg-green-100 text-green-900',
      icon: <Apple className="w-5 h-5 text-green-700" />,
    },
  ];

  return (
    <section id="nutrition-insights" className="py-20 bg-white border-t border-stone-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Holistic Balance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Calories Tell Part of the Story.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3 leading-relaxed">
            NutriMind helps you understand the bigger picture — protein, carbohydrates, fats and the nutritional balance of your meals.
          </p>
        </div>

        {/* The 5 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
          {nutrients.map((item) => (
            <div
              key={item.name}
              className="bg-[#FBFDFB] rounded-2xl p-5 sm:p-6 border border-stone-200/70 hover:border-emerald-200/90 shadow-xs hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/60 flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.badgeClass}`}>
                    {item.sampleRatio}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-1">
                  {item.name}
                </h3>
                <span className="text-xs font-semibold text-emerald-700 block mb-3">
                  {item.role}
                </span>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.whyItMatters}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-medium text-stone-400">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tracked in every meal</span>
              </div>
            </div>
          ))}
        </div>

        {/* Nutritional Philosophy Callout: Understanding & Balance over Restriction */}
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-stone-50 rounded-3xl p-8 sm:p-10 border border-emerald-100 text-left shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                <span>Healthy Mindset Philosophy</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-3">
                Nourishment Without Anxiety
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-4">
                We deliberately avoid extreme diets, guilt-inducing alerts, or unrealistic body benchmarks. NutriMind is designed to foster a positive, lifelong relationship with wholesome nourishment through transparent data and mindful feedback.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-stone-700 pt-2">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  No starvation metrics
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Focus on food quality & fiber
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Supportive, constructive tone
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                Balanced Meal Anatomy
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                    Protein (Satiety & repair)
                  </span>
                  <span className="font-mono font-semibold">25%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-500 h-2 rounded-full w-[25%]"></div>
                </div>

                <div className="flex items-center justify-between text-stone-700 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Carbohydrates (Clean fuel)
                  </span>
                  <span className="font-mono font-semibold">45%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full w-[45%]"></div>
                </div>

                <div className="flex items-center justify-between text-stone-700 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
                    Healthy Fats (Hormone balance)
                  </span>
                  <span className="font-mono font-semibold">30%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-700 h-2 rounded-full w-[30%]"></div>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 mt-4 italic">
                Ratios dynamically calibrate based on individual meals.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
