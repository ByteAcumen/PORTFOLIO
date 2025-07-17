import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react';

// Accent color options
export type AccentColor = 'blue' | 'purple' | 'teal' | 'rose';

export interface ThemeContextType {
  isDark: boolean;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
  themeTransition: boolean;
}

// Create context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider manages dark/light mode and accent color, with smooth transitions and instant updates.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize dark mode from localStorage or system preference
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('isDark');
      if (savedTheme !== null) return JSON.parse(savedTheme);
      // System preference fallback
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Initialize accent color from localStorage or default to blue
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('accentColor') as AccentColor) || 'blue';
    }
    return 'blue';
  });

  // Track transition state for smooth animations
  const [themeTransition, setThemeTransition] = useState(false);

  // Apply theme and accent color changes to the DOM instantly and smoothly
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.setAttribute('data-accent', accentColor);
    localStorage.setItem('isDark', JSON.stringify(isDark));
    localStorage.setItem('accentColor', accentColor);
    // Trigger transition animation when theme changes
    if (themeTransition) {
      root.classList.add('theme-transition');
      const timer = setTimeout(() => {
        root.classList.remove('theme-transition');
        setThemeTransition(false);
      }, 300); // Match the 0.3s transition duration
      return () => clearTimeout(timer);
    }
  }, [isDark, accentColor, themeTransition]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
    setThemeTransition(true);
  }, []);

  // Set accent color
  const setAccentColor = useCallback((color: AccentColor) => {
    setAccentColorState(color);
    setThemeTransition(true);
  }, []);

  // Memoize context value for performance
  const contextValue = useMemo(() => ({
        isDark,
        accentColor,
        toggleTheme,
        setAccentColor,
        themeTransition,
  }), [isDark, accentColor, toggleTheme, setAccentColor, themeTransition]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook moved to separate file: useTheme.ts