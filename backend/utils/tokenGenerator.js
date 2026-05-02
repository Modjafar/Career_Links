import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateAccessToken = (userId, role = 'user') => {
    return jwt.sign(
        { userId, role },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRY }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        config.JWT_REFRESH_SECRET,
        { expiresIn: config.JWT_REFRESH_EXPIRY }
    );
};

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
};

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
