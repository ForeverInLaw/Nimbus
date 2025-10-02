import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Enhanced Axios API Client with interceptors
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response, message } = error;

    // Network error
    if (!response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = response;

    // Handle different error status codes
    switch (status) {
      case 401:
        // Unauthorized - Clear token and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('Session expired. Please login again.');
          
          // Only redirect if not already on login page
          if (window.location.pathname !== '/') {
            window.location.href = '/';
          }
        }
        break;

      case 403:
        toast.error('You do not have permission to perform this action.');
        break;

      case 404:
        toast.error('Resource not found.');
        break;

      case 422:
        // Validation error
        toast.error(data?.message || 'Validation error. Please check your input.');
        break;

      case 429:
        toast.error('Too many requests. Please try again later.');
        break;

      case 500:
      case 502:
      case 503:
        toast.error('Server error. Please try again later.');
        break;

      default:
        toast.error(data?.message || 'An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to make GET requests
 * @param {string} url 
 * @param {object} config 
 * @returns {Promise}
 */
export const get = (url, config = {}) => apiClient.get(url, config);

/**
 * Helper function to make POST requests
 * @param {string} url 
 * @param {object} data 
 * @param {object} config 
 * @returns {Promise}
 */
export const post = (url, data = {}, config = {}) => apiClient.post(url, data, config);

/**
 * Helper function to make PUT requests
 * @param {string} url 
 * @param {object} data 
 * @param {object} config 
 * @returns {Promise}
 */
export const put = (url, data = {}, config = {}) => apiClient.put(url, data, config);

/**
 * Helper function to make DELETE requests
 * @param {string} url 
 * @param {object} config 
 * @returns {Promise}
 */
export const del = (url, config = {}) => apiClient.delete(url, config);

/**
 * Helper function to make PATCH requests
 * @param {string} url 
 * @param {object} data 
 * @param {object} config 
 * @returns {Promise}
 */
export const patch = (url, data = {}, config = {}) => apiClient.patch(url, data, config);

export default apiClient;
