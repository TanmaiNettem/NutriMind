import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NutritionProvider } from './context/NutritionContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { ProductPreview } from './components/ProductPreview';
import { NutritionInsights } from './components/NutritionInsights';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { PhaseNoticeModal } from './components/PhaseNoticeModal';
import { AboutPage } from './components/about/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AppDashboardPage } from './pages/AppDashboardPage';

type PageType = 'home' | 'about' | 'login' | 'signup' | 'forgot-password' | 'app';

function NutriMindApp() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('NutriMind Status');
  const [modalSubtitle, setModalSubtitle] = useState('');

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#about')) {
        setCurrentPage('about');
      } else if (hash.startsWith('#login')) {
        setCurrentPage('login');
      } else if (hash.startsWith('#signup')) {
        setCurrentPage('signup');
      } else if (hash.startsWith('#forgot-password') || hash.startsWith('#reset-password')) {
        setCurrentPage('forgot-password');
      } else if (hash.startsWith('#app') || hash.startsWith('#dashboard')) {
        setCurrentPage('app');
      } else {
        // Sections on home (e.g. #how-it-works, #product-preview) or empty
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Protected route enforcement
  useEffect(() => {
    if (loading) return;

    if (currentPage === 'app' && !isAuthenticated) {
      // Unauthenticated user attempting to access /app -> redirect to /login
      setCurrentPage('login');
      window.history.pushState(null, '', '#login');
    } else if ((currentPage === 'login' || currentPage === 'signup') && isAuthenticated) {
      // Authenticated user attempting to access /login or /signup -> redirect to /app
      setCurrentPage('app');
      window.history.pushState(null, '', '#app');
    }
  }, [currentPage, isAuthenticated, loading]);

  const handleNavigate = (page: string, sectionId?: string) => {
    const targetPage = page as PageType;
    
    // Protected check during user navigation
    if (targetPage === 'app' && !isAuthenticated) {
      setCurrentPage('login');
      window.history.pushState(null, '', '#login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
      if (targetPage === 'home') {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.history.pushState(null, '', `#${targetPage}`);
      }

      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleStartTracking = () => {
    if (isAuthenticated) {
      handleNavigate('app');
    } else {
      handleNavigate('signup');
    }
  };

  const handleHowItWorks = () => {
    handleNavigate('home', 'how-it-works');
  };

  const handleOpenNotice = (context: string) => {
    setModalTitle(context);
    if (context.includes('Interactive') || context.includes('Prompt') || context.includes('Analysis')) {
      setModalSubtitle(
        'Create a free account or log in to unlock live meal logging, ingredient decomposition, and personalized nutritional analysis.'
      );
    } else {
      setModalSubtitle(
        'NutriMind empowers you with intelligent meal tracking, macro breakdowns, and personalized wellness insights.'
      );
    }
    setIsModalOpen(true);
  };

  // Prevent authentication flicker with clean loading splash
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBFDFB] text-[#192A22]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-700/20 animate-pulse">
            <Leaf className="w-7 h-7" />
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <svg className="animate-spin h-4 w-4 text-emerald-700" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-sm font-semibold">Loading your NutriMind account...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="nutrimind-app" className="min-h-screen flex flex-col bg-[#FBFDFB] text-[#192A22]">
      {/* Top Sticky Navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero 
              onStartTracking={handleStartTracking} 
              onHowItWorks={handleHowItWorks} 
            />

            {/* 2. Trust / Value Strip */}
            <Benefits />

            {/* 3. How It Works */}
            <HowItWorks />

            {/* 4. Product Preview (Mock AI Conversation) */}
            <ProductPreview 
              onInteractivePromptClick={() => handleOpenNotice('Interactive Meal Analysis')} 
            />

            {/* 5. Nutrition Insight Section */}
            <NutritionInsights />

            {/* 6. Final Call to Action */}
            <FinalCTA 
              onStartTracking={handleStartTracking} 
            />
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onStartTracking={handleStartTracking}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'signup' && (
          <SignupPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'forgot-password' && (
          <ForgotPasswordPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'app' && (
          <AppDashboardPage 
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer (hidden in dashboard app view for dedicated 3-column workspace) */}
      {currentPage !== 'app' && (
        <Footer 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenPhaseNotice={handleOpenNotice} 
        />
      )}

      {/* Feature Showcase / Info Modal */}
      <PhaseNoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        subtitle={modalSubtitle}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('NutriMind application error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FBFDFB] text-[#192A22] p-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200/80 p-8 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              🌱
            </div>
            <h2 className="text-xl font-bold text-stone-900 mb-2">NutriMind</h2>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              We refreshed your session to restore state. Click below to load NutriMind.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  window.location.hash = '';
                  window.location.reload();
                }}
                className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
              >
                Reload NutriMind
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NutritionProvider>
          <NutriMindApp />
        </NutritionProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}