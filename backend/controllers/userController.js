import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findById(userId)
        .populate('bookmarkedOpportunities')
        .populate('bookmarkedExams');

    if (!user) {
        throw ErrorResponse.notFound('User not found');
    }

    res.json({
        success: true,
        data: user,
    });
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { name, phone, avatar } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    });

    res.json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
    });
});

// Get notifications
export const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { read } = req.query;

    const user = await User.findById(userId);

    if (!user) {
        throw ErrorResponse.notFound('User not found');
    }

    let notifications = user.notifications;

    if (read === 'true') {
        notifications = notifications.filter((n) => n.read);
    } else if (read === 'false') {
        notifications = notifications.filter((n) => !n.read);
    }

    res.json({
        success: true,
        data: notifications,
    });
});

// Mark notification as read
export const markNotificationAsRead = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { notificationId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        throw ErrorResponse.notFound('User not found');
    }

    const notification = user.notifications.find(
        (n) => n._id.toString() === notificationId
    );

    if (!notification) {
        throw ErrorResponse.notFound('Notification not found');
    }

    notification.read = true;
    await user.save();

    res.json({
        success: true,
        message: 'Notification marked as read',
    });
});

export default {
    getUserProfile,
    updateUserProfile,
    getNotifications,
    markNotificationAsRead,
};
