import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from './ThemeContext';

/**
 * useTheme provides access to theme state and actions.
 * Throws if used outside ThemeProvider.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
