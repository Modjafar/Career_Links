import Exam from '../models/Exam.js';
import { config } from '../config/env.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// Get all exams with filters
export const getExams = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = config.ITEMS_PER_PAGE,
        category,
        status,
        notification,
        search,
        sort = '-createdAt',
    } = req.query;

    const filter = { isActive: true };

    if (category && category !== 'all') {
        filter.category = category;
    }

    if (status && status !== 'all') {
        filter.status = status;
    }

    if (notification && notification !== 'all') {
        filter.notification = notification;
    }

    if (search) {
        filter.$text = { $search: search };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const exams = await Exam.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum);

    const total = await Exam.countDocuments(filter);

    res.json({
        success: true,
        data: exams,
        pagination: {
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            totalItems: total,
            itemsPerPage: limitNum,
        },
    });
});

// Get single exam
export const getExam = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
        throw ErrorResponse.notFound('Exam not found');
    }

    exam.views += 1;
    await exam.save();

    res.json({
        success: true,
        data: exam,
    });
});

// Get exams by category
export const getExamsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    const exams = await Exam.find({
        category,
        isActive: true,
    }).sort('-createdAt');

    res.json({
        success: true,
        data: exams,
    });
});

// Get active exams
export const getActiveExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find({
        status: 'Active',
        isActive: true,
    })
        .sort('-createdAt')
        .limit(20);

    res.json({
        success: true,
        data: exams,
    });
});

// Get upcoming exams
export const getUpcomingExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find({
        status: 'Upcoming',
        isActive: true,
    })
        .sort('examDate')
        .limit(20);

    res.json({
        success: true,
        data: exams,
    });
});

// Create exam (admin only)
export const createExam = asyncHandler(async (req, res) => {
    const {
        examTitle,
        organization,
        category,
        description,
        eligibility,
        examPattern,
        syllabusLink,
        applyLink,
        notificationLink,
        registrationStartDate,
        registrationLastDate,
        examDate,
        admitCardDate,
        resultDate,
        status,
        notification,
    } = req.body;

    if (
        !examTitle ||
        !organization ||
        !category ||
        !eligibility ||
        !applyLink ||
        !registrationStartDate ||
        !registrationLastDate ||
        !examDate
    ) {
        throw ErrorResponse.badRequest('Please provide all required fields');
    }

    const exam = await Exam.create({
        examTitle,
        organization,
        category,
        description,
        eligibility,
        examPattern,
        syllabusLink,
        applyLink,
        notificationLink,
        registrationStartDate,
        registrationLastDate,
        examDate,
        admitCardDate,
        resultDate,
        status: status || 'Active',
        notification: notification || 'Active-Form',
        createdBy: req.user.userId,
    });

    res.status(201).json({
        success: true,
        message: 'Exam created successfully',
        data: exam,
    });
});

// Update exam (admin only)
export const updateExam = asyncHandler(async (req, res) => {
    let exam = await Exam.findById(req.params.id);

    if (!exam) {
        throw ErrorResponse.notFound('Exam not found');
    }

    exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.json({
        success: true,
        message: 'Exam updated successfully',
        data: exam,
    });
});

// Delete exam (admin only)
export const deleteExam = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
        throw ErrorResponse.notFound('Exam not found');
    }

    await Exam.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: 'Exam deleted successfully',
    });
});

export default {
    getExams,
    getExam,
    getExamsByCategory,
    getActiveExams,
    getUpcomingExams,
    createExam,
    updateExam,
    deleteExam,
};
