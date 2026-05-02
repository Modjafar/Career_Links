import api from './api.js';

export const opportunityService = {
    // Get all opportunities
    getOpportunities: async (params = {}) => {
        const response = await api.get('/opportunities', { params });
        return response.data;
    },

    // Get single opportunity
    getOpportunity: async (id) => {
        const response = await api.get(`/opportunities/${id}`);
        return response.data;
    },

    // Create opportunity (admin)
    createOpportunity: async (data) => {
        const response = await api.post('/opportunities', data);
        return response.data;
    },

    // Update opportunity (admin)
    updateOpportunity: async (id, data) => {
        const response = await api.put(`/opportunities/${id}`, data);
        return response.data;
    },

    // Delete opportunity (admin)
    deleteOpportunity: async (id) => {
        const response = await api.delete(`/opportunities/${id}`);
        return response.data;
    },

    // Get featured/highlighted opportunities
    getHighlighted: async () => {
        const response = await api.get('/opportunities/featured/highlighted');
        return response.data;
    },
};

export default opportunityService;
