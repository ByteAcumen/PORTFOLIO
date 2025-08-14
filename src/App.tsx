import React, { Suspense, lazy, useEffect, useState, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CursorProvider } from './contexts/CursorContext';
import { initPerformanceOptimizations } from './utils/performance';

// Safer lazy loading with fallbacks and error handling
function createLazyComponent<TProps = Record<string, never>>(
  importFunc: () => Promise<{ default: React.ComponentType<TProps> }>,
  displayName: string
) {
  const LazyComponent = lazy(() =>
    importFunc().catch(() => ({
      default: () => (
        <div className="py-20 text-center">
          <p className="text-text-muted">Component temporarily unavailable</p>
        </div>
      )
    }))
  );
  // Note: displayName assignment is optional for debugging purposes
  (LazyComponent as unknown as { displayName?: string }).displayName = displayName;
  return LazyComponent as React.ComponentType<TProps>;
}

// Lazy-loaded components with error handling and named components
const LoadingScreen = createLazyComponent<{ onFinished: () => void }>(() => import('./components/LoadingScreen'), 'LoadingScreen');
const SimpleBackground = createLazyComponent<{ className?: string }>(() => import('./components/SimpleBackground'), 'SimpleBackground');
const Header = createLazyComponent(() => import('./components/Header'), 'Header');
const Hero = createLazyComponent<{ openResumeModal: () => void }>(() => import('./components/HeroOptimized'), 'Hero');
const About = createLazyComponent(() => import('./components/About'), 'About');
const Experience = createLazyComponent(() => import('./components/Experience'), 'Experience');
const Skills = createLazyComponent(() => import('./components/Skills'), 'Skills');
const Projects = createLazyComponent(() => import('./components/Projects'), 'Projects');
const Contact = createLazyComponent(() => import('./components/Contact'), 'Contact');
const Footer = createLazyComponent(() => import('./components/Footer'), 'Footer');
import ResumeModal from './components/SimpleResumeModal';
import { AnimatePresence } from 'framer-motion';

// Simple Error Boundary with improved error handling
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  
  static getDerivedStateFromError() { 
    return { hasError: true }; 
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
    // Could add error logging service here
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-text flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-heading">Something went wrong</h2>
            <p className="text-text-muted mb-6">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300 font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Optimized Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-text-muted">Loading...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const openResumeModal = useCallback(() => {
    setResumeOpen(true);
  }, []);
  const closeResumeModal = useCallback(() => {
    setResumeOpen(false);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    // The LoadingScreen has its own internal timers and a fade-out animation.
    // We'll set the app as ready once that process is complete.
    setIsAppReady(true);
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    initPerformanceOptimizations();
  }, []);

  // While the app is not ready, show the loading screen.
  // This prevents the main content from rendering prematurely.
  if (!isAppReady) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <LoadingScreen onFinished={handleLoadingComplete} />
      </Suspense>
    );
  }

  return (
    <ThemeProvider>
      <CursorProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-background text-text transition-colors duration-300 performance-optimized">
            <Suspense fallback={<LoadingFallback />}>
              <>
                <SimpleBackground className="fixed inset-0 -z-10 opacity-40" />
                <Header />
                <main role="main" className="relative z-10">
                  <Hero openResumeModal={openResumeModal} />
                  <About />
                  <Experience />
                  <Skills />
                  <Projects />
                  <Contact />
                </main>
                <Footer />
                {/* Resume Modal with proper props */}
                <AnimatePresence mode="wait">
                  {resumeOpen && (
                    <ResumeModal
                      key="resume-modal"
                      open={resumeOpen}
                      onClose={closeResumeModal}
                      src="/Resume.pdf"
                    />
                  )}
                </AnimatePresence>
              </>
            </Suspense>
          </div>
        </ErrorBoundary>
      </CursorProvider>
    </ThemeProvider>
  );
};

export default App;