import React from 'react';
import { Sparkles, Utensils, ArrowDown } from 'lucide-react';

interface EmptyNutritionStateProps {
  onStartMeal: () => void;
}

export const EmptyNutritionState: React.FC<EmptyNutritionStateProps> = ({ onStartMeal }) => {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs text-center space-y-6">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-inner">
        <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
      </div>

      <div className="max-w-md mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>NutriMind Intelligence</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
          Your nutrition story starts here.
        </h3>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Tell NutriMind what you've eaten and we'll turn it into a simple nutrition snapshot.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onStartMeal}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all hover:scale-105 cursor-pointer"
        >
          <span>Analyze Your First Meal</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100 max-w-lg mx-auto text-left">
        <div className="p-3 rounded-xl bg-stone-50 text-xs text-stone-600">
          <span className="font-bold text-stone-900 block mb-0.5">1. Describe</span>
          Speak or type in everyday words.
        </div>
        <div className="p-3 rounded-xl bg-stone-50 text-xs text-stone-600">
          <span className="font-bold text-stone-900 block mb-0.5">2. Decompose</span>
          AI unbundles raw components.
        </div>
        <div className="p-3 rounded-xl bg-stone-50 text-xs text-stone-600">
          <span className="font-bold text-stone-900 block mb-0.5">3. Understand</span>
          Clean macros and gentle insights.
        </div>
      </div>
    </div>
  );
};
