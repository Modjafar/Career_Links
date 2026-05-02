import api from './api.js';

export const adminService = {
    // Get dashboard stats
    getDashboardStats: async () => {
        const response = await api.get('/admin/dashboard');
        return response.data;
    },

    // Get all users
    getAllUsers: async (params = {}) => {
        const response = await api.get('/admin/users', { params });
        return response.data;
    },

    // Delete user
    deleteUser: async (userId) => {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    },

    // Toggle user role
    toggleUserRole: async (userId) => {
        const response = await api.put(`/admin/users/${userId}/role`);
        return response.data;
    },

    // Highlight opportunity
    highlightOpportunity: async (opportunityId) => {
        const response = await api.put(`/admin/opportunities/${opportunityId}/highlight`);
        return response.data;
    },

    // Get statistics by category
    getStatsByCategory: async () => {
        const response = await api.get('/admin/stats/category');
        return response.data;
    },
};

export default adminService;
