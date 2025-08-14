import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { gsap } from 'gsap';

// Initialize GSAP if not already loaded from CDN
if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
  // GSAP is already loaded from CDN in index.html
} else {
  // Fallback: import GSAP from npm package
  import('gsap').then(() => {
  }).catch(() => {
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);