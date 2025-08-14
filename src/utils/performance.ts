// Performance optimization utilities for 60fps animations

// Optimized throttle function for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T, 
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastFunc: number;
  let lastRan: number;
  
  return function(this: unknown, ...args: Parameters<T>) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = window.setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// Optimized debounce function for resize events
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T, 
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(this: unknown, ...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
};

// Optimized check if element is in viewport
export const isInViewport = (element: HTMLElement, offset = 0): boolean => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.bottom >= 0 - offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
    rect.right >= 0 - offset
  );
};

// Optimize scroll performance
export const optimizeScroll = (callback?: (progress: number) => void) => {
  // Use passive event listeners for better performance
  const options = { passive: true };
  
  // Track scrolling state
  let ticking = false;
  
  // Throttle scroll events
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // Calculate scroll progress (0 to 1)
    const progress = Math.min(scrollTop / (scrollHeight - clientHeight), 1);
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Execute callback if provided
        if (callback) callback(progress);
        ticking = false;
      });
      
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, options);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Optimize animations for performance
export const optimizeAnimations = () => {
  // Add will-change to elements that will animate
  const animateElements = document.querySelectorAll('.will-animate');
  
  // Use IntersectionObserver for better performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target as HTMLElement;
      
      if (entry.isIntersecting) {
        // Add will-change when element is about to be visible
        element.style.willChange = 'transform, opacity';
      } else {
        // Remove will-change when element is not visible
        element.style.willChange = 'auto';
      }
    });
  }, {
    rootMargin: '100px', // Start preparing animations before they're visible
    threshold: 0.01 // Trigger with minimal visibility
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
  
  return () => {
    observer.disconnect();
  };
};

// Optimized lazy load images for better performance
export const lazyLoadImages = () => {
  // Skip if browser supports native lazy loading
  if ('loading' in HTMLImageElement.prototype) {
    // Convert data-src to src for browsers that support lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
      const image = img as HTMLImageElement;
      if (image.dataset.src) {
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
      }
    });
    return () => {};
  }
  
  // Fallback for browsers without native support
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '200px 0px', // Load images 200px before they appear
    threshold: 0.01 // Start loading with minimal visibility
  });
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
  
  return () => {
    imageObserver.disconnect();
  };
};

// Optimize CSS animations
export const optimizeCSSAnimations = () => {
  // Force hardware acceleration for smooth animations
  const animatedElements = document.querySelectorAll('.animate, .transition');
  animatedElements.forEach(element => {
    const el = element as HTMLElement;
    el.style.transform = 'translateZ(0)';
    el.style.backfaceVisibility = 'hidden';
    el.style.willChange = 'transform, opacity';
  });
  
  // Clean up will-change after animations complete
  setTimeout(() => {
    animatedElements.forEach(element => {
      const el = element as HTMLElement;
      el.style.willChange = 'auto';
    });
  }, 5000); // Assume most intro animations complete within 5 seconds
};

// Optimize for mobile devices
export const optimizeForMobile = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                  window.innerWidth < 768;
  
  if (isMobile) {
    // Add mobile optimization class to body
    document.body.classList.add('mobile-optimized');
    
    // Reduce animation complexity on mobile
    const heavyAnimations = document.querySelectorAll('.heavy-animation');
    heavyAnimations.forEach(element => {
      (element as HTMLElement).style.animation = 'none';
    });
    
    // Reduce blur effects on mobile
    document.querySelectorAll('[class*="blur-"]').forEach(element => {
      const el = element as HTMLElement;
      const currentClass = Array.from(el.classList).find(cls => cls.startsWith('blur-'));
      
      if (currentClass) {
        el.classList.remove(currentClass);
        
        // Apply lighter blur effect
        if (currentClass === 'blur-3xl' || currentClass === 'blur-2xl') {
          el.classList.add('blur-lg');
        } else if (currentClass === 'blur-xl' || currentClass === 'blur-lg') {
          el.classList.add('blur-md');
        } else if (currentClass === 'blur-md') {
          el.classList.add('blur-sm');
        }
      }
    });
    
    // Simplify gradients on mobile
    document.querySelectorAll('[class*="bg-gradient-"]').forEach(element => {
      const el = element as HTMLElement;
      el.classList.add('gradient-mobile-simple');
    });
  }
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.body.classList.add('reduced-motion');
  }
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  // Apply optimizations in order of importance
  optimizeForMobile(); // First check device capabilities
  lazyLoadImages(); // Setup image loading
  optimizeScroll(); // Setup scroll handling
  optimizeCSSAnimations(); // Optimize CSS animations
  optimizeAnimations(); // Setup animation optimizations
};

// Export performance constants
export const PERFORMANCE_CONSTANTS = {
  THROTTLE_DELAY: 16, // ~60fps
  DEBOUNCE_DELAY: 150,
  SCROLL_THROTTLE: 16,
  ANIMATION_DURATION: 300,
  TRANSITION_DURATION: 200,
  MOBILE_BREAKPOINT: 768,
} as const;