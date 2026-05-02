import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenerator.js';




export const register = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
        throw ErrorResponse.badRequest('Please provide name, email, and password');
    }

    if (password !== confirmPassword) {
        throw ErrorResponse.badRequest('Passwords do not match');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw ErrorResponse.conflict('Email already registered');
    }

    // Create new user
    const newUser = await User.create({
        name,
        email,
        password,
    });

    const accessToken = generateAccessToken(newUser._id, newUser.role);
    const refreshToken = generateRefreshToken(newUser._id);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            accessToken,
            refreshToken,
        },
    });
});


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        throw ErrorResponse.badRequest('Please provide email and password');
    }

    // Find user and get password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw ErrorResponse.unauthorized('Invalid email or password');
    }

    // Check password
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
        throw ErrorResponse.unauthorized('Invalid email or password');
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    res.json({
        success: true,
        message: 'Login successful',
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken,
        },
    });
});


export const logout = (req, res) => {
    // JWT is stateless, so logout is handled on client side
    res.json({
        success: true,
        message: 'Logged out successfully',
    });
};

export const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw ErrorResponse.badRequest('Refresh token required');
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
        throw ErrorResponse.unauthorized('User not found');
    }

    const accessToken = generateAccessToken(user._id, user.role);

    res.json({
        success: true,
        message: 'Token refreshed',
        data: { accessToken },
    });
});


export default {
    register,
    login,
    logout,
    refreshToken,
};
