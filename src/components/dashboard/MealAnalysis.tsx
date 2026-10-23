import React, { useState } from 'react';
import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  Edit3,
  Layers,
  HelpCircle,
  Trash2,
  CheckCircle2,
  Cloud,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { MealAnalysisResult } from '../../types';

interface MealAnalysisProps {
  analysis: MealAnalysisResult;
  onCorrect?: (meal: MealAnalysisResult) => void;
  onDelete?: (mealId: string) => void;
  onRetrySave?: (meal: MealAnalysisResult) => void;
  isLatest?: boolean;
}

export const MealAnalysis: React.FC<MealAnalysisProps> = ({
  analysis,
  onCorrect,
  onDelete,
  onRetrySave,
  isLatest = false
}) => {
  // State to track which food items have their raw components expanded
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({
    0: true // Default first item open
  });

  // State for lightweight deletion confirmation
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);

  const toggleExpand = (idx: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const expandAll = () => {
    const next: Record<number, boolean> = {};
    analysis.foods.forEach((_, i) => (next[i] = true));
    setExpandedItems(next);
  };

  const collapseAll = () => {
    setExpandedItems({});
  };

  const isAllExpanded = analysis.foods.every((_, i) => !!expandedItems[i]);

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && analysis.id) {
      onDelete(analysis.id);
    }
    setIsConfirmingDelete(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-xs space-y-6 transition-all ${
        isLatest ? 'border-emerald-300 ring-2 ring-emerald-100/70' : 'border-stone-200/80'
      }`}
    >
      {/* Card Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
              {analysis.mealType}
            </span>
            {analysis.isCorrection && (
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                Updated Estimate
              </span>
            )}

            {/* Cloud Save Status Indicator */}
            {analysis.saveStatus === 'saved' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Saved to Cloud</span>
              </span>
            )}
            {analysis.saveStatus === 'saving' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin text-amber-600" />
                <span>Saving...</span>
              </span>
            )}
            {analysis.saveStatus === 'error' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3 text-rose-600" />
                <span>Not saved</span>
              </span>
            )}

            <span className="text-xs text-stone-400">
              {analysis.timestamp || 'Today'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            {analysis.mealName}
          </h3>
          <p className="text-xs text-stone-500 italic mt-0.5">
            "{analysis.userInput}"
          </p>
        </div>

        {/* Action Controls: Edit, Delete Confirmation, Retry Save */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          {/* Retry Save Button if in error state */}
          {analysis.saveStatus === 'error' && onRetrySave && (
            <button
              type="button"
              onClick={() => onRetrySave(analysis)}
              className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Save</span>
            </button>
          )}

          {/* Edit / Correct Meal */}
          {onCorrect && (
            <button
              type="button"
              onClick={() => onCorrect(analysis)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-700 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Correct / Edit</span>
            </button>
          )}

          {/* Delete Action with Lightweight Confirmation */}
          {onDelete && (
            <div>
              {isConfirmingDelete ? (
                <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl">
                  <span className="text-xs font-semibold text-rose-900">Delete this meal?</span>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelDelete}
                    className="text-xs font-medium text-stone-600 hover:text-stone-900 px-1.5 py-0.5 rounded-md hover:bg-stone-200/60 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="inline-flex items-center gap-1 text-xs font-medium text-stone-400 hover:text-rose-600 bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-200 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                  title="Delete meal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Prominent Macro Summary Section */}
      <div className="bg-stone-50/70 rounded-2xl p-5 border border-stone-200/60 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Estimated Nutrition
          </span>
          <span className="text-[11px] text-stone-400 italic">
            Approximate values
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Calories */}
          <div className="col-span-2 sm:col-span-1 bg-white rounded-xl p-3.5 border border-emerald-100 shadow-2xs">
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 uppercase">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              <span>Calories</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-2xl font-black text-stone-900 tracking-tight">
                ~{analysis.totals.calories}
              </span>
              <span className="text-xs text-stone-500 font-medium">kcal</span>
            </div>
          </div>

          {/* Protein */}
          <div className="bg-white rounded-xl p-3.5 border border-stone-200/70 shadow-2xs">
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-700">
              <Beef className="w-3.5 h-3.5" />
              <span>Protein</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-xl font-bold text-stone-900">
                ~{analysis.totals.protein}
              </span>
              <span className="text-xs text-stone-500 font-medium">g</span>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-white rounded-xl p-3.5 border border-stone-200/70 shadow-2xs">
            <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
              <Wheat className="w-3.5 h-3.5" />
              <span>Carbs</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-xl font-bold text-stone-900">
                ~{analysis.totals.carbs}
              </span>
              <span className="text-xs text-stone-500 font-medium">g</span>
            </div>
          </div>

          {/* Fat */}
          <div className="bg-white rounded-xl p-3.5 border border-stone-200/70 shadow-2xs">
            <div className="flex items-center gap-1 text-xs font-bold text-rose-700">
              <Droplets className="w-3.5 h-3.5" />
              <span>Fat</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-xl font-bold text-stone-900">
                ~{analysis.totals.fat}
              </span>
              <span className="text-xs text-stone-500 font-medium">g</span>
            </div>
          </div>

          {/* Fiber */}
          <div className="bg-white rounded-xl p-3.5 border border-stone-200/70 shadow-2xs">
            <div className="flex items-center gap-1 text-xs font-bold text-teal-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fiber</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-xl font-bold text-stone-900">
                ~{analysis.totals.fiber}
              </span>
              <span className="text-xs text-stone-500 font-medium">g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clarification Notice if required */}
      {analysis.clarificationQuestion && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Clarification note: </span>
            <span>{analysis.clarificationQuestion}</span>
          </div>
        </div>
      )}

      {/* Food Component Breakdown ("What's in your meal?") */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
              What's in your meal?
            </h4>
          </div>
          <button
            type="button"
            onClick={isAllExpanded ? collapseAll : expandAll}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
          >
            {isAllExpanded ? 'Collapse components' : 'Expand all components'}
          </button>
        </div>

        <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200/70 overflow-hidden bg-white">
          {analysis.foods.map((food, idx) => {
            const isExpanded = !!expandedItems[idx];
            return (
              <div key={idx} className="transition-colors hover:bg-stone-50/50">
                {/* Header row for food item */}
                <button
                  type="button"
                  onClick={() => toggleExpand(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm sm:text-base">
                        {food.name}
                      </span>
                      <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        {food.estimatedPortion}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 flex items-center gap-2 pt-0.5">
                      <span>P: {food.protein}g</span>
                      <span>•</span>
                      <span>C: {food.carbs}g</span>
                      <span>•</span>
                      <span>F: {food.fat}g</span>
                      <span>•</span>
                      <span>Fiber: {food.fiber}g</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-stone-800 text-sm">
                      ~{food.calories} kcal
                    </span>
                    <div className="p-1 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expandable Likely Raw Components */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-emerald-50/30 border-t border-dashed border-emerald-100/70">
                    <div className="text-xs font-semibold text-emerald-900 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Likely Raw Components & Ingredients:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {food.rawComponents && food.rawComponents.length > 0 ? (
                        food.rawComponents.map((comp, cIdx) => (
                          <span
                            key={cIdx}
                            className="inline-flex items-center text-xs bg-white text-stone-700 px-2.5 py-1 rounded-lg border border-emerald-200/80 shadow-2xs font-medium"
                          >
                            {comp}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-stone-400 italic">
                          Standard single ingredient
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Nutrition Insight Section */}
      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Quick Nutrition Insight</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
          {analysis.nutritionInsight}
        </p>

        {/* Focus Areas */}
        {analysis.focusAreas && analysis.focusAreas.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-emerald-900">Focus Areas:</span>
            {analysis.focusAreas.map((area, aIdx) => (
              <span
                key={aIdx}
                className="text-xs bg-white/90 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Estimation Notes (Assumptions) */}
      {analysis.assumptions && analysis.assumptions.length > 0 && (
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wide">
            <Info className="w-3.5 h-3.5 text-stone-500" />
            <span>Estimation Notes & Assumptions</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-stone-600 leading-relaxed">
            {analysis.assumptions.map((note, nIdx) => (
              <li key={nIdx}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
