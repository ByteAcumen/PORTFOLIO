import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';

export type AccentColor = 'blue' | 'purple' | 'teal' | 'rose';

export interface ThemeContextType {
  isDark: boolean;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
}

// --- BEST PRACTICE: Default Context Value ---
// Provide a default value to eliminate the need for `| undefined` checks.
// This makes the consumer hook (`useTheme`) safer and allows components
// to be tested without needing to be wrapped in a ThemeProvider.
const defaultContextValue: ThemeContextType = {
  isDark: false,
  accentColor: 'blue',
  toggleTheme: () => {}, // No-operation function
  setAccentColor: () => {}, // No-operation function
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

// --- BEST PRACTICE: Initializer Functions ---
// These functions correctly determine the initial state *before* the first render.
// They are crucial for syncing React's state with what the inline script in `index.html`
// has already set on the DOM, preventing UI mismatches on load.
const getInitialIsDark = (): boolean => {
  // SSR-safe check
  if (typeof window === 'undefined') return false;
  // The state should reflect what's already on the DOM from our inline script.
  return document.documentElement.classList.contains('dark');
};

const getInitialAccent = (): AccentColor => {
  // SSR-safe check
  if (typeof window === 'undefined') return 'blue';
  // Check localStorage first, then the DOM attribute, then fallback.
  const storedAccent = localStorage.getItem('accentColor') as AccentColor | null;
  const domAccent = document.documentElement.getAttribute('data-accent') as AccentColor | null;
  return storedAccent || domAccent || 'blue';
};


/**
 * ThemeProvider manages the application's visual theme (dark/light mode) and accent color.
 * It is highly optimized and works in tandem with the inline script in `index.html`
 * to provide a seamless, flicker-free theme experience.
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialIsDark);
  const [accentColor, setAccentColorState] = useState<AccentColor>(getInitialAccent);

  // --- BEST PRACTICE: Memoized Handlers ---
  // These handlers are memoized to prevent unnecessary re-renders in child components.
  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev;
      // Update DOM and localStorage
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', newValue ? 'true' : 'false');
      return newValue;
    });
  }, []);

  const setAccentColor = useCallback((color: AccentColor) => {
    setAccentColorState(color);
    // Update DOM and localStorage
    document.documentElement.setAttribute('data-accent', color);
    localStorage.setItem('accentColor', color);
  }, []);

  // --- BEST PRACTICE: Memoized Context Value ---
  // The context value is memoized to prevent unnecessary re-renders in child components.
  const contextValue = useMemo(() => ({
    isDark,
    accentColor,
    toggleTheme,
    setAccentColor,
  }), [isDark, accentColor, toggleTheme, setAccentColor]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};