import React from 'react';
import { Activity, Clock, Compass } from 'lucide-react';
import { MealAnalysisResult } from '../../types';

interface DailyProgressProps {
  meals: MealAnalysisResult[];
}

export const DailyProgress: React.FC<DailyProgressProps> = ({ meals }) => {
  const hasMeals = meals.length > 0;

  // Meal type breakdown
  const mealTypesCount = meals.reduce(
    (acc, m) => {
      const type = m.mealType || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Today's Progress</span>
        </h2>
        {hasMeals && (
          <span className="text-xs text-stone-400 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3" />
            <span>Active session</span>
          </span>
        )}
      </div>

      {hasMeals ? (
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 text-xs text-emerald-900 flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-950">Daily Intake Pattern</p>
              <p className="text-emerald-800 mt-0.5">
                Logged {meals.length} {meals.length === 1 ? 'meal' : 'meals'} across{' '}
                {Object.keys(mealTypesCount).join(', ')}.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-700">Meals Logged</div>
            <div className="flex flex-wrap gap-2">
              {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((type) => {
                const count = mealTypesCount[type] || 0;
                const isLogged = count > 0;
                return (
                  <div
                    key={type}
                    className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-medium transition-colors ${
                      isLogged
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                        : 'bg-stone-50 border-stone-200/70 text-stone-400'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isLogged ? 'bg-emerald-600' : 'bg-stone-300'
                      }`}
                    />
                    <span>{type}</span>
                    {count > 1 && <span className="text-[10px] opacity-75">({count})</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-stone-500 pt-1 border-t border-stone-100 flex items-center justify-between">
            <span>Calorie Goal:</span>
            <span className="italic text-stone-400">Not configured (no target assumed)</span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 text-center space-y-1.5">
          <p className="text-xs font-medium text-stone-700">
            Track meals to understand your daily intake.
          </p>
          <p className="text-[11px] text-stone-500">
            NutriMind calculates your nutrition objectively without imposing arbitrary targets.
          </p>
        </div>
      )}
    </div>
  );
};
