import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Flame, 
  Dumbbell, 
  Wheat, 
  Droplet, 
  CheckCircle2, 
  Info, 
  CornerDownRight, 
  Leaf,
  Layers
} from 'lucide-react';
import { PREVIEW_CONVERSATION } from '../data/mockData';

interface ProductPreviewProps {
  onInteractivePromptClick: () => void;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({ onInteractivePromptClick }) => {
  const [typedInput, setTypedInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInteractivePromptClick();
  };

  return (
    <section id="product-preview" className="py-20 bg-stone-50/60 border-t border-stone-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
            Interface Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Natural Conversation. Instant Nutritional Clarity.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3">
            Preview how NutriMind will interpret everyday meals, break down ingredients, and provide constructive suggestions.
          </p>
        </div>

        {/* The Mock AI Chat & Analysis Terminal */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden text-left">
          
          {/* Terminal Window Chrome / Header */}
          <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <span className="text-xs font-mono text-stone-400 border-l border-stone-700 pl-3">
                NutriMind AI Nutrition Log — Interactive Preview
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Static Demo Preview
              </span>
            </div>
          </div>

          {/* Chat Container */}
          <div className="p-6 sm:p-8 space-y-6 bg-[#FCFDFC]">
            
            {/* User Message Bubble */}
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-lg bg-emerald-700 text-white p-4 rounded-2xl rounded-tr-xs shadow-sm">
                <div className="flex items-center justify-between text-[11px] text-emerald-200 mb-1">
                  <span className="font-semibold">You</span>
                  <span>Dinner Log</span>
                </div>
                <p className="text-sm sm:text-base font-medium">
                  "{PREVIEW_CONVERSATION.userQuery}"
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                ME
              </div>
            </div>

            {/* AI Response Card */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Leaf className="w-4 h-4" />
              </div>

              <div className="w-full max-w-2xl bg-white border border-stone-200/90 rounded-2xl rounded-tl-xs p-5 sm:p-6 shadow-sm space-y-5">
                
                {/* AI Greeting Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm sm:text-base">
                      NutriMind AI
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      Decomposition Complete
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">Just now</span>
                </div>

                <p className="text-stone-700 text-sm font-medium">
                  {PREVIEW_CONVERSATION.aiGreeting}
                </p>

                {/* Macro Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                      <span>Calories</span>
                      <Flame className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-xl font-extrabold text-stone-900">
                      {PREVIEW_CONVERSATION.totals.calories}
                    </span>
                    <span className="text-xs text-stone-500 ml-1">kcal</span>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs text-stone-600 font-semibold mb-1">
                      <span>Protein</span>
                      <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-xl font-extrabold text-stone-900">
                      {PREVIEW_CONVERSATION.totals.protein}
                    </span>
                    <span className="text-xs text-stone-500 ml-1">g</span>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs text-stone-600 font-semibold mb-1">
                      <span>Carbs</span>
                      <Wheat className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <span className="text-xl font-extrabold text-stone-900">
                      {PREVIEW_CONVERSATION.totals.carbs}
                    </span>
                    <span className="text-xs text-stone-500 ml-1">g</span>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs text-stone-600 font-semibold mb-1">
                      <span>Fat</span>
                      <Droplet className="w-3.5 h-3.5 text-stone-500" />
                    </div>
                    <span className="text-xl font-extrabold text-stone-900">
                      {PREVIEW_CONVERSATION.totals.fat}
                    </span>
                    <span className="text-xs text-stone-500 ml-1">g</span>
                  </div>
                </div>

                {/* Identified Components */}
                <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/60">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-emerald-700" />
                      Identified Food Components
                    </span>
                    <span className="text-stone-400 font-normal">3 components found</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-700">
                    {PREVIEW_CONVERSATION.components.map((comp, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-stone-100">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-semibold text-stone-800">{comp.name}</span>
                          <span className="text-stone-400 text-[11px]">({comp.portion})</span>
                        </div>
                        <span className="font-mono text-stone-600 text-[11px] font-medium">
                          {comp.calories} kcal • {comp.protein}g P • {comp.carbs}g C • {comp.fat}g F
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Insight Callout */}
                <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/80 p-4">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                        {PREVIEW_CONVERSATION.quickInsight.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-relaxed font-medium">
                        "{PREVIEW_CONVERSATION.quickInsight.text}"
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Interactive Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-5 bg-stone-100/70 border-t border-stone-200 flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Try typing: 'Two boiled eggs, avocado toast and black coffee'..."
                className="w-full bg-white text-stone-800 text-sm px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-stone-400"
              />
              <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                Interactive Demo
              </span>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all hover:shadow"
            >
              <span>Analyze</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
