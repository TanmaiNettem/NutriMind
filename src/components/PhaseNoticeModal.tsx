import React, { useEffect } from 'react';
import { Sparkles, X, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PhaseNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  onNavigate?: (page: string) => void;
}

export const PhaseNoticeModal: React.FC<PhaseNoticeModalProps> = ({
  isOpen,
  onClose,
  title = 'NutriMind Features & Access',
  subtitle = 'Discover how NutriMind turns natural meal descriptions into actionable nutritional intelligence.',
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="feature-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div
        id="feature-modal-content"
        className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-emerald-100 text-left transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Live Platform
            </span>
            <h3 id="modal-headline" className="text-xl font-bold text-stone-900 mt-1">
              {title}
            </h3>
          </div>
        </div>

        <p className="text-stone-600 text-sm leading-relaxed mb-6">
          {subtitle}
        </p>

        <div className="space-y-3 bg-stone-50/80 p-4 rounded-xl border border-stone-200/60 mb-6 text-xs text-stone-700">
          <div className="flex items-start gap-2.5 font-medium text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900">Conversational Logging:</span> Type meals naturally like &ldquo;two scrambled eggs with avocado toast&rdquo;.
            </div>
          </div>
          <div className="flex items-start gap-2.5 font-medium text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900">Smart Decomposition:</span> Instant breakdown into calories, macronutrients, and micronutrient balance.
            </div>
          </div>
          <div className="flex items-start gap-2.5 font-medium text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900">Secure Personal Dashboard:</span> Sign up or log in to maintain your food journal and daily goals.
            </div>
          </div>
          <div className="flex items-start gap-2.5 font-medium text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900">Actionable Suggestions:</span> Clear, non-judgmental guidance for daily micronutrient and fiber balance.
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure authentication &amp; private user data</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('signup');
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            )}
            <button
              id="btn-modal-understand"
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all hover:shadow cursor-pointer"
            >
              <span>Explore Features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
