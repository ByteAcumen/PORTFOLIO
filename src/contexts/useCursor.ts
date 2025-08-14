import { useContext } from 'react';
import { CursorContext, CursorContextType } from './CursorContext';

/**
 * A professional-grade hook to access the global cursor state and actions.
 *
 * This hook is guaranteed to return a valid context value, as a default is
 * provided at the root. It simplifies component logic by removing the need
 * for undefined checks.
 *
 * @returns {CursorContextType} The cursor context, including the current
 * variant, text, and stable action functions (`setCursor`, `resetCursor`).
 */
export const useCursor = (): CursorContextType => {
  return useContext(CursorContext);
};