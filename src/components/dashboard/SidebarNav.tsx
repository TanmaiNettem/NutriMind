import React from 'react';
import {
  Sparkles,
  Bot,
  LayoutDashboard,
  Utensils,
  BarChart3,
  LogOut,
  User,
  Trash2,
  X,
  Plus,
  MessageSquare,
  Cloud
} from 'lucide-react';
import { DashboardTab } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useNutrition } from '../../context/NutritionContext';

interface SidebarNavProps {
  onCloseMobile?: () => void;
  onFocusInput?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  onCloseMobile,
  onFocusInput
}) => {
  const { user, signOut } = useAuth();
  const {
    activeTab,
    setActiveTab,
    clearSession,
    meals,
    todaysMeals,
    conversations,
    activeConversationId,
    startNewConversation,
    selectConversation
  } = useNutrition();

  const handleNav = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (tab === 'assistant' && onFocusInput) {
      onFocusInput();
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const navItems = [
    {
      id: 'assistant' as DashboardTab,
      label: 'AI Assistant',
      icon: Bot,
      badge: 'Primary',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'dashboard' as DashboardTab,
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'meals' as DashboardTab,
      label: "Today's Meals",
      icon: Utensils,
      badge: todaysMeals.length > 0 ? `${todaysMeals.length}` : undefined,
      badgeColor: 'bg-stone-200 text-stone-700'
    },
    {
      id: 'insights' as DashboardTab,
      label: 'Nutrition Insights',
      icon: BarChart3
    }
  ];

  const handleClearSession = () => {
    if (window.confirm('Reset current chat messages? (Your saved meals in Firestore will remain safe in the cloud).')) {
      clearSession();
      if (onCloseMobile) onCloseMobile();
    }
  };

  return (
    <nav className="w-full h-full bg-stone-900 text-white p-4 sm:p-5 flex flex-col justify-between select-none overflow-y-auto">
      <div className="space-y-5">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-stone-950 font-black shadow-sm">
              <Sparkles className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white leading-none block">
                NutriMind
              </span>
              <span className="text-[11px] font-medium text-emerald-400 leading-none mt-1 block flex items-center gap-1">
                <span>Cloud Nutrition</span>
                <Cloud className="w-3 h-3" />
              </span>
            </div>
          </div>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => {
            handleNav('assistant');
            if (onFocusInput) onFocusInput();
          }}
          className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Ask or Log a Meal</span>
        </button>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">
            Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-emerald-400' : 'text-stone-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Recent Conversations Section */}
        <div className="space-y-1 pt-2 border-t border-stone-800/80">
          <div className="flex items-center justify-between px-3 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Conversations
            </span>
            <button
              type="button"
              onClick={() => {
                startNewConversation();
                handleNav('assistant');
              }}
              className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              title="New Chat Session"
            >
              <Plus className="w-3 h-3" />
              <span>New</span>
            </button>
          </div>

          <div className="space-y-0.5 max-h-36 overflow-y-auto pr-1">
            {conversations.length === 0 ? (
              <p className="px-3 py-1.5 text-[11px] text-stone-500 italic">
                Active session in progress
              </p>
            ) : (
              conversations.slice(0, 5).map((conv) => {
                const isCurrent = conv.id === activeConversationId;
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => {
                      selectConversation(conv.id);
                      handleNav('assistant');
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs truncate flex items-center gap-2 transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-stone-800/90 text-emerald-300 font-bold'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{conv.title || 'Conversation'}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer / User Profile & Controls */}
      <div className="pt-4 border-t border-stone-800 space-y-3 mt-4">
        {/* User Card */}
        <div className="flex items-center gap-3 px-2 py-1.5 bg-stone-800/40 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-emerald-400 font-bold text-xs flex-shrink-0">
            {user?.displayName ? user.displayName[0].toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">
              {user?.displayName || 'Nutrition Explorer'}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-stone-400 truncate">
              <span className="truncate">{user?.email || 'Authenticated'}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{meals.length} meals</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleClearSession}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-[11px] font-medium text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            title="Clear current chat messages"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>

          <button
            type="button"
            onClick={() => signOut()}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-stone-800/80 hover:bg-rose-950/40 hover:text-rose-300 text-[11px] font-medium text-stone-400 transition-colors cursor-pointer"
            title="Sign out of NutriMind"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
