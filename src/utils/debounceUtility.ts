// src/utils/debounceUtility.ts

/**
 * Creates a debounced version of a function that delays invoking the function until after
 * a specified wait time has elapsed since the last time it was invoked.
 * @param func - Function to debounce.
 * @param wait - Time in milliseconds to delay.
 * @param options - Options to control leading and trailing edge invocation.
 * @returns Debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options: { leading?: boolean; trailing?: boolean } = { leading: false, trailing: true }
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    let lastArgs: Parameters<T> | null = null;
    let lastContext: any = null;
    let result: ReturnType<T> | undefined;
    let lastCallTime: number | null = null;
  
    const shouldInvoke = (time: number) => {
      if (lastCallTime === null) return true;
      return time - lastCallTime >= wait;
    };
  
    const invokeFunction = (time: number) => {
      lastCallTime = time;
      result = func.apply(lastContext, lastArgs as Parameters<T>);
      lastContext = lastArgs = null;
    };
  
    const leadingEdge = (time: number) => {
      if (options.leading) {
        invokeFunction(time);
      }
      timeout = setTimeout(timerExpired, wait);
    };
  
    const trailingEdge = () => {
      timeout = null;
      if (options.trailing && lastArgs) {
        invokeFunction(Date.now());
      }
    };
  
    const timerExpired = () => {
      const time = Date.now();
      if (shouldInvoke(time)) {
        trailingEdge();
      } else {
        timeout = setTimeout(timerExpired, wait - (time - (lastCallTime as number)));
      }
    };
  
    const debounced = function (this: any, ...args: Parameters<T>) {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);
  
      lastContext = this;
      lastArgs = args;
  
      if (isInvoking) {
        if (timeout === null) leadingEdge(time);
        else trailingEdge();
      }
      return result;
    };
  
    debounced.cancel = () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      lastContext = lastArgs = timeout = null;
      lastCallTime = null;
    };
  
    return debounced;
  }
  
  export default debounce;
  