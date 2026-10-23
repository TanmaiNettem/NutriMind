import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  // Extract clean first name
  const rawName = user?.displayName || user?.email?.split('@')[0] || '';
  const firstName = rawName.trim().split(' ')[0];
  const greeting = firstName ? `Good to see you, ${firstName}` : 'Good to see you';

  // Format today's date (e.g., "Thursday, Sep 10, 2026")
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Nutrition Companion</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {greeting}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-1">
          Tell me what you ate today, and I'll help you understand it.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 text-xs sm:text-sm font-medium shadow-2xs">
        <Calendar className="w-4 h-4 text-emerald-600" />
        <span>{todayFormatted}</span>
      </div>
    </div>
  );
};
