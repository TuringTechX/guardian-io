// src/utils/retryHelper.ts

export const retryPromise = async (fn: Function, retries: number): Promise<any> => {
    let attempts = 0;
    while (attempts < retries) {
      try {
        return await fn();
      } catch (error) {
        attempts++;
        if (attempts >= retries) throw error;
      }
    }
  };
  