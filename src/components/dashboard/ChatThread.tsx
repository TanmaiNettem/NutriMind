import React from 'react';
import { User, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import { ChatMessage, MealAnalysisResult } from '../../types';
import { MealAnalysis } from './MealAnalysis';

interface ChatThreadProps {
  messages: ChatMessage[];
  onCorrectMeal: (meal: MealAnalysisResult) => void;
  onRetry?: () => void;
  errorMessage?: string | null;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  messages,
  onCorrectMeal,
  onRetry,
  errorMessage
}) => {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => {
        const isUser = message.sender === 'user';
        const isLast = index === messages.length - 1;

        if (isUser) {
          return (
            <div key={message.id} className="flex items-start gap-3 max-w-2xl ml-auto justify-end">
              <div className="bg-emerald-800 text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-2xs text-left">
                <div className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                  You
                </div>
                <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            </div>
          );
        }

        // Assistant Message
        return (
          <div key={message.id} className="flex items-start gap-3 max-w-full mr-auto text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="flex-1 space-y-4">
              {/* Conversational Text Bubble */}
              <div className="bg-white border border-stone-200/80 rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs inline-block max-w-2xl">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  NutriMind
                </div>
                <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
                  {message.text}
                </p>
              </div>

              {/* Render Structured Meal Analysis if attached */}
              {message.analysis && (
                <MealAnalysis
                  analysis={message.analysis}
                  onCorrect={onCorrectMeal}
                  isLatest={isLast}
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Error state if request failed */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start justify-between gap-3 text-sm">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Unable to analyze meal</p>
              <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-100/50 shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
