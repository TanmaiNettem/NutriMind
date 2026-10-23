import React from 'react';
import { Flame, Dumbbell, Wheat, Droplet, Sprout, Info } from 'lucide-react';

export const WhatNutriMindHelpsUnderstand: React.FC = () => {
  const nutrients = [
    {
      id: 'nutrient-calories',
      name: 'Calories',
      role: 'Energy Gauge',
      icon: Flame,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200/80',
      iconColor: 'text-emerald-700',
      description: 'How much energy your meal may provide to fuel your daily movement, focus, and recovery.'
    },
    {
      id: 'nutrient-protein',
      name: 'Protein',
      role: 'Building & Repair',
      icon: Dumbbell,
      color: 'teal',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200/80',
      iconColor: 'text-teal-700',
      description: 'An important macronutrient for maintaining and supporting the body, muscle integrity, and fullness.'
    },
    {
      id: 'nutrient-carbs',
      name: 'Carbohydrates',
      role: 'Primary Fuel',
      icon: Wheat,
      color: 'amber',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200/80',
      iconColor: 'text-amber-700',
      description: 'A major source of energy in many diets, powering cerebral activity, stamina, and physical endurance.'
    },
    {
      id: 'nutrient-fat',
      name: 'Fat',
      role: 'Vital Protection',
      icon: Droplet,
      color: 'stone',
      bgColor: 'bg-stone-100',
      borderColor: 'border-stone-200',
      iconColor: 'text-stone-700',
      description: 'An essential macronutrient that contributes to energy, nutrient absorption, and other bodily functions.'
    },
    {
      id: 'nutrient-fiber',
      name: 'Fiber',
      role: 'Digestive Health',
      icon: Sprout,
      color: 'green',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200/60',
      iconColor: 'text-emerald-800',
      description: 'A key part of a balanced diet and digestive health, promoting satiety and steady blood sugar curves.'
    }
  ];

  return (
    <section id="what-nutrimind-helps-understand" className="py-20 bg-white border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Nutritional Literacy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            What NutriMind Helps You Understand
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3">
            Demystifying the foundational pillars of human nutrition in plain, actionable language.
          </p>
        </div>

        {/* Clean visual grid: 5 elements (3 on top row, 2 centered or 5 in responsive grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutrients.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-[#FBFDFB] hover:bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-2xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center ${item.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                      {item.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {item.name}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-400">
                  <Info className="w-3.5 h-3.5 text-stone-400" />
                  <span>General nutritional awareness</span>
                </div>
              </div>
            );
          })}

          {/* 6th Educational Card: Holistic Balance Context */}
          <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/50 rounded-3xl p-6 sm:p-7 border border-emerald-200/80 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                  Whole Picture
                </span>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2">
                Nutrient Harmony
              </h3>

              <p className="text-stone-700 text-sm leading-relaxed">
                Rather than obsessing over single ingredients in isolation, NutriMind looks at how your daily meals work together to create sustained vitality and energy.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs font-semibold text-emerald-800">
              Balanced variety is key to well-being
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
