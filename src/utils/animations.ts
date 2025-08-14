import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// Performance optimization: Set default ease
gsap.defaults({ ease: "power2.out" });

// Smooth scrolling configuration
export const smoothScrollConfig = {
  smooth: true,
  multiplier: 1,
  lerp: 0.1,
  duration: 1.2,
  ease: "power2.out"
};

// Initialize smooth scrolling
export const initSmoothScroll = () => {
  // Disable default scroll behavior
  document.documentElement.style.scrollBehavior = 'auto';
  
  // Set up smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href')!);
      if (target) {
        gsap.to(window, {
          duration: smoothScrollConfig.duration,
          scrollTo: { y: target, offsetY: 80 },
          ease: smoothScrollConfig.ease
        });
      }
    });
  });
};

// Scroll-triggered animations
export const initScrollAnimations = () => {
  // Fade in animations
  gsap.utils.toArray('.gsap-fade-in').forEach((element: Element) => {
    gsap.fromTo(element, 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Slide up animations
  gsap.utils.toArray('.gsap-slide-up').forEach((element: Element) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Slide down animations
  gsap.utils.toArray('.gsap-slide-down').forEach((element: Element) => {
    gsap.fromTo(element, 
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Slide left animations
  gsap.utils.toArray('.gsap-slide-left').forEach((element: Element) => {
    gsap.fromTo(element, 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Slide right animations
  gsap.utils.toArray('.gsap-slide-right').forEach((element: Element) => {
    gsap.fromTo(element, 
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Scale in animations
  gsap.utils.toArray('.gsap-scale-in').forEach((element: Element) => {
    gsap.fromTo(element, 
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Rotate in animations
  gsap.utils.toArray('.gsap-rotate-in').forEach((element: Element) => {
    gsap.fromTo(element, 
      { opacity: 0, rotation: -10, scale: 0.9 },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Stagger animations for lists
  gsap.utils.toArray('.gsap-stagger').forEach((container: Element) => {
    const elements = container.children;
    gsap.fromTo(elements, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};

// Parallax effects
export const initParallaxEffects = () => {
  // Parallax for background elements
  gsap.utils.toArray('.parallax-bg').forEach((element: Element) => {
    gsap.to(element, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Parallax for foreground elements
  gsap.utils.toArray('.parallax-fg').forEach((element: Element) => {
    gsap.to(element, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
};

// Text animations
export const initTextAnimations = () => {
  // Typewriter effect
  gsap.utils.toArray('.typewriter').forEach((element: Element) => {
    const text = element.textContent;
    element.textContent = '';
    
    gsap.to(element, {
      duration: 2,
      text: text,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Split text reveal
  gsap.utils.toArray('.split-text').forEach((element: Element) => {
    const text = element.textContent;
    element.innerHTML = text!.split('').map((char: string) => 
      char === ' ' ? ' ' : `<span class="char">${char}</span>`
    ).join('');
    
    const chars = element.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};

// Hover animations
export const initHoverAnimations = () => {
  // Hover lift effect
  gsap.utils.toArray('.hover-lift').forEach((element: Element) => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Hover glow effect
  gsap.utils.toArray('.hover-glow').forEach((element: Element) => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
};

// Page transitions
export const pageTransition = {
  in: (element: HTMLElement) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }
    );
  },
  
  out: (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.in"
    });
  }
};

// Loading animations
export const loadingAnimations = {
  fadeIn: (element: HTMLElement) => {
    return gsap.fromTo(element, 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  },
  
  slideUp: (element: HTMLElement) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  },
  
  scaleIn: (element: HTMLElement) => {
    return gsap.fromTo(element, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
  }
};

// Utility functions
export const animateTo = (element: HTMLElement, animation: string, options = {}) => {
  const animations = {
    fadeIn: () => gsap.fromTo(element, { opacity: 0 }, { opacity: 1, ...options }),
    slideUp: () => gsap.fromTo(element, { opacity: 0, y: 50 }, { opacity: 1, y: 0, ...options }),
    slideDown: () => gsap.fromTo(element, { opacity: 0, y: -50 }, { opacity: 1, y: 0, ...options }),
    slideLeft: () => gsap.fromTo(element, { opacity: 0, x: -50 }, { opacity: 1, x: 0, ...options }),
    slideRight: () => gsap.fromTo(element, { opacity: 0, x: 50 }, { opacity: 1, x: 0, ...options }),
    scaleIn: () => gsap.fromTo(element, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ...options }),
    rotateIn: () => gsap.fromTo(element, { opacity: 0, rotation: -10, scale: 0.9 }, { opacity: 1, rotation: 0, scale: 1, ...options })
  };
  
  return animations[animation as keyof typeof animations]?.() || animations.fadeIn();
};

// Initialize all animations
export const initAnimations = () => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
      initScrollAnimations();
      initParallaxEffects();
      initTextAnimations();
      initHoverAnimations();
    });
  } else {
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffects();
    initTextAnimations();
    initHoverAnimations();
  }
};

// Cleanup function
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Export GSAP instance for direct use
export { gsap };