import React from 'react';
import { Flame, Beef, Wheat, Droplets, Sparkles, Utensils } from 'lucide-react';
import { MacroTotals } from '../../types';

interface NutritionSummaryProps {
  totals: MacroTotals;
  mealsCount: number;
  onFocusInput?: () => void;
}

export const NutritionSummary: React.FC<NutritionSummaryProps> = ({
  totals,
  mealsCount,
  onFocusInput
}) => {
  const hasMeals = mealsCount > 0;

  // Calculate macro distribution percentages (protein/carbs/fat) for visual bar
  const totalMacroGrams = totals.protein + totals.carbs + totals.fat;
  const proteinPercent = totalMacroGrams > 0 ? Math.round((totals.protein / totalMacroGrams) * 100) : 0;
  const carbsPercent = totalMacroGrams > 0 ? Math.round((totals.carbs / totalMacroGrams) * 100) : 0;
  const fatPercent = totalMacroGrams > 0 ? 100 - proteinPercent - carbsPercent : 0;

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
            Session Summary
          </span>
          <h2 className="text-lg font-bold text-stone-900 mt-1">Today's Nutrition</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-100">
          <Utensils className="w-3.5 h-3.5 text-emerald-600" />
          <span>{mealsCount} {mealsCount === 1 ? 'meal' : 'meals'}</span>
        </div>
      </div>

      {/* Prominent Calories Display */}
      <div className="bg-gradient-to-br from-stone-50 to-emerald-50/40 rounded-2xl p-5 border border-emerald-100/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wide">
            <Flame className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
            <span>Total Energy</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {totals.calories.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-stone-500">kcal</span>
          </div>
        </div>
        {hasMeals ? (
          <span className="text-xs font-medium text-emerald-700 bg-white/80 border border-emerald-200/60 px-2.5 py-1 rounded-full shadow-2xs">
            Dynamic Total
          </span>
        ) : (
          <span className="text-xs text-stone-400 italic">No entries</span>
        )}
      </div>

      {/* Macronutrient Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Protein */}
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
            <Beef className="w-3.5 h-3.5 text-emerald-700" />
            <span>Protein</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-stone-900">{totals.protein}</span>
            <span className="text-xs text-stone-500 font-medium">g</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-400">
            {hasMeals ? `${proteinPercent}% of macro energy` : '0%'}
          </div>
        </div>

        {/* Carbohydrates */}
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
            <Wheat className="w-3.5 h-3.5 text-amber-600" />
            <span>Carbs</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-stone-900">{totals.carbs}</span>
            <span className="text-xs text-stone-500 font-medium">g</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-400">
            {hasMeals ? `${carbsPercent}% of macro energy` : '0%'}
          </div>
        </div>

        {/* Fat */}
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
            <Droplets className="w-3.5 h-3.5 text-rose-600" />
            <span>Fat</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-stone-900">{totals.fat}</span>
            <span className="text-xs text-stone-500 font-medium">g</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-400">
            {hasMeals ? `${fatPercent}% of macro energy` : '0%'}
          </div>
        </div>

        {/* Fiber */}
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Fiber</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-stone-900">{totals.fiber}</span>
            <span className="text-xs text-stone-500 font-medium">g</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-400">
            {hasMeals ? 'Digestive wellness' : '0 g'}
          </div>
        </div>
      </div>

      {/* Visual Macro Distribution Ratio */}
      {hasMeals && totalMacroGrams > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-stone-500 font-medium">
            <span>Macro Distribution</span>
            <span>{totalMacroGrams}g Total</span>
          </div>
          <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-600 h-full transition-all duration-500"
              style={{ width: `${proteinPercent}%` }}
              title={`Protein: ${proteinPercent}%`}
            />
            <div
              className="bg-amber-500 h-full transition-all duration-500"
              style={{ width: `${carbsPercent}%` }}
              title={`Carbs: ${carbsPercent}%`}
            />
            <div
              className="bg-rose-500 h-full transition-all duration-500"
              style={{ width: `${fatPercent}%` }}
              title={`Fat: ${fatPercent}%`}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" /> Protein ({proteinPercent}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Carbs ({carbsPercent}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Fat ({fatPercent}%)
            </span>
          </div>
        </div>
      )}

      {/* Empty State Banner if no meals */}
      {!hasMeals && (
        <div className="text-center p-4 rounded-2xl bg-stone-50 border border-dashed border-stone-200">
          <p className="text-xs text-stone-600 font-medium">
            Add your first meal to start your nutrition summary.
          </p>
          {onFocusInput && (
            <button
              type="button"
              onClick={onFocusInput}
              className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Start analyzing &rarr;
            </button>
          )}
        </div>
      )}
    </div>
  );
};
