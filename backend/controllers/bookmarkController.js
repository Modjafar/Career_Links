import Bookmark from '../models/Bookmark.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// Get user bookmarks
export const getBookmarks = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    const bookmarks = await Bookmark.find({ userId })
        .populate('opportunityId')
        .populate('examId')
        .sort('-createdAt');

    res.json({
        success: true,
        data: bookmarks,
    });
});

// Add bookmark
export const addBookmark = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { itemId, itemType } = req.body;

    if (!itemId || !itemType) {
        throw ErrorResponse.badRequest('Please provide itemId and itemType');
    }

    if (!['opportunity', 'exam'].includes(itemType)) {
        throw ErrorResponse.badRequest('Invalid itemType. Must be opportunity or exam');
    }

    const bookmarkData = {
        userId,
        itemType,
    };

    if (itemType === 'opportunity') {
        bookmarkData.opportunityId = itemId;
    } else {
        bookmarkData.examId = itemId;
    }

    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne(bookmarkData);
    if (existingBookmark) {
        throw ErrorResponse.conflict('Already bookmarked');
    }

    const bookmark = await Bookmark.create(bookmarkData);

    res.status(201).json({
        success: true,
        message: 'Bookmark added successfully',
        data: bookmark,
    });
});

// Remove bookmark
export const removeBookmark = asyncHandler(async (req, res) => {
    const { bookmarkId } = req.params;
    const userId = req.user.userId;

    const bookmark = await Bookmark.findOneAndDelete({
        _id: bookmarkId,
        userId,
    });

    if (!bookmark) {
        throw ErrorResponse.notFound('Bookmark not found');
    }

    res.json({
        success: true,
        message: 'Bookmark removed successfully',
    });
});

// Check if item is bookmarked
export const checkBookmark = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { itemId, itemType } = req.query;

    if (!itemId || !itemType) {
        throw ErrorResponse.badRequest('Please provide itemId and itemType');
    }

    const bookmarkData = { userId, itemType };

    if (itemType === 'opportunity') {
        bookmarkData.opportunityId = itemId;
    } else {
        bookmarkData.examId = itemId;
    }

    const bookmark = await Bookmark.findOne(bookmarkData);

    res.json({
        success: true,
        isBookmarked: !!bookmark,
        bookmarkId: bookmark ? bookmark._id : null,
    });
});

export default {
    getBookmarks,
    addBookmark,
    removeBookmark,
    checkBookmark,
};
