import { useContext } from 'react';
import { CursorContext, CursorContextType } from './CursorContext';

/**
 * useCursor provides access to custom cursor state and actions.
 * Throws if used outside CursorProvider.
 */
export const useCursor = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
