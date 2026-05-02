import Opportunity from '../models/Opportunity.js';
import { config } from '../config/env.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';


// Get all opportunities with filters and pagination
export const getOpportunities = asyncHandler(async (req, res) => {
    const {

        page = 1,
        limit = config.ITEMS_PER_PAGE,
        category,
        type,
        search,
        sort = '-createdAt',
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category && category !== 'all') {
        filter.category = category;
    }

    if (type && type !== 'all') {
        filter.type = type;
    }

    if (search) {
        filter.$text = { $search: search };
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get opportunities
    const opportunities = await Opportunity.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum);

    // Get total count
    const total = await Opportunity.countDocuments(filter);

    res.json({
        success: true,
        data: opportunities,
        pagination: {
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            totalItems: total,
            itemsPerPage: limitNum,
        },
    });
});


// Get single opportunity
export const getOpportunity = asyncHandler(async (req, res) => {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
        throw ErrorResponse.notFound('Opportunity not found');
    }

    // Increment views
    opportunity.views += 1;
    await opportunity.save();

    res.json({
        success: true,
        data: opportunity,
    });
});


// Create opportunity (admin only)
export const createOpportunity = asyncHandler(async (req, res) => {
    const {
        title,
        company,
        type,
        category,
        description,
        eligibility,
        stipend,
        duration,
        workType,
        applyLink,
        deadline,
        isPaid,
    } = req.body;

    // Validation
    if (!title || !company || !type || !category || !applyLink || !deadline) {
        throw ErrorResponse.badRequest('Please provide all required fields');
    }

    const opportunity = await Opportunity.create({
        title,
        company,
        type,
        category,
        description,
        eligibility,
        stipend,
        duration,
        workType,
        applyLink,
        deadline,
        isPaid,
        createdBy: req.user.userId,
    });

    res.status(201).json({
        success: true,
        message: 'Opportunity created successfully',
        data: opportunity,
    });
});


// Update opportunity (admin only)
export const updateOpportunity = asyncHandler(async (req, res) => {
    let opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
        throw ErrorResponse.notFound('Opportunity not found');
    }

    opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.json({
        success: true,
        message: 'Opportunity updated successfully',
        data: opportunity,
    });
});


// Delete opportunity (admin only)
export const deleteOpportunity = asyncHandler(async (req, res) => {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
        throw ErrorResponse.notFound('Opportunity not found');
    }

    await Opportunity.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: 'Opportunity deleted successfully',
    });
});


// Get highlighted opportunities
export const getHighlighted = asyncHandler(async (req, res) => {
    const opportunities = await Opportunity.find({
        isActive: true,
        isHighlighted: true,
    }).limit(10);

    res.json({
        success: true,
        data: opportunities,
    });
});


export default {
    getOpportunities,
    getOpportunity,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getHighlighted,
};
