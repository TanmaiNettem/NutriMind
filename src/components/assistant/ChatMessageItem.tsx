import React from 'react';
import {
  Bot,
  User,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  PieChart,
  Lightbulb,
  Info
} from 'lucide-react';
import { ChatMessage, MealAnalysisResult } from '../../types';
import { MealAnalysis } from '../dashboard/MealAnalysis';
import { ThinkingIndicator } from './ThinkingIndicator';

interface ChatMessageItemProps {
  message: ChatMessage;
  onCorrectMeal?: (meal: MealAnalysisResult) => void;
  onDeleteMeal?: (mealId: string) => void;
  onRetrySave?: (meal: MealAnalysisResult) => void;
  onSelectPrompt?: (prompt: string) => void;
  isLast?: boolean;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onCorrectMeal,
  onDeleteMeal,
  onRetrySave,
  onSelectPrompt,
  isLast = false
}) => {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end items-end gap-2.5 animate-fadeIn">
        <div className="max-w-xl sm:max-w-2xl bg-emerald-950 text-white rounded-3xl rounded-br-xs px-5 py-3.5 text-sm sm:text-base leading-relaxed shadow-xs">
          <p className="whitespace-pre-wrap">{message.text}</p>
          <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-emerald-300/70">
            <span>
              {message.timestamp instanceof Date
                ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Just now'}
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center text-stone-700 flex-shrink-0 text-xs font-bold">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Assistant response
  if (message.isProcessing) {
    return <ThinkingIndicator stage={message.stage} />;
  }

  return (
    <div className="flex items-start gap-3 max-w-3xl animate-fadeIn space-y-3">
      <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-white flex-shrink-0 shadow-xs mt-1">
        <Bot className="w-4 h-4" />
      </div>

      <div className="flex-1 space-y-4">
        {/* Assistant Speech Bubble */}
        {message.text && (
          <div className="bg-white rounded-3xl rounded-tl-xs px-5 py-4 border border-stone-200/90 shadow-2xs text-stone-800 text-sm sm:text-base leading-relaxed">
            {/* Response Type Badges */}
            {message.responseType && message.responseType !== 'meal_analysis' && (
              <div className="mb-2">
                {message.responseType === 'daily_summary' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-full">
                    <PieChart className="w-3 h-3" />
                    Daily Summary
                  </span>
                )}
                {message.responseType === 'nutrition_question' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Nutrition Insight
                  </span>
                )}
                {message.responseType === 'meal_feedback' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                    <Lightbulb className="w-3 h-3" />
                    Meal Feedback
                  </span>
                )}
                {message.responseType === 'meal_suggestion' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 border border-purple-200/70 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Meal Suggestion
                  </span>
                )}
                {message.responseType === 'out_of_scope' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full">
                    <Info className="w-3 h-3" />
                    Nutrition Scope
                  </span>
                )}
              </div>
            )}

            <p className="whitespace-pre-wrap">{message.text}</p>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-2.5 text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                NutriMind AI
              </span>
              <span>
                {message.timestamp instanceof Date
                  ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : 'Just now'}
              </span>
            </div>
          </div>
        )}

        {/* Structured Meal Analysis Card */}
        {message.analysis && (
          <MealAnalysis
            analysis={message.analysis}
            onCorrect={onCorrectMeal}
            onDelete={onDeleteMeal}
            onRetrySave={onRetrySave}
            isLatest={isLast}
          />
        )}

        {/* Suggested Follow-up chips */}
        {message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && onSelectPrompt && (
          <div className="pt-1 flex flex-wrap gap-2">
            {message.suggestedFollowUps.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectPrompt(prompt)}
                className="text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 rounded-xl px-3 py-1.5 transition-all cursor-pointer shadow-2xs text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
