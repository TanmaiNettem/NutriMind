import React from 'react';
import { Sparkles } from 'lucide-react';

interface QuickExamplesProps {
  onSelectExample: (text: string) => void;
  disabled?: boolean;
}

interface ExampleItem {
  mealType: string;
  query: string;
}

const EXAMPLES: ExampleItem[] = [
  {
    mealType: 'Breakfast',
    query: 'I had 2 idlis, sambar and an egg'
  },
  {
    mealType: 'Lunch',
    query: 'I had rice, dal, vegetables and curd'
  },
  {
    mealType: 'Snack',
    query: 'I had a banana and a handful of almonds'
  },
  {
    mealType: 'Dinner',
    query: 'I had chapatis with chicken curry'
  }
];

export const QuickExamples: React.FC<QuickExamplesProps> = ({
  onSelectExample,
  disabled = false
}) => {
  return (
    <div className="pt-2">
      <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Quick meal inspirations (click to fill):</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((item, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelectExample(item.query)}
            className="group text-left text-xs bg-stone-50 hover:bg-emerald-50 border border-stone-200/80 hover:border-emerald-300 rounded-xl px-3 py-1.5 transition-all text-stone-700 hover:text-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-bold text-stone-900 group-hover:text-emerald-800 mr-1.5">
              {item.mealType}:
            </span>
            <span className="text-stone-600 group-hover:text-emerald-900">"{item.query}"</span>
          </button>
        ))}
      </div>
    </div>
  );
};
