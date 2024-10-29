// src/utils/debounce.ts

interface DebouncedFunction<T extends (...args: any[]) => void> {
    (...args: Parameters<T>): void;
    cancel: () => void;
  }
  
  /**
   * Creates a debounced function that delays the execution of the target function until after `delay` ms have
   * passed since the last invocation. Supports immediate execution, cancellation, and optional throttling.
   * 
   * @param func - The target function to debounce.
   * @param delay - The debounce delay in milliseconds.
   * @param options - Optional configuration for immediate execution and throttling.
   * @returns The debounced function with a cancel method.
   */
  export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
    options?: { immediate?: boolean; throttle?: boolean }
  ): DebouncedFunction<T> {
    let timer: NodeJS.Timeout | null = null;
    let lastArgs: Parameters<T> | null = null;
    let lastExecuted = 0;
  
    const debounced = (...args: Parameters<T>) => {
      lastArgs = args;
  
      // Execute immediately if the immediate option is set and the function hasn’t been called recently
      const shouldCallImmediately = options?.immediate && !timer;
      const shouldThrottle = options?.throttle && Date.now() - lastExecuted < delay;
  
      if (shouldCallImmediately) {
        func(...args);
        lastExecuted = Date.now();
      }
  
      if (timer) {
        clearTimeout(timer);
      }
  
      // Set up a delayed execution for debounce behavior
      timer = setTimeout(() => {
        if (!shouldThrottle || !options?.throttle) {
          func(...(lastArgs as Parameters<T>));
          lastExecuted = Date.now();
        }
        timer = null;
        lastArgs = null;
      }, delay);
    };
  
    // Cancel the debounced function
    debounced.cancel = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastArgs = null;
    };
  
    return debounced;
  }
  