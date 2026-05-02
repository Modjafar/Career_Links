import api from './api.js';

export const authService = {
    // Register new user
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    // Logout user
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    // Refresh access token
    refreshToken: async (refreshToken) => {
        const response = await api.post('/auth/refresh-token', { refreshToken });
        return response.data;
    },
};

export default authService;
