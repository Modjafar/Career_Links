import User from '../models/User.js';
import Opportunity from '../models/Opportunity.js';
import Exam from '../models/Exam.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// Get dashboard statistics
export const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalOpportunities = await Opportunity.countDocuments();
    const totalExams = await Exam.countDocuments();

    const activeOpportunities = await Opportunity.countDocuments({ isActive: true });
    const activeExams = await Exam.countDocuments({ status: 'Active' });
    const upcomingExams = await Exam.countDocuments({ status: 'Upcoming' });

    // Recent opportunities
    const recentOpportunities = await Opportunity.find()
        .sort('-createdAt')
        .limit(5);

    // Recent exams
    const recentExams = await Exam.find()
        .sort('-createdAt')
        .limit(5);

    // Top categories
    const topCategories = await Opportunity.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
    ]);

    res.json({
        success: true,
        data: {
            stats: {
                totalUsers,
                totalOpportunities,
                totalExams,
                activeOpportunities,
                activeExams,
                upcomingExams,
            },
            recentOpportunities,
            recentExams,
            topCategories,
        },
    });
});

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const users = await User.find()
        .select('-password')
        .skip(skip)
        .limit(parseInt(limit));

    const total = await User.countDocuments();

    res.json({
        success: true,
        data: users,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        },
    });
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        throw ErrorResponse.notFound('User not found');
    }

    await User.findByIdAndDelete(userId);

    res.json({
        success: true,
        message: 'User deleted successfully',
    });
});

// Toggle user role
export const toggleUserRole = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        throw ErrorResponse.notFound('User not found');
    }

    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();

    res.json({
        success: true,
        message: `User role updated to ${user.role}`,
        data: user,
    });
});

// Highlight opportunity
export const highlightOpportunity = asyncHandler(async (req, res) => {
    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findById(opportunityId);

    if (!opportunity) {
        throw ErrorResponse.notFound('Opportunity not found');
    }

    opportunity.isHighlighted = !opportunity.isHighlighted;
    await opportunity.save();

    res.json({
        success: true,
        message: `Opportunity ${opportunity.isHighlighted ? 'highlighted' : 'unhighlighted'}`,
        data: opportunity,
    });
});

// Get statistics by category
export const getStatsByCategory = asyncHandler(async (req, res) => {
    const opportunitiesByCategory = await Opportunity.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
    ]);

    const examsByCategory = await Exam.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
    ]);

    res.json({
        success: true,
        data: {
            opportunitiesByCategory,
            examsByCategory,
        },
    });
});

export default {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    toggleUserRole,
    highlightOpportunity,
    getStatsByCategory,
};
