import React from 'react';
import { Utensils, ChevronRight, Clock, Trash2 } from 'lucide-react';
import { MealAnalysisResult } from '../../types';

interface MealHistoryProps {
  meals: MealAnalysisResult[];
  activeMealId?: string | null;
  onSelectMeal: (meal: MealAnalysisResult) => void;
  onClearHistory?: () => void;
}

export const MealHistory: React.FC<MealHistoryProps> = ({
  meals,
  activeMealId,
  onSelectMeal,
  onClearHistory
}) => {
  if (meals.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span>Today's Meals</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {meals.length} {meals.length === 1 ? 'entry' : 'entries'} in this session
          </p>
        </div>

        {onClearHistory && (
          <button
            type="button"
            onClick={onClearHistory}
            className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-rose-600 font-medium transition-colors cursor-pointer"
            title="Clear in-memory session meals"
          >
            <Trash2 className="w-3 h-3" />
            <span>Reset session</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {meals.map((meal) => {
          const isActive = meal.id === activeMealId;
          return (
            <button
              key={meal.id}
              type="button"
              onClick={() => onSelectMeal(meal)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                isActive
                  ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-100'
                  : 'bg-stone-50/70 hover:bg-stone-100/80 border-stone-200/70'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-white border border-emerald-200 px-2 py-0.5 rounded-md">
                    {meal.mealType}
                  </span>
                  <span className="text-[11px] text-stone-400 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {meal.timestamp}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                  {meal.mealName}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                  <span>~{meal.totals.calories} kcal</span>
                  <span>•</span>
                  <span>{meal.totals.protein}g protein</span>
                  <span>•</span>
                  <span>{meal.totals.fiber}g fiber</span>
                </div>
              </div>

              <ChevronRight
                className={`w-4 h-4 flex-shrink-0 transition-transform ${
                  isActive ? 'text-emerald-700 translate-x-0.5' : 'text-stone-400'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
