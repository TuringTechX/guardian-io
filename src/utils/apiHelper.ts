// src/utils/apiHelper.ts

export function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
 
// src/utils/apiHelper.ts

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Perform API GET Request
export const apiGet = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API GET Error:', error);
    return { data: null, error: error.message };
  }
};

// Perform API POST Request
export const apiPost = async <T>(url: string, body: Record<string, any>): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API POST Error:', error);
    return { data: null, error: error.message };
  }
};

// Retry API Requests
export const apiWithRetry = async <T>(requestFn: () => Promise<ApiResponse<T>>, retries = 3): Promise<ApiResponse<T>> => {
  let attempts = 0;
  let result: ApiResponse<T> = { data: null, error: null };

  while (attempts < retries) {
    result = await requestFn();
    if (!result.error) {
      return result; // Success
    }
    attempts++;
    console.warn(`Retrying API request (${attempts}/${retries})`);
  }

  return result;
};
