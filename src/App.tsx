import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CursorProvider } from './contexts/CursorContext';
import Cursor from './components/Cursor';
import ParticleBackground from './components/ParticleBackground';

// Lazy-loaded components
const LoadingScreen = lazy(() => import('./components/LoadingScreen'));
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Error Boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-center p-4 text-red-600">Something went wrong. Please try refreshing the page.</div>;
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  // Ensure smooth theme transitions on initial load
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ThemeProvider>
      <CursorProvider>
        <ErrorBoundary>
          <div
            className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/95 dark:to-indigo-900/95 transition-all duration-700 theme-transition custom-cursor ${
              isMounted ? 'opacity-100' : 'opacity-0'
            }`}
            role="application"
            aria-label="Portfolio Application"
          >
            <Cursor />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">Loading...</div>}>
              <LoadingScreen />
              <ParticleBackground className="opacity-50 z-[-10]" /> {/* Simplified with consistent opacity */}
              <Header />
              <main className="relative z-10" id="main-content" role="main">
                <Hero />
                <About />
                <Experience />
                <Skills />
                <Portfolio />
                <Contact />
              </main>
              <Footer />
            </Suspense>
          </div>
        </ErrorBoundary>
      </CursorProvider>
    </ThemeProvider>
  );
};

export default App;