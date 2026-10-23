import React, { useRef, useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';
import { ChatMessageItem } from './ChatMessageItem';
import { AssistantWelcome } from './AssistantWelcome';
import { MealAnalysisResult } from '../../types';

interface ChatContainerProps {
  onFocusInput?: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ onFocusInput }) => {
  const {
    messages,
    processUserMessage,
    setActiveCorrectionMeal,
    removeMeal,
    retrySaveMeal,
    errorMessage,
    retryLastMessage
  } = useNutrition();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, errorMessage]);

  const handleCorrectMeal = (meal: MealAnalysisResult) => {
    setActiveCorrectionMeal(meal);
    if (onFocusInput) {
      onFocusInput();
    }
  };

  const handleSelectPrompt = async (prompt: string) => {
    await processUserMessage(prompt);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
      {messages.length === 0 ? (
        <AssistantWelcome onSelectPrompt={handleSelectPrompt} />
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <ChatMessageItem
              key={msg.id || idx}
              message={msg}
              onCorrectMeal={handleCorrectMeal}
              onDeleteMeal={(id) => removeMeal(id)}
              onRetrySave={(m) => retrySaveMeal(m)}
              onSelectPrompt={handleSelectPrompt}
              isLast={idx === messages.length - 1}
            />
          ))}

          {/* Error Banner with Retry */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start justify-between gap-3 text-sm animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Assistant notice</p>
                  <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={retryLastMessage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-100/50 shadow-2xs cursor-pointer flex-shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
