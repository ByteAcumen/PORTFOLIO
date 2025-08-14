import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = React.memo(({ size = 40, className = '' }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // --- GSAP Animation Timeline ---
  useGSAP(() => {
    const tl = gsap.timeline({
      // An infinite loop with a yoyo effect for the subtle gradient animation
      repeat: -1,
      yoyo: true,
    });

    // Animate the gradient stop colors for a subtle, shimmering effect
    tl.to('.grad-stop-1', { stopColor: '#8B5CF6', duration: 3, ease: 'sine.inOut' })
      .to('.grad-stop-2', { stopColor: '#3B82F6', duration: 3, ease: 'sine.inOut' }, 0);

    // --- Entrance Animation ---
    // A separate timeline for the initial "draw-in" effect
    // Remove drawSVG usage since DrawSVGPlugin is not registered or available
    // const entranceTl = gsap.timeline();
    // entranceTl.from('.logo-path', {
    //   drawSVG: 0,
    //   duration: 1.5,
    //   ease: 'power2.inOut',
    //   stagger: 0.2,
    // });
    
    // Animate the fill opacity after the drawing is complete
    // entranceTl.to('.logo-shield', {
    //   opacity: 1,
    //   duration: 0.5,
    //   ease: 'power1.inOut',
    // });

  }, { scope: svgRef });

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Hemant Kumar Logo"
      >
        <defs>
          {/* A single, elegant linear gradient using the site's accent colors */}
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop className="grad-stop-1" offset="0%" stopColor="var(--color-accent, #3B82F6)" />
            <stop className="grad-stop-2" offset="100%" stopColor="var(--color-accent-hover, #4F46E5)" />
          </linearGradient>
        </defs>

        {/* --- The Shield Shape --- */}
        <path
          className="logo-shield logo-path"
          d="M50 5 L95 25 V75 L50 95 L5 75 V25 Z"
          fill="url(#logo-gradient)"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          opacity="0" // Start transparent, GSAP will fade it in
        />

        {/* --- "H" Letter (Redesigned) --- */}
        <path
          className="logo-h logo-path"
          d="M25 30 V70 M25 50 H50"
          fill="none"
          stroke="var(--color-text, #FFFFFF)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --- "K" Letter (Redesigned) --- */}
        <path
          className="logo-k logo-path"
          d="M50 30 V70 M50 50 L75 30 M50 50 L75 70"
          fill="none"
          stroke="var(--color-text, #FFFFFF)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});

export default Logo;