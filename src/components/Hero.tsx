import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Dumbbell, 
  Wheat, 
  Droplet, 
  Lightbulb, 
  Layers, 
  Info,
  Check,
  ChevronRight
} from 'lucide-react';
import { ALTERNATE_MEAL_SAMPLES } from '../data/mockData';
import { MealSample } from '../types';

interface HeroProps {
  onStartTracking: () => void;
  onHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTracking, onHowItWorks }) => {
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const activeMeal: MealSample = ALTERNATE_MEAL_SAMPLES[selectedMealIndex];

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-20 lg:pb-28">
      {/* Background Subtle Gradient Blobs */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-emerald-100/50 via-teal-50/20 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute top-1/3 -right-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Intelligent Calorie & Macro Awareness</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-stone-900 tracking-tight leading-[1.15] mb-6">
              Understand What You Eat.{' '}
              <span className="text-emerald-700 block mt-1">
                Improve How You Live.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal mb-8 max-w-xl">
              Your AI-powered nutrition companion that turns everyday meals into simple, meaningful nutrition insights.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                id="btn-hero-start-tracking"
                type="button"
                onClick={onStartTracking}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-base rounded-xl shadow-lg shadow-emerald-800/15 hover:shadow-xl hover:shadow-emerald-800/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Start Tracking</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-how-it-works"
                type="button"
                onClick={onHowItWorks}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-700 border border-stone-200 font-semibold text-base rounded-xl shadow-sm hover:border-stone-300 transition-all"
              >
                <span>How It Works</span>
              </button>
            </div>

            {/* Immediate Flow Concept: FOOD INPUT → AI ANALYSIS → NUTRITION INSIGHT */}
            <div className="pt-6 border-t border-stone-200/70">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                Seamless 3-Step Process
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-stone-700">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100/80 border border-stone-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-stone-800">Food Input</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0" />
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/70 text-emerald-900">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold">AI Analysis</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0" />
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100/80 border border-stone-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  <span className="font-semibold text-stone-800">Nutrition Insight</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visually Attractive Nutrition Dashboard Mockup */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative card frame */}
              <div className="rounded-3xl bg-white/90 backdrop-blur-sm border border-emerald-100/80 p-5 sm:p-7 shadow-xl shadow-stone-200/50 hover:shadow-2xl transition-shadow duration-300">
                
                {/* Mockup Header & Sample Badge */}
                <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full">
                      Sample / Demo Preview
                    </span>
                  </div>

                  {/* Sample meal picker */}
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-medium text-stone-600">
                    {ALTERNATE_MEAL_SAMPLES.map((meal, idx) => (
                      <button
                        key={meal.id}
                        type="button"
                        onClick={() => setSelectedMealIndex(idx)}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          selectedMealIndex === idx
                            ? 'bg-white text-stone-900 font-bold shadow-xs'
                            : 'hover:text-stone-900'
                        }`}
                        title={`Switch to ${meal.name}`}
                      >
                        Sample {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Input Bar */}
                <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3.5 mb-5 text-left">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Natural Meal Input
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Analyzed in 0.4s</span>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 italic">
                    "{activeMeal.name}"
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {activeMeal.description}
                  </p>
                </div>

                {/* Main Metrics: Calories & Key Macros */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-left">
                  {/* Calories */}
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1 text-emerald-800">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Calories</span>
                      <Flame className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                        {activeMeal.calories}
                      </span>
                      <span className="text-xs font-medium text-stone-500 ml-1">kcal</span>
                    </div>
                  </div>

                  {/* Protein */}
                  <div className="bg-stone-50 border border-stone-200/70 rounded-2xl p-3.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1 text-stone-600">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Protein</span>
                      <Dumbbell className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                        {activeMeal.protein}
                      </span>
                      <span className="text-xs font-medium text-stone-500 ml-1">g</span>
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="bg-stone-50 border border-stone-200/70 rounded-2xl p-3.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1 text-stone-600">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Carbs</span>
                      <Wheat className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                        {activeMeal.carbs}
                      </span>
                      <span className="text-xs font-medium text-stone-500 ml-1">g</span>
                    </div>
                  </div>

                  {/* Fat */}
                  <div className="bg-stone-50 border border-stone-200/70 rounded-2xl p-3.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1 text-stone-600">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Fat</span>
                      <Droplet className="w-4 h-4 text-stone-500" />
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                        {activeMeal.fat}
                      </span>
                      <span className="text-xs font-medium text-stone-500 ml-1">g</span>
                    </div>
                  </div>
                </div>

                {/* Decomposed Raw Food Components (previewing the core engine) */}
                <div className="bg-stone-50/80 rounded-2xl p-3.5 mb-5 border border-stone-200/60 text-left">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-700" />
                      Decomposed Components
                    </span>
                    <span className="text-[11px] font-normal text-stone-500">Portion breakdown</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeMeal.rawIngredients.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-stone-200/50"
                      >
                        <span className="text-stone-700 font-medium truncate max-w-[150px]">
                          {item.name}
                        </span>
                        <span className="text-stone-500 font-mono text-[11px] flex-shrink-0">
                          {item.portion} • {item.kcal} kcal
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nutrition Focus Insight Card */}
                <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50/40 border border-emerald-200/80 p-4 text-left shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-600 text-white flex-shrink-0 shadow-xs">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                          {activeMeal.focusInsight.headline}
                        </span>
                        <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                          AI Insight
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium leading-relaxed">
                        "{activeMeal.focusInsight.advice}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mockup Footer Notice */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Interactive nutritional breakdown preview
                  </span>
                  <span className="font-mono text-emerald-700 font-semibold">NutriMind v1.0</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
