// Optimized smooth scrolling utility for better performance

interface ScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
}

// Optimized smooth scroll function
export const smoothScrollTo = (
  target: string | HTMLElement,
  options: ScrollOptions = {}
): Promise<void> => {
  return new Promise((resolve) => {
    const {
      duration = 800,
      easing = (t: number): number => 1 - Math.pow(1 - t, 4),
      offset = 80
    } = options;

    // Get target element
    const targetElement = typeof target === 'string' 
      ? document.querySelector(target) as HTMLElement
      : target;

    if (!targetElement) {
      resolve();
      return;
    }

    // Calculate target position
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    // If distance is very small, just jump to position
    if (Math.abs(distance) < 10) {
      window.scrollTo(0, targetPosition);
      resolve();
      return;
    }

    let startTime: number | null = null;
    let animationId: number | null = null;

    // Animation function
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Apply easing
      const easedProgress = easing(progress);
      
      // Calculate current position
      const currentPosition = startPosition + (distance * easedProgress);
      
      // Scroll to current position
      window.scrollTo(0, currentPosition);
      
      // Continue animation or resolve
      if (progress < 1) {
        animationId = requestAnimationFrame(animation);
      } else {
        resolve();
      }
    };

    // Start animation
    animationId = requestAnimationFrame(animation);

    // Cleanup function (in case we need to cancel)
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  });
};

// Throttled scroll event handler for better performance
export const createThrottledScrollHandler = (
  handler: (event: Event) => void
) => {
  let isThrottled = false;
  let lastArgs: [Event] | null = null;

  return (event: Event) => {
    lastArgs = [event];

    if (isThrottled) return;

    isThrottled = true;
    
    requestAnimationFrame(() => {
      if (lastArgs) {
        handler(lastArgs[0]);
        lastArgs = null;
      }
      isThrottled = false;
    });
  };
};

// Debounced resize handler
export const createDebouncedResizeHandler = (
  handler: (event: Event) => void,
  delay: number = 150
) => {
  let timeoutId: NodeJS.Timeout;

  return (event: Event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => handler(event), delay);
  };
};

// Intersection Observer for scroll-triggered animations
export const createScrollObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Optimized scroll position tracker
export class ScrollTracker {
  private callbacks: Set<(position: number) => void> = new Set();
  private rafId: number | null = null;
  private lastPosition = 0;

  constructor() {
    this.handleScroll = this.handleScroll.bind(this);
  }

  private handleScroll = () => {
    const currentPosition = window.pageYOffset;
    
    if (currentPosition !== this.lastPosition) {
      this.callbacks.forEach(callback => callback(currentPosition));
      this.lastPosition = currentPosition;
    }

    this.rafId = requestAnimationFrame(this.handleScroll);
  };

  subscribe(callback: (position: number) => void) {
    this.callbacks.add(callback);
    
    // Start tracking if this is the first callback
    if (this.callbacks.size === 1) {
      this.rafId = requestAnimationFrame(this.handleScroll);
    }

    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
      
      // Stop tracking if no more callbacks
      if (this.callbacks.size === 0 && this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    };
  }

  destroy() {
    this.callbacks.clear();
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

// Global scroll tracker instance
export const globalScrollTracker = new ScrollTracker();

// Utility to check if element is in viewport
export const isElementInViewport = (
  element: HTMLElement,
  threshold: number = 0
): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  );
};

// Performance-optimized scroll to top
export const scrollToTop = (duration: number = 600): Promise<void> => {
  return smoothScrollTo(document.body, { duration, offset: 0 });
};

// Get scroll progress (0 to 1)
export const getScrollProgress = (): number => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(scrollTop / docHeight, 1);
};