import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp, Loader2, CheckCircle2 } from 'lucide-react';
import { QuickExamples } from './QuickExamples';

interface MealInputProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
  processingStage?: 'understanding' | 'breaking_down' | 'estimating' | 'complete';
  activeCorrectionMealName?: string | null;
  onCancelCorrection?: () => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export const MealInput: React.FC<MealInputProps> = ({
  onSubmit,
  isLoading,
  processingStage = 'understanding',
  activeCorrectionMealName,
  onCancelCorrection,
  inputRef: externalRef
}) => {
  const [text, setText] = useState('');
  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaRef = externalRef || internalRef;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [text]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isLoading) return;
    const query = text.trim();
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    await onSubmit(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSelectExample = (exampleText: string) => {
    setText(exampleText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const stageMessages = {
    understanding: 'Understanding your meal...',
    breaking_down: 'Breaking down ingredients & portions...',
    estimating: 'Estimating nutrition & macros...',
    complete: 'Analysis complete!'
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {activeCorrectionMealName ? `Update: ${activeCorrectionMealName}` : 'What did you eat?'}
          </h2>
          {activeCorrectionMealName && onCancelCorrection && (
            <button
              type="button"
              onClick={onCancelCorrection}
              className="text-xs text-stone-500 hover:text-stone-800 underline font-medium"
            >
              Cancel update
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          {activeCorrectionMealName
            ? 'Describe any change or additions (e.g. "I had 3 chapatis, not 2" or "Also had a banana").'
            : 'Describe your meal naturally. No complicated food database required.'}
        </p>
      </div>

      {/* Input / Composer */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`rounded-2xl border transition-all p-3 sm:p-4 bg-stone-50/50 ${
            isLoading
              ? 'border-emerald-300 ring-2 ring-emerald-100 bg-emerald-50/20'
              : 'border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 bg-white'
          }`}
        >
          <textarea
            ref={textareaRef}
            id="meal-description-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={3}
            placeholder={
              activeCorrectionMealName
                ? 'Example: The chicken was only 80 grams, and I had 3 chapatis...'
                : 'Example: I had two chapatis, chicken curry and a bowl of curd...'
            }
            className="w-full bg-transparent resize-none border-none outline-none text-stone-900 placeholder:text-stone-400 text-sm sm:text-base leading-relaxed disabled:opacity-60"
            aria-label="Describe what you ate"
          />

          <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-2">
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              Press <kbd className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">Enter</kbd> to analyze,{' '}
              <kbd className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">Shift + Enter</kbd> for new line
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="submit"
                id="btn-analyze-meal"
                disabled={isLoading || !text.trim()}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Analyze Meal</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Processing State Indicator */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="mt-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900 animate-pulse"
          >
            <div className="flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 text-emerald-700 animate-spin flex-shrink-0" />
              <span className="font-medium">{stageMessages[processingStage]}</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold uppercase tracking-wider hidden sm:inline">
              AI Powered
            </span>
          </div>
        )}
      </form>

      {/* Quick Inspiration Examples */}
      {!activeCorrectionMealName && (
        <QuickExamples onSelectExample={handleSelectExample} disabled={isLoading} />
      )}
    </div>
  );
};
