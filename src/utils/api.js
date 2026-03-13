// utils/api.js
const API_URL = import.meta.env.VITE_API_URL || "https://mosak-api.onrender.com";

class ApiClient {
  constructor() {
    this.baseURL = API_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      credentials: 'include', // Always include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, mergedOptions);
      
      // Handle 401 Unauthorized - token expired
      if (response.status === 401) {
        // Try to refresh token
        const refreshResult = await this.refreshToken();
        if (refreshResult.success) {
          // Retry the original request
          return this.request(endpoint, options);
        } else {
          // Redirect to login
          window.location.href = '/';
          throw new Error('Session expired. Please login again.');
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async refreshToken() {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });
      return { success: response.ok };
    } catch {
      return { success: false };
    }
  }

  // Convenience methods
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();