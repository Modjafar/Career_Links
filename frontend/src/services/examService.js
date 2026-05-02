import api from './api.js';

export const examService = {
    // Get all exams
    getExams: async (params = {}) => {
        const response = await api.get('/exams', { params });
        return response.data;
    },

    // Get single exam
    getExam: async (id) => {
        const response = await api.get(`/exams/${id}`);
        return response.data;
    },

    // Get exams by category
    getExamsByCategory: async (category) => {
        const response = await api.get(`/exams/category/${category}`);
        return response.data;
    },

    // Get active exams
    getActiveExams: async () => {
        const response = await api.get('/exams/active/all');
        return response.data;
    },

    // Get upcoming exams
    getUpcomingExams: async () => {
        const response = await api.get('/exams/upcoming/all');
        return response.data;
    },

    // Create exam (admin)
    createExam: async (data) => {
        const response = await api.post('/exams', data);
        return response.data;
    },

    // Update exam (admin)
    updateExam: async (id, data) => {
        const response = await api.put(`/exams/${id}`, data);
        return response.data;
    },

    // Delete exam (admin)
    deleteExam: async (id) => {
        const response = await api.delete(`/exams/${id}`);
        return response.data;
    },
};

export default examService;
