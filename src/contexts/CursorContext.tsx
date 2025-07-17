import React, { createContext, useState, useCallback, useMemo } from 'react';

// Cursor variants
export type CursorVariant = 'default' | 'button' | 'text' | 'link' | 'image';

export interface CursorContextType {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
  cursorText: string | null;
  setCursorText: (text: string | null) => void;
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
}

// Create context
export const CursorContext = createContext<CursorContextType | undefined>(undefined);

/**
 * CursorProvider manages custom cursor state for the app, with fast and smooth updates.
 */
export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Memoized update functions
  const updateCursorVariant = useCallback((variant: CursorVariant) => {
    setCursorVariant(variant);
  }, []);

  const updateCursorText = useCallback((text: string | null) => {
    setCursorText(text);
  }, []);

  const updateIsHovering = useCallback((hovering: boolean) => {
    setIsHovering(hovering);
  }, []);

  // Memoize context value for performance
  const contextValue = useMemo(() => ({
        cursorVariant, 
        setCursorVariant: updateCursorVariant,
        cursorText,
        setCursorText: updateCursorText,
        isHovering,
    setIsHovering: updateIsHovering,
  }), [cursorVariant, updateCursorVariant, cursorText, updateCursorText, isHovering, updateIsHovering]);

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
    </CursorContext.Provider>
  );
};

// Hook moved to separate file: useCursor.ts