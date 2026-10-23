import React, { useState } from 'react';
import { 
  Leaf, 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  PieChart,
  ExternalLink
} from 'lucide-react';
import { useAuth, formatAuthError } from '../context/AuthContext';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { signIn, signInWithGoogle, signInAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [needsProviderSetup, setNeedsProviderSetup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setNeedsProviderSetup(false);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(email, password);
      onNavigate('app');
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/operation-not-allowed') {
        setNeedsProviderSetup(true);
        setErrorMessage('Email/Password sign-in is not yet enabled in your Firebase Console.');
      } else {
        setErrorMessage(formatAuthError(code));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setNeedsProviderSetup(false);
    try {
      setIsGoogleSubmitting(true);
      await signInWithGoogle();
      onNavigate('app');
    } catch (err: any) {
      const code = err?.code || '';
      // Gracefully handle user popup closures/cancellations without logging console errors
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setErrorMessage('Google sign-in popup was closed. Click the button to try again.');
        return;
      }
      if (code === 'auth/popup-blocked') {
        setErrorMessage('The Google sign-in window was blocked by your browser. Please allow popups or open the app in a new tab.');
        return;
      }
      if (code === 'auth/operation-not-allowed') {
        setNeedsProviderSetup(true);
        setErrorMessage('Google sign-in is not enabled in your Firebase Console.');
        return;
      }
      setErrorMessage(formatAuthError(code));
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FBFDFB]">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Product Message & Visual Composition */}
        <div className="lg:col-span-6 text-left space-y-6 hidden lg:block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>NUTRIMIND SECURE ACCESS</span>
          </div>

          <h1 className="text-4xl lg:text-[44px] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            Understand your food.{' '}
            <span className="text-emerald-700 block mt-1">
              One meal at a time.
            </span>
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed font-normal max-w-md">
            Sign in to continue your personalized nutrition journey and access your everyday dietary awareness.
          </p>

          {/* Aesthetic Highlights Card */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100/80 shadow-md shadow-emerald-900/5 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Natural Food Logging</h3>
                <p className="text-xs text-stone-500 mt-0.5">Describe what you ate in everyday words without manual database lookups.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Meal Decomposition</h3>
                <p className="text-xs text-stone-500 mt-0.5">Deconstruct complex recipes into clear, estimated raw components.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <PieChart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Holistic Macro Balance</h3>
                <p className="text-xs text-stone-500 mt-0.5">Actionable insights to support steady daily vitality without guilt.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500 font-medium pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Firebase Auth Protected
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Encrypted Session
            </span>
          </div>
        </div>

        {/* Right Side: Authentication Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/80 shadow-xl shadow-stone-200/50 text-left">
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Sign in to continue to NutriMind.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div 
                id="auth-error-banner"
                role="alert"
                className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-800 text-xs sm:text-sm flex flex-col gap-2 animate-in fade-in"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium leading-snug">{errorMessage}</span>
                </div>

                {needsProviderSetup && (
                  <div 
                    id="login-provider-help" 
                    className="mt-2 p-3 bg-white/90 rounded-lg border border-rose-200 text-stone-800 text-xs space-y-2"
                  >
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                      <span>How to enable Email/Password in Firebase:</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-stone-700">
                      <li>
                        Open your{' '}
                        <a 
                          href="https://console.firebase.google.com/project/ivory-augury-mknl3/authentication/providers" 
                          target="_blank" 
                          rel="noreferrer"
                          className="font-bold text-emerald-700 underline hover:text-emerald-800"
                        >
                          Firebase Console (ivory-augury-mknl3)
                        </a>
                      </li>
                      <li>Under <strong>Sign-in providers</strong>, click <strong>Email/Password</strong></li>
                      <li>Toggle <strong>Enable</strong> ON and click <strong>Save</strong></li>
                    </ol>
                    <div className="pt-1 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="px-2.5 py-1 rounded-md bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
                      >
                        Sign in with Google instead
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          signInAsDemo();
                          onNavigate('app');
                        }}
                        className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold border border-stone-300 transition-colors"
                      >
                        Continue with Demo Mode
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              {/* Email Input */}
              <div>
                <label 
                  htmlFor="login-email" 
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="login-email"
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

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor="login-password" 
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    id="link-forgot-password"
                    onClick={() => onNavigate('forgot-password')}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-[#FBFDFB] hover:bg-white focus:bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    id="btn-toggle-password-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-login-submit"
                type="submit"
                disabled={isSubmitting || isGoogleSubmitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-800/10 hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* OR Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 font-semibold text-stone-400">
                  OR
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              id="btn-google-login"
              type="button"
              disabled={isSubmitting || isGoogleSubmitting}
              onClick={handleGoogleSignIn}
              className="w-full inline-flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-200 hover:border-stone-300 text-stone-700 font-semibold text-sm rounded-xl shadow-xs transition-all"
            >
              {isGoogleSubmitting ? (
                <svg className="animate-spin h-4 w-4 text-stone-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            {/* Bottom Link to Signup */}
            <div className="mt-6 pt-5 border-t border-stone-100 text-center text-xs sm:text-sm text-stone-600">
              <span>Don't have an account? </span>
              <button
                type="button"
                id="link-go-to-signup"
                onClick={() => onNavigate('signup')}
                className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Create an account
              </button>
            </div>

            {/* Quick Demo Preview Option */}
            <div className="mt-3 pt-3 border-t border-dashed border-stone-200 text-center">
              <button
                type="button"
                id="btn-login-demo-preview"
                onClick={() => {
                  signInAsDemo();
                  onNavigate('app');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-emerald-700 font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Testing the app?</span>
                <span className="font-semibold underline">Continue with Demo Preview</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
