import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Menu, X, Leaf, LogOut, LayoutDashboard, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate
}) => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track active section on scroll and hash
  useEffect(() => {
    if (currentPage !== 'home' && currentPage !== 'app') {
      setActiveSection(currentPage);
      return;
    }

    if (currentPage === 'home') {
      const currentHash = window.location.hash.replace('#', '');
      if (['how-it-works', 'product-preview', 'nutrition-insights'].includes(currentHash)) {
        setActiveSection(currentHash);
      } else if (window.scrollY < 120) {
        setActiveSection('home');
      }

      const handleHomeScroll = () => {
        if (window.scrollY < 120) {
          setActiveSection('home');
          return;
        }

        const sections = [
          { id: 'nutrition-insights', key: 'nutrition-insights' },
          { id: 'product-preview', key: 'product-preview' },
          { id: 'how-it-works', key: 'how-it-works' },
          { id: 'hero', key: 'home' }
        ];

        const scrollPosition = window.scrollY + 200;
        for (const sec of sections) {
          const el = document.getElementById(sec.id);
          if (el && scrollPosition >= el.offsetTop) {
            setActiveSection(sec.key);
            return;
          }
        }
        setActiveSection('home');
      };

      window.addEventListener('scroll', handleHomeScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleHomeScroll);
    }

    if (currentPage === 'app') {
      setActiveSection('dashboard');
    }
  }, [currentPage]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    if (page === 'home') {
      setActiveSection(sectionId || 'home');
    } else {
      setActiveSection(page);
    }
    onNavigate(page, sectionId);
  };

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    try {
      await signOut();
      onNavigate('home');
    } catch {
      onNavigate('home');
    }
  };

  const isHomeActive = currentPage === 'home' && (!activeSection || activeSection === 'home' || activeSection === 'hero');
  const isHowItWorksActive = currentPage === 'home' && activeSection === 'how-it-works';
  const isPreviewActive = currentPage === 'home' && activeSection === 'product-preview';
  const isNutritionActive = currentPage === 'home' && activeSection === 'nutrition-insights';
  const isAboutActive = currentPage === 'about';

  const isDashboardActive = currentPage === 'app' && (!activeSection || activeSection === 'dashboard' || activeSection === 'app');
  const isJournalActive = currentPage === 'app' && activeSection === 'journal';
  const isInsightsActive = currentPage === 'app' && activeSection === 'insights';

  const getDesktopLinkClass = (isActive: boolean) =>
    `relative py-1 font-medium transition-all duration-200 cursor-pointer ${
      isActive
        ? 'text-stone-900 font-bold border-b-2 border-emerald-600'
        : 'text-stone-600 hover:text-emerald-700 border-b-2 border-transparent hover:border-emerald-300/60'
    }`;

  const getMobileLinkClass = (isActive: boolean) =>
    `w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between cursor-pointer ${
      isActive
        ? 'bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-600 pl-2.5'
        : 'text-stone-700 hover:bg-emerald-50 hover:text-emerald-800'
    }`;

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const initial = (displayName[0] || 'U').toUpperCase();

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-[#FBFDFB]/95 backdrop-blur-md border-b border-emerald-900/5 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                (e.currentTarget as HTMLButtonElement)?.blur();
                handleNavClick('home');
              }}
              className="group flex items-center gap-2.5 outline-none focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-lg py-1 px-1.5 text-left transition-colors"
              aria-label="NutriMind Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-700 text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform duration-200">
                <Leaf className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-300 text-emerald-950 text-[8px] font-bold">
                  <Sparkles className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-stone-900 flex items-center gap-1">
                  Nutri<span className="text-emerald-700">Mind</span>
                </span>
                <span className="text-[10px] font-medium tracking-wide uppercase text-stone-500 -mt-1">
                  AI Nutrition Companion
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Desktop Navigation">
            {currentPage === 'app' ? (
              <>
                <button
                  type="button"
                  id="nav-link-dashboard"
                  onClick={() => {
                    setActiveSection('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={getDesktopLinkClass(isDashboardActive)}
                >
                  Dashboard
                </button>

                <button
                  type="button"
                  id="nav-link-journal"
                  onClick={() => {
                    setActiveSection('journal');
                    const el = document.getElementById('todays-meals-container');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={getDesktopLinkClass(isJournalActive)}
                >
                  Food Journal
                </button>

                <button
                  type="button"
                  id="nav-link-insights"
                  onClick={() => {
                    setActiveSection('insights');
                    const el = document.getElementById('todays-nutrition-container');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={getDesktopLinkClass(isInsightsActive)}
                >
                  Insights
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  id="nav-link-home"
                  onClick={() => handleNavClick('home')}
                  className={getDesktopLinkClass(isHomeActive)}
                >
                  Home
                </button>

                <button
                  type="button"
                  id="nav-link-how-it-works"
                  onClick={() => handleNavClick('home', 'how-it-works')}
                  className={getDesktopLinkClass(isHowItWorksActive)}
                >
                  How It Works
                </button>

                <button
                  type="button"
                  id="nav-link-preview"
                  onClick={() => handleNavClick('home', 'product-preview')}
                  className={getDesktopLinkClass(isPreviewActive)}
                >
                  Preview
                </button>

                <button
                  type="button"
                  id="nav-link-nutritional-balance"
                  onClick={() => handleNavClick('home', 'nutrition-insights')}
                  className={getDesktopLinkClass(isNutritionActive)}
                >
                  Nutritional Balance
                </button>

                <button
                  type="button"
                  id="nav-link-about"
                  onClick={() => handleNavClick('about')}
                  className={`inline-flex items-center gap-1.5 ${getDesktopLinkClass(isAboutActive)}`}
                >
                  <span>About</span>
                </button>
              </>
            )}
          </nav>

          {/* Desktop Action Area: Authenticated vs Unauthenticated */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  id="user-menu-button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border border-stone-200 hover:border-emerald-300 bg-white hover:bg-stone-50 transition-all shadow-xs"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={displayName}
                      className="w-8 h-8 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                      {initial}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-stone-800 max-w-[120px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    id="user-dropdown-menu"
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-stone-200/80 animate-in fade-in slide-in-from-top-2 duration-150 z-50 text-left"
                  >
                    <div className="px-3 py-2 border-b border-stone-100">
                      <p className="text-xs font-semibold text-stone-900 truncate">{displayName}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                    </div>

                    <button
                      type="button"
                      id="menu-item-dashboard"
                      onClick={() => handleNavClick('app')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors mt-1 ${
                        currentPage === 'app'
                          ? 'bg-emerald-50 text-emerald-900 font-bold'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-emerald-800'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      <span>Dashboard</span>
                    </button>

                    <div
                      id="menu-item-profile"
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-400 rounded-xl mt-1 select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-stone-400" />
                        <span>Profile</span>
                      </div>
                      <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded font-medium">Coming Soon</span>
                    </div>

                    <button
                      type="button"
                      id="menu-item-signout"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-xl transition-colors mt-1 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  id="btn-nav-login"
                  type="button"
                  onClick={() => handleNavClick('login')}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                    currentPage === 'login'
                      ? 'text-emerald-800 bg-emerald-50 font-bold'
                      : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-100/70'
                  }`}
                >
                  Login
                </button>
                <button
                  id="btn-nav-get-started"
                  type="button"
                  onClick={() => handleNavClick('signup')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-xl shadow-sm shadow-emerald-800/10 hover:shadow-md hover:shadow-emerald-800/20 transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="btn-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-emerald-50 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-b border-stone-200 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-2 text-base font-medium text-stone-700 text-left">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={getMobileLinkClass(isHomeActive)}
            >
              <span>Home</span>
              {isHomeActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'how-it-works')}
              className={getMobileLinkClass(isHowItWorksActive)}
            >
              <span>How It Works</span>
              {isHowItWorksActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'product-preview')}
              className={getMobileLinkClass(isPreviewActive)}
            >
              <span>Product Preview</span>
              {isPreviewActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'nutrition-insights')}
              className={getMobileLinkClass(isNutritionActive)}
            >
              <span>Nutritional Balance</span>
              {isNutritionActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={getMobileLinkClass(isAboutActive)}
            >
              <span>About</span>
              {isAboutActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
            </button>

            {isAuthenticated && (
              <button
                type="button"
                onClick={() => handleNavClick('app')}
                className={getMobileLinkClass(currentPage === 'app')}
              >
                <span>Dashboard (/app)</span>
                <span className="text-[10px] font-semibold bg-emerald-700 text-white px-2 py-0.5 rounded-full">
                  Active
                </span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 bg-stone-50 rounded-xl text-left">
                  <span className="text-xs font-semibold text-stone-900 block">{displayName}</span>
                  <span className="text-[11px] text-stone-500 block truncate">{user?.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full py-2.5 text-center text-sm font-semibold text-rose-700 border border-rose-200 bg-rose-50/50 rounded-xl hover:bg-rose-100 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleNavClick('login')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-stone-700 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('signup')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-sm transition-all"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
