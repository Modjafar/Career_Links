import api from './api.js';

export const userService = {
    // Get user profile
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },

    // Update user profile
    updateProfile: async (data) => {
        const response = await api.put('/users/profile', data);
        return response.data;
    },

    // Get notifications
    getNotifications: async (read = null) => {
        const params = read !== null ? { read } : {};
        const response = await api.get('/users/notifications', { params });
        return response.data;
    },

    // Mark notification as read
    markNotificationAsRead: async (notificationId) => {
        const response = await api.put(`/users/notifications/${notificationId}/read`);
        return response.data;
    },
};

export default userService;
