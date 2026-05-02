import api from './api.js';

export const bookmarkService = {
    // Get all bookmarks
    getBookmarks: async () => {
        const response = await api.get('/bookmarks');
        return response.data;
    },

    // Add bookmark
    addBookmark: async (itemId, itemType) => {
        const response = await api.post('/bookmarks/add', { itemId, itemType });
        return response.data;
    },

    // Remove bookmark
    removeBookmark: async (bookmarkId) => {
        const response = await api.delete(`/bookmarks/${bookmarkId}`);
        return response.data;
    },

    // Check if item is bookmarked
    checkBookmark: async (itemId, itemType) => {
        const response = await api.get('/bookmarks/check/' + itemId, {
            params: { itemId, itemType },
        });
        return response.data;
    },
};

export default bookmarkService;
