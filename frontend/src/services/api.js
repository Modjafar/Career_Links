import axios from 'axios';
import { API_URL, STORAGE_KEYS } from '../utils/constants.js';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});


// Add request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Helper to extract user-friendly error message
const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.response?.status) {
        const statusMessages = {
            400: 'Bad request. Please check your input.',
            401: 'Session expired. Please log in again.',
            403: 'You do not have permission to perform this action.',
            404: 'The requested resource was not found.',
            409: 'A conflict occurred. Please try again.',
            422: 'Validation failed. Please check your input.',
            429: 'Too many requests. Please slow down.',
            500: 'Server error. Please try again later.',
            502: 'Service temporarily unavailable.',
            503: 'Service unavailable. Please try again later.',
        };
        return statusMessages[error.response.status] || `Request failed with status ${error.response.status}`;
    }
    if (error.code === 'ECONNABORTED') {
        return 'Request timed out. Please check your connection and try again.';
    }
    if (error.code === 'ERR_NETWORK') {
        return 'Network error. Please check your internet connection.';
    }
    return error.message || 'An unexpected error occurred. Please try again.';
};

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
            if (refreshToken) {
                try {
                    const response = await api.post('/auth/refresh-token', { refreshToken });
                    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.data.accessToken);
                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }

        // Attach user-friendly message to error
        error.userMessage = getErrorMessage(error);
        return Promise.reject(error);
    }
);


export default api;
