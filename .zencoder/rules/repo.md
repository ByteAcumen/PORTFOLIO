---
description: Repository Information Overview
alwaysApply: true
---

# Portfolio Website Information

## Summary
A modern, performance-optimized portfolio website built with React, TypeScript, and Vite. The project features smooth animations using GSAP, 3D elements with Three.js, and responsive design with Tailwind CSS. The portfolio includes sections for showcasing skills, projects, experience, and contact information.

## Structure
- **src/**: Source code containing React components, contexts, utilities, and styles
  - **components/**: UI components (Header, Hero, About, Skills, Projects, etc.)
  - **contexts/**: React context providers (Theme, Cursor)
  - **utils/**: Utility functions for animations and performance optimizations
  - **styles/**: CSS files and style-related code
- **public/**: Static assets including images, PDFs, and skill logos
- **dist/**: Build output directory

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: ES2022 target
**Build System**: Vite
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- React 18.3.1
- React DOM 18.3.1
- GSAP 3.13.0 (with React plugin)
- Three.js 0.162.0 (@react-three/fiber, @react-three/drei)
- Framer Motion 11.0.8
- Tailwind CSS 3.4.1
- Lucide React 0.344.0
- EmailJS 3.2.0

**Development Dependencies**:
- TypeScript 5.5.3
- Vite 5.4.2
- ESLint 9.9.1
- PostCSS 8.4.35
- Autoprefixer 10.4.18

## Build & Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Main Entry Points
**HTML Entry**: index.html
**JavaScript Entry**: src/main.tsx
**Application Root**: src/App.tsx

## Performance Optimizations
- Lazy-loaded components with Suspense
- Custom error boundary implementation
- Performance utilities in src/utils/performance.ts
- Optimized animations with GSAP
- Progressive image loading
- Tailwind CSS optimizations

## Theming
- Dark/light mode support via ThemeContext
- Custom cursor implementation via CursorContext
- Semantic color system with CSS variables
- Multiple accent color options (blue, purple, teal, rose)