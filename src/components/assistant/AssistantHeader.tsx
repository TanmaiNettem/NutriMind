import React from 'react';
import { Sparkles, Trash2, Bot, ShieldCheck } from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';

interface AssistantHeaderProps {
  onOpenMobileSidebar?: () => void;
  onOpenMobileNutrition?: () => void;
}

export const AssistantHeader: React.FC<AssistantHeaderProps> = ({
  onOpenMobileSidebar,
  onOpenMobileNutrition
}) => {
  const { messages, clearSession, meals } = useNutrition();

  const handleClear = () => {
    if (messages.length > 0) {
      if (window.confirm('Clear your current chat conversation? Your logged meals in this session will also be reset.')) {
        clearSession();
      }
    }
  };

  return (
    <header className="px-4 sm:px-6 py-3.5 bg-white border-b border-stone-200/80 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xs">
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 -ml-1 text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-2xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-stone-900 leading-tight">
                NutriMind AI
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Assistant
              </span>
            </div>
            <p className="text-[11px] text-stone-500 leading-none mt-0.5 hidden sm:block">
              Your personal nutrition companion • Session-based memory
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onOpenMobileNutrition && (
          <button
            type="button"
            onClick={onOpenMobileNutrition}
            className="lg:hidden text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-3 py-1.5 rounded-xl hover:bg-emerald-100/70 transition-colors"
          >
            Today's Stats ({meals.length})
          </button>
        )}

        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            title="Reset session and clear conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        )}

        <div className="hidden xl:flex items-center gap-1 text-[11px] text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Non-judgmental & Educational</span>
        </div>
      </div>
    </header>
  );
};
