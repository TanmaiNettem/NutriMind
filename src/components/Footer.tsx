import React from 'react';
import { Leaf, Sparkles } from 'lucide-react';

interface FooterProps {
  currentPage: string;
  onNavigate: (page: string, sectionId?: string) => void;
  onOpenPhaseNotice?: (actionName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  currentPage, 
  onNavigate
}) => {
  return (
    <footer id="main-footer" className="bg-[#F6F8F5] border-t border-stone-200/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-200">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700 text-white shadow-sm">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-stone-900">
                Nutri<span className="text-emerald-700">Mind</span>
              </span>
            </div>

            <p className="text-stone-600 text-sm max-w-sm leading-relaxed">
              Your intelligent companion for understanding everyday nutrition. Designed around natural language, not rigid databases.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-200/50">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI-Powered Nutrition Analysis & Tracking</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Pages
            </span>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className={`hover:text-emerald-700 transition-colors ${
                    currentPage === 'home' ? 'text-emerald-700 font-semibold' : ''
                  }`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className={`hover:text-emerald-700 transition-colors flex items-center gap-1.5 ${
                    currentPage === 'about' ? 'text-emerald-700 font-semibold' : ''
                  }`}
                >
                  <span>About</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className={`hover:text-emerald-700 transition-colors flex items-center gap-1.5 ${
                    currentPage === 'login' ? 'text-emerald-700 font-semibold' : ''
                  }`}
                >
                  <span>Login</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className={`hover:text-emerald-700 transition-colors flex items-center gap-1.5 ${
                    currentPage === 'signup' ? 'text-emerald-700 font-semibold' : ''
                  }`}
                >
                  <span>Sign Up</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Jump Sections */}
          <div className="md:col-span-3 space-y-3 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Explore
            </span>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'how-it-works')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'product-preview')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  AI Product Preview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'nutrition-insights')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Nutritional Balance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about', 'meal-understanding')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Meal Decomposition
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-left">
          <p className="max-w-xl text-center md:text-left leading-relaxed">
            <strong className="text-stone-700">Disclaimer:</strong> Nutrition estimates are approximations for educational and informational purposes and should not replace professional medical advice. NutriMind does not provide medical diagnoses or treatment plans.
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span>&copy; {new Date().getFullYear()} NutriMind. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
