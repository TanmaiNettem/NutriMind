import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2, Sparkles, X, RotateCcw } from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';

interface ChatComposerProps {
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({ inputRef: externalRef }) => {
  const {
    processUserMessage,
    isLoading,
    activeCorrectionMeal,
    setActiveCorrectionMeal,
    meals
  } = useNutrition();

  const [text, setText] = useState('');
  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaRef = externalRef || internalRef;

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = text.trim();
    if (!query || isLoading) return;
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    await processUserMessage(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setText(promptText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const quickPrompts = [
    { label: 'Log a meal', prompt: 'I had two idlis and sambar' },
    { label: 'How am I doing today?', prompt: 'What have I eaten today?' },
    { label: 'Check my protein', prompt: 'How much protein have I had today?' },
    { label: 'What should I focus on?', prompt: 'What should I focus on today?' },
    {
      label: 'Improve last meal',
      prompt: meals.length > 0 ? `Was my ${meals[0].mealName} balanced?` : 'How can I make my meals more balanced?'
    }
  ];

  return (
    <div className="p-3 sm:p-5 bg-white border-t border-stone-200/80 space-y-3">
      {/* Active Correction Banner */}
      {activeCorrectionMeal && (
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
            <span>
              <strong>Updating:</strong> {activeCorrectionMeal.mealName}. Describe your correction below.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveCorrectionMeal(null)}
            className="p-1 hover:bg-amber-100 rounded text-amber-700 hover:text-amber-950 transition-colors"
            title="Cancel correction"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Suggestions Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex-shrink-0 mr-1 hidden sm:inline">
          Quick:
        </span>
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickPrompt(item.prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-lg bg-stone-100/80 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200/60 text-stone-600 text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer disabled:opacity-50"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`rounded-2xl border transition-all p-3 sm:p-3.5 bg-stone-50/50 ${
            isLoading
              ? 'border-emerald-300 ring-2 ring-emerald-100 bg-emerald-50/20'
              : 'border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 bg-white'
          }`}
        >
          <textarea
            ref={textareaRef}
            id="assistant-chat-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={2}
            placeholder={
              activeCorrectionMeal
                ? `Example: The chicken was only 80g, and I had 3 chapatis...`
                : `Tell me what you ate or ask me anything about your nutrition...`
            }
            className="w-full bg-transparent resize-none border-none outline-none text-stone-900 placeholder:text-stone-400 text-sm sm:text-base leading-relaxed disabled:opacity-60"
            aria-label="Ask nutrition assistant or log a meal"
          />

          <div className="flex items-center justify-between pt-1.5 border-t border-stone-100 mt-1">
            <span className="text-[11px] text-stone-400">
              <span className="hidden sm:inline">Enter to send, Shift+Enter for new line • </span>
              Nutrition estimates are approximate.
            </span>

            <button
              type="submit"
              id="btn-send-assistant-message"
              disabled={isLoading || !text.trim()}
              className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs flex-shrink-0 ml-2"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
