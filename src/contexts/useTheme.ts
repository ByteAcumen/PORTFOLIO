import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from './ThemeContext';

/**
 * A professional-grade hook to access the global theme state and actions.
 *
 * This hook is guaranteed to return a valid context value, as a default is
 * provided at the root. This allows components to safely access theme
 * properties without checks.
 *
 * @returns {ThemeContextType} The theme context, including `isDark`,
 * `accentColor`, and the stable action functions (`toggleTheme`, `setAccentColor`).
 */
export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};