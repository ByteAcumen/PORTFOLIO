import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';

/**
 * Defines the possible visual states for the custom cursor. Each variant
 * can trigger a different animation or style for the cursor component.
 */
export type CursorVariant = 'default' | 'button' | 'text' | 'link' | 'image' | 'hidden';

/**
 * Defines the shape of the context, providing a clear contract for consumers.
 */
export interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  /**
   * Sets the cursor's variant and optional text. Memoized for performance.
   * @param variant The desired appearance of the cursor.
   * @param text Optional text to display inside or near the cursor.
   */
  setCursor: (variant: CursorVariant, text?: string) => void;
  /**
   * Resets the cursor to its default state. Memoized for performance.
   */
  resetCursor: () => void;
}

// --- BEST PRACTICE: Default Context Value ---
// Provide a non-null default value for the context.
// This includes no-op functions and a default state, which has two benefits:
// 1. It enables components to be tested in isolation without a provider.
// 2. It provides better type inference and eliminates the need for `| undefined` checks in the consumer hook.
const defaultContextValue: CursorContextType = {
  cursorVariant: 'default',
  cursorText: '',
  setCursor: () => {}, // No-operation function
  resetCursor: () => {}, // No-operation function
};

export const CursorContext = createContext<CursorContextType>(defaultContextValue);

/**
 * Manages the global state for the custom cursor. This provider is highly optimized
 * to prevent unnecessary re-renders in child components, which is critical for
 * smooth animation performance.
 */
export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [text, setText] = useState<string>('');

  // --- OPTIMIZATION: Stable Handlers ---
  // `useCallback` with an empty dependency array ensures these functions are created
  // only once. This is crucial because passing unstable functions via context would
  // cause all consuming components to re-render every time the provider re-renders.

  const setCursor = useCallback((newVariant: CursorVariant, newText: string = '') => {
    setVariant(newVariant);
    setText(newText);
  }, []); // Stable: will never be recreated.

  const resetCursor = useCallback(() => {
    setVariant('default');
    setText('');
  }, []); // Stable: will never be recreated.

  // --- OPTIMIZATION: Memoized Context Value ---
  // `useMemo` ensures the context value object is only recreated when the actual
  // state (variant or text) changes. Since the handlers above are stable, they
  // are not needed in the dependency array. This prevents consumers from re-rendering
  // just because the provider's parent re-rendered.
  const contextValue = useMemo(() => ({
    cursorVariant: variant,
    cursorText: text,
    setCursor,
    resetCursor,
  }), [variant, text, setCursor, resetCursor]); // Dependencies are the state values and stable functions.

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
    </CursorContext.Provider>
  );
};