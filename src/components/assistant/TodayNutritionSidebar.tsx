import React, { useState } from 'react';
import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Sparkles,
  Utensils,
  Target,
  Clock,
  X,
  Trash2,
  Edit3,
  RefreshCw,
  Cloud,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';
import { MealAnalysisResult } from '../../types';

interface TodayNutritionSidebarProps {
  onCloseMobile?: () => void;
  onFocusInput?: () => void;
}

export const TodayNutritionSidebar: React.FC<TodayNutritionSidebarProps> = ({
  onCloseMobile,
  onFocusInput
}) => {
  const {
    todaysMeals,
    dailyTotals,
    isInitialLoading,
    saveStatusMessage,
    setActiveCorrectionMeal,
    removeMeal,
    refreshMeals
  } = useNutrition();

  // Track which meal is currently prompting deletion confirmation
  const [deletingMealId, setDeletingMealId] = useState<string | null>(null);

  // Macro distribution percentages
  const totalMacroGrams = dailyTotals.protein + dailyTotals.carbs + dailyTotals.fat;
  const proteinPercent = totalMacroGrams > 0 ? Math.round((dailyTotals.protein / totalMacroGrams) * 100) : 0;
  const carbsPercent = totalMacroGrams > 0 ? Math.round((dailyTotals.carbs / totalMacroGrams) * 100) : 0;
  const fatPercent = totalMacroGrams > 0 ? Math.max(0, 100 - proteinPercent - carbsPercent) : 0;

  // Dynamic clinical priority recommendation
  const getDynamicFocus = () => {
    if (todaysMeals.length === 0) {
      return {
        title: 'Start by logging your first meal',
        desc: 'Describe what you had for breakfast or lunch to unlock dynamic daily insights.'
      };
    }
    if (dailyTotals.fiber < 12) {
      return {
        title: 'Prioritize fiber & roughage',
        desc: 'Consider adding whole grains, lentils, fresh salad, or chia seeds to your upcoming meal.'
      };
    }
    if (dailyTotals.protein < 40) {
      return {
        title: 'Lean protein boost recommended',
        desc: 'Lentils, eggs, Greek yogurt, or paneer will help maintain satiety and muscle preservation.'
      };
    }
    return {
      title: 'Steady balance achieved',
      desc: 'Your macros are well distributed. Keep up steady water intake throughout the afternoon.'
    };
  };

  const focus = getDynamicFocus();

  return (
    <aside className="w-full h-full bg-stone-50/70 border-l border-stone-200/80 p-5 sm:p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                Cloud Sync
              </span>
              <Cloud className="w-3 h-3 text-emerald-600" />
            </div>
            <h2 className="text-base font-extrabold text-stone-900 mt-1">
              Today's Nutrition
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {!isInitialLoading && (
              <span className="text-xs font-semibold text-stone-500 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                {todaysMeals.length} {todaysMeals.length === 1 ? 'meal' : 'meals'}
              </span>
            )}
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Subtle Save / Sync Status Notification Banner */}
        {saveStatusMessage && (
          <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 animate-fadeIn">
            <div className="flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span className="font-medium">{saveStatusMessage}</span>
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {isInitialLoading ? (
          <div className="py-12 text-center space-y-3 bg-white rounded-2xl border border-stone-200/70 p-6">
            <RefreshCw className="w-6 h-6 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-bold text-stone-800">
              Loading your nutrition history...
            </p>
            <p className="text-xs text-stone-500">
              Retrieving your saved meals from Cloud Firestore.
            </p>
          </div>
        ) : (
          <>
            {/* Total Calories Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                <Flame className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>Total Energy Today</span>
              </div>
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-3xl font-black text-stone-900 tracking-tight">
                  ~{dailyTotals.calories}
                </span>
                <span className="text-sm text-stone-500 font-semibold">kcal</span>
              </div>
              <p className="text-[11px] text-stone-400 italic pt-0.5">
                Calculated deterministically from today's saved meals
              </p>
            </div>

            {/* Macronutrient Distribution Bars */}
            <div className="space-y-3 bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                <span>Macronutrient Breakdown</span>
                <span className="text-stone-400 font-normal">
                  {totalMacroGrams}g total
                </span>
              </div>

              {/* Progress split bar */}
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${proteinPercent}%` }}
                  className="bg-emerald-600 transition-all duration-300"
                  title={`Protein: ${proteinPercent}%`}
                />
                <div
                  style={{ width: `${carbsPercent}%` }}
                  className="bg-amber-500 transition-all duration-300"
                  title={`Carbs: ${carbsPercent}%`}
                />
                <div
                  style={{ width: `${fatPercent}%` }}
                  className="bg-rose-500 transition-all duration-300"
                  title={`Fat: ${fatPercent}%`}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                    <Beef className="w-3 h-3 text-emerald-700" />
                    <span>Protein</span>
                  </div>
                  <div className="text-sm font-black text-stone-900">
                    {dailyTotals.protein}g
                  </div>
                  <div className="text-[10px] text-stone-400">
                    {proteinPercent}%
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800">
                    <Wheat className="w-3 h-3 text-amber-700" />
                    <span>Carbs</span>
                  </div>
                  <div className="text-sm font-black text-stone-900">
                    {dailyTotals.carbs}g
                  </div>
                  <div className="text-[10px] text-stone-400">
                    {carbsPercent}%
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-rose-800">
                    <Droplets className="w-3 h-3 text-rose-700" />
                    <span>Fat</span>
                  </div>
                  <div className="text-sm font-black text-stone-900">
                    {dailyTotals.fat}g
                  </div>
                  <div className="text-[10px] text-stone-400">
                    {fatPercent}%
                  </div>
                </div>
              </div>

              {/* Fiber Meter */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Dietary Fiber
                </span>
                <span className="font-extrabold text-stone-900">
                  {dailyTotals.fiber}g{' '}
                  <span className="text-[10px] font-normal text-stone-400">
                    (aim for 25-30g)
                  </span>
                </span>
              </div>
            </div>

            {/* Dynamic Focus Area */}
            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wide">
                <Target className="w-3.5 h-3.5 text-emerald-700" />
                <span>Daily Priority</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-emerald-950">
                {focus.title}
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {focus.desc}
              </p>
            </div>

            {/* Logged Meals List for Today */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-stone-500" />
                  <span>Today's Meals ({todaysMeals.length})</span>
                </h3>
                {onFocusInput && (
                  <button
                    type="button"
                    onClick={onFocusInput}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    + Add Meal
                  </button>
                )}
              </div>

              {todaysMeals.length === 0 ? (
                <div className="p-5 rounded-2xl bg-white border border-dashed border-stone-300 text-center space-y-2">
                  <Utensils className="w-6 h-6 text-stone-300 mx-auto" />
                  <p className="text-xs font-bold text-stone-700">No meals logged yet.</p>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Tell NutriMind what you ate to start building your nutrition history.
                  </p>
                  {onFocusInput && (
                    <button
                      type="button"
                      onClick={onFocusInput}
                      className="mt-1 px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      Log Your First Meal
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {todaysMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="p-3 bg-white rounded-xl border border-stone-200/80 shadow-2xs hover:border-emerald-200 transition-all space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                              {meal.mealType}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {meal.timestamp || 'Today'}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-stone-900 truncate mt-0.5">
                            {meal.mealName}
                          </h4>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-black text-stone-900">
                            ~{meal.totals.calories} kcal
                          </span>
                        </div>
                      </div>

                      {/* Meal Action Footer */}
                      <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px]">
                        <span className="text-stone-400 text-[10px]">
                          P: {meal.totals.protein}g • C: {meal.totals.carbs}g • F: {meal.totals.fat}g
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Correct/Edit */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCorrectionMeal(meal);
                              if (onFocusInput) onFocusInput();
                            }}
                            className="text-stone-400 hover:text-emerald-700 p-1 rounded hover:bg-stone-100 transition-colors"
                            title="Edit / Correct portion"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>

                          {/* Delete with Confirmation */}
                          {deletingMealId === meal.id ? (
                            <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                              <span className="text-[10px] font-bold text-rose-800">Delete?</span>
                              <button
                                type="button"
                                onClick={() => {
                                  removeMeal(meal.id);
                                  setDeletingMealId(null);
                                }}
                                className="text-[10px] font-bold text-white bg-rose-600 px-1 rounded hover:bg-rose-700 cursor-pointer"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeletingMealId(null)}
                                className="text-[10px] text-stone-500 hover:text-stone-800 cursor-pointer"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeletingMealId(meal.id)}
                              className="text-stone-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors"
                              title="Delete meal"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Medical Safety & Estimation Disclaimer */}
      <div className="pt-4 border-t border-stone-200/60 text-[11px] text-stone-400 leading-relaxed">
        <p>
          <strong className="text-stone-600">Educational Guidance:</strong> Calorie and macronutrient figures are approximations based on typical culinary preparation. Not a medical diagnosis.
        </p>
      </div>
    </aside>
  );
};
