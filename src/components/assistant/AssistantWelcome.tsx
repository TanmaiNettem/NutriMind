import React from 'react';
import { Utensils, PieChart, Sparkles, Target, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AssistantWelcomeProps {
  onSelectPrompt: (prompt: string) => void;
}

export const AssistantWelcome: React.FC<AssistantWelcomeProps> = ({ onSelectPrompt }) => {
  const { user } = useAuth();
  
  // Extract a clean display first name
  const displayName = user?.displayName
    ? user.displayName.split(' ')[0]
    : user?.email
    ? user.email.split('@')[0]
    : 'there';

  const actionCards = [
    {
      icon: Utensils,
      title: 'Log a meal',
      desc: 'Tell me what you ate.',
      prompt: 'I had two idlis and sambar with a cup of filter coffee.',
      color: 'emerald'
    },
    {
      icon: PieChart,
      title: "Check today's nutrition",
      desc: 'See your current calories and macros.',
      prompt: 'What have I eaten today and what are my current macros?',
      color: 'blue'
    },
    {
      icon: Sparkles,
      title: 'Improve my meal',
      desc: 'Ask how to make a meal more balanced.',
      prompt: 'Was my lunch balanced and how can I improve it?',
      color: 'amber'
    },
    {
      icon: Target,
      title: 'What should I focus on?',
      desc: 'Find your current nutrition priorities.',
      prompt: 'What should I focus on today based on what I have eaten?',
      color: 'purple'
    }
  ];

  const quickStarters = [
    'What did I eat today?',
    'I had dosa and eggs for breakfast.',
    'How much protein have I had?',
    'Was my lunch balanced?',
    'What should I focus on today?',
    'What can I eat for dinner?'
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Friendly Persona Welcome */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs mb-1">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Hi, {displayName} 👋
        </h2>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
          I'm your NutriMind nutrition assistant. Tell me what you've eaten, ask about your nutrition, or let me help you plan your next meal.
        </p>
      </div>

      {/* 4 Primary Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {actionCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(card.prompt)}
              className="text-left p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-emerald-500 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100/70 border border-emerald-100 flex items-center justify-center text-emerald-800 transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all mt-1" />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-emerald-900 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-snug">
                  {card.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Suggested Conversation Starters */}
      <div className="pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 text-center sm:text-left">
          Suggested Questions & Prompts
        </p>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {quickStarters.map((starter, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelectPrompt(starter)}
              className="px-3.5 py-2 rounded-xl bg-stone-100/90 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-stone-200/80 text-xs font-medium text-stone-700 transition-all cursor-pointer shadow-2xs text-left"
            >
              {starter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
