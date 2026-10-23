import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth, formatAuthError } from '../context/AuthContext';

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword(email);
      setSuccessMessage('Check your email for a password reset link.');
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/operation-not-allowed') {
        setErrorMessage('Password reset requires Email/Password provider enabled in the Firebase Console.');
      } else if (code === 'auth/user-not-found') {
        // Still say check your email to avoid account enumeration
        setSuccessMessage('If an account exists with this email, you will receive a reset link shortly.');
      } else {
        setErrorMessage(formatAuthError(code));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FBFDFB]">
      <div className="w-full max-w-md">
        
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/80 shadow-xl shadow-stone-200/50 text-left">
          
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-emerald-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </button>

          <div className="mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Reset Your Password
            </h2>
            <p className="text-sm text-stone-500 mt-1 leading-relaxed">
              Enter your email address and we'll send you a password reset link.
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div 
              role="status"
              className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{successMessage}</p>
                <p className="text-xs text-emerald-700 mt-1">Please check your inbox (and spam folder) in a few minutes.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div 
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {!successMessage ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label 
                  htmlFor="reset-email" 
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="reset-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#FBFDFB] hover:bg-white focus:bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                id="btn-send-reset-link"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-800/10 hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending Reset Link...
                  </span>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm rounded-xl transition-colors"
              >
                Return to Sign In
              </button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Sign In
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
