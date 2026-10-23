import React, { useState, useRef } from 'react';
import {
  Menu,
  Sparkles,
  Bot,
  LayoutDashboard,
  Utensils,
  BarChart3,
  Plus,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Target,
  ArrowRight,
  Layers,
  HelpCircle,
  RefreshCw,
  Cloud,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNutrition } from '../context/NutritionContext';
import { SidebarNav } from '../components/dashboard/SidebarNav';
import { TodayNutritionSidebar } from '../components/assistant/TodayNutritionSidebar';
import { ChatContainer } from '../components/assistant/ChatContainer';
import { ChatComposer } from '../components/assistant/ChatComposer';
import { AssistantHeader } from '../components/assistant/AssistantHeader';
import { MealAnalysis } from '../components/dashboard/MealAnalysis';
import { DailyProgress } from '../components/dashboard/DailyProgress';
import { DashboardTab } from '../types';

export const AppDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    activeTab,
    setActiveTab,
    meals,
    todaysMeals,
    dailyTotals,
    isInitialLoading,
    errorMessage,
    saveStatusMessage,
    setActiveCorrectionMeal,
    removeMeal,
    retrySaveMeal,
    refreshMeals
  } = useNutrition();

  // Mobile drawer states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNutritionOpen, setMobileNutritionOpen] = useState(false);

  // Focus ref for the chat composer input
  const composerInputRef = useRef<HTMLInputElement | null>(null);

  const focusChatInput = () => {
    setActiveTab('assistant');
    setTimeout(() => {
      composerInputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="flex h-screen bg-white text-stone-900 font-sans overflow-hidden">
      {/* ========================================================= */}
      {/* COLUMN 1: LEFT NAVIGATION SIDEBAR (Desktop)               */}
      {/* ========================================================= */}
      <div className="hidden md:block w-64 lg:w-72 flex-shrink-0 h-full">
        <SidebarNav onFocusInput={focusChatInput} />
      </div>

      {/* MOBILE LEFT MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10">
            <SidebarNav
              onCloseMobile={() => setMobileMenuOpen(false)}
              onFocusInput={focusChatInput}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* COLUMN 2: CENTER WORKSPACE / MAIN CONTENT                 */}
      {/* ========================================================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* Top Mobile Bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-white z-20">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-stone-900">
              NutriMind
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileNutritionOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200"
            aria-label="View Today's Nutrition"
          >
            <Flame className="w-4 h-4 text-emerald-600" />
            <span>~{dailyTotals.calories}</span>
          </button>
        </header>

        {/* Global Error Banner if data load failed */}
        {errorMessage && (
          <div className="px-5 py-3 bg-rose-50 border-b border-rose-200 text-xs text-rose-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => refreshMeals()}
              className="font-bold underline text-rose-800 hover:text-rose-950 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* TAB 1: AI ASSISTANT (PRIMARY INTERFACE) */}
        {activeTab === 'assistant' && (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <AssistantHeader onOpenMobileSummary={() => setMobileNutritionOpen(true)} />
            <ChatContainer onFocusInput={focusChatInput} />
            <ChatComposer inputRef={composerInputRef} />
          </div>
        )}

        {/* TAB 2: TODAY'S DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                  Overview
                </span>
                <h2 className="text-2xl font-black text-stone-900 mt-1">
                  Today's Nutrition Summary
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Comprehensive snapshot of your intake and current meal distribution.
                </p>
              </div>

              <button
                type="button"
                onClick={focusChatInput}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer self-start sm:self-center"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {isInitialLoading ? (
              <div className="py-16 text-center space-y-3 bg-stone-50 rounded-3xl border border-stone-200 p-8">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                <h3 className="text-base font-bold text-stone-800">
                  Loading your nutrition history...
                </h3>
                <p className="text-xs text-stone-500">
                  Retrieving your recorded meals from Cloud Firestore.
                </p>
              </div>
            ) : (
              <>
                {/* Quick Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <Flame className="w-4 h-4 text-emerald-600" />
                      <span>Total Calories</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-stone-900">~{dailyTotals.calories}</span>
                      <span className="text-xs text-stone-500 font-medium">kcal</span>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600">
                      <Beef className="w-4 h-4 text-emerald-700" />
                      <span>Protein</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-stone-900">{dailyTotals.protein}</span>
                      <span className="text-xs text-stone-500 font-medium">g</span>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600">
                      <Wheat className="w-4 h-4 text-amber-700" />
                      <span>Carbohydrates</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-stone-900">{dailyTotals.carbs}</span>
                      <span className="text-xs text-stone-500 font-medium">g</span>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600">
                      <Droplets className="w-4 h-4 text-rose-700" />
                      <span>Fat / Fiber</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-stone-900">{dailyTotals.fat}g</span>
                      <span className="text-xs text-stone-400">/ {dailyTotals.fiber}g fiber</span>
                    </div>
                  </div>
                </div>

                {/* Daily Progress & Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DailyProgress meals={todaysMeals} />

                  <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200/80 space-y-4">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-emerald-700" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
                        Cloud Firestore Persistent State
                      </h3>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Your nutrition logs are synchronized securely to your individual Cloud Firestore profile. When you return or refresh on any device, your meal history and calculated intake remain intact.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={focusChatInput}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
                      >
                        <span>Open Nutrition Assistant</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 3: LOGGED MEALS */}
        {activeTab === 'meals' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                  History
                </span>
                <h2 className="text-2xl font-black text-stone-900 mt-1">
                  Logged Meals ({meals.length})
                </h2>
                <p className="text-xs text-stone-500">
                  All meals recorded in your personal Cloud Firestore database.
                </p>
              </div>
              <button
                type="button"
                onClick={focusChatInput}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Log New Meal</span>
              </button>
            </div>

            {isInitialLoading ? (
              <div className="py-16 text-center space-y-3 bg-stone-50 rounded-3xl border border-stone-200 p-8">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                <h3 className="text-base font-bold text-stone-800">
                  Loading your meals...
                </h3>
              </div>
            ) : meals.length === 0 ? (
              <div className="text-center py-16 bg-stone-50 rounded-3xl border border-dashed border-stone-300 p-8 space-y-3">
                <Utensils className="w-8 h-8 text-stone-300 mx-auto" />
                <h3 className="text-base font-bold text-stone-800">No meals logged yet</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Type what you ate into the AI Assistant chat to record your breakfast, lunch, or snacks.
                </p>
                <button
                  type="button"
                  onClick={focusChatInput}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                >
                  Go to Assistant
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {meals.map((meal) => (
                  <MealAnalysis
                    key={meal.id}
                    analysis={meal}
                    onCorrect={(m) => {
                      setActiveCorrectionMeal(m);
                      focusChatInput();
                    }}
                    onDelete={(id) => removeMeal(id)}
                    onRetrySave={(m) => retrySaveMeal(m)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: NUTRITION INSIGHTS */}
        {activeTab === 'insights' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                Insights
              </span>
              <h2 className="text-2xl font-black text-stone-900 mt-1">
                Personal Nutrition Insights
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Educational recommendations grounded in your recorded session meals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  <Target className="w-4 h-4 text-emerald-700" />
                  <span>Primary Nutrition Priority</span>
                </div>
                <h3 className="text-lg font-bold text-emerald-950">
                  {dailyTotals.fiber < 15
                    ? 'Boost dietary fiber for satiety & gut wellness'
                    : dailyTotals.protein < 45
                    ? 'Incorporate high-quality protein with dinner'
                    : 'Balanced micronutrient intake today'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  {dailyTotals.fiber < 15
                    ? 'Your current fiber intake is modest. Adding legumes, leafy vegetables, seeds, or whole grains will enhance digestion and stabilize post-meal glucose response.'
                    : dailyTotals.protein < 45
                    ? 'Targeting 15-25g of protein in your evening meal will support muscle recovery and keep hunger steady until tomorrow morning.'
                    : 'Your macronutrient distribution shows good consistency between proteins and carbohydrates. Maintain adequate hydration.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-stone-500" />
                  <span>Estimation Philosophy</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Transparency over false precision
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  NutriMind relies on realistic average portions and culinary decomposition rather than claiming exact gram perfection. Use these insights as guideposts for sustainable dietary mindfulness.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* COLUMN 3: RIGHT TODAY'S NUTRITION SNAPSHOT (Desktop)       */}
      {/* ========================================================= */}
      <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0 h-full">
        <TodayNutritionSidebar onFocusInput={focusChatInput} />
      </div>

      {/* MOBILE RIGHT NUTRITION DRAWER */}
      {mobileNutritionOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileNutritionOpen(false)}
          />
          <div className="relative w-84 max-w-[85vw] h-full z-10">
            <TodayNutritionSidebar
              onCloseMobile={() => setMobileNutritionOpen(false)}
              onFocusInput={focusChatInput}
            />
          </div>
        </div>
      )}
    </div>
  );
};
