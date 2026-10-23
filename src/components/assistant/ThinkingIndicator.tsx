import React from 'react';
import { Bot, Loader2, Sparkles } from 'lucide-react';

interface ThinkingIndicatorProps {
  stage?: 'understanding' | 'breaking_down' | 'estimating' | 'complete';
}

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  stage = 'understanding'
}) => {
  const stageLabels = {
    understanding: 'Understanding your meal & context...',
    breaking_down: 'Decomposing ingredients & portions...',
    estimating: 'Estimating macronutrients & calories...',
    complete: 'Finishing up response...'
  };

  return (
    <div className="flex items-start gap-3 max-w-2xl animate-fadeIn">
      <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
        <Bot className="w-4 h-4 animate-pulse" />
      </div>

      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3.5 border border-emerald-100 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
          <Loader2 className="w-3.5 h-3.5 text-emerald-700 animate-spin" />
          <span>{stageLabels[stage]}</span>
        </div>

        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="text-[11px] text-stone-400 ml-1.5 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            NutriMind thinking
          </span>
        </div>
      </div>
    </div>
  );
};
