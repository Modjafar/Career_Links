import dotenv from 'dotenv';

dotenv.config();

export const config = {
    // Server
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_URL: process.env.API_URL || 'http://localhost:5000',

    // Database
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_PROD_URI: process.env.MONGODB_PROD_URI,

    // JWT
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '30d',

    // Email
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,

    // Admin
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

    // Frontend
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

    // Pagination
    ITEMS_PER_PAGE: parseInt(process.env.ITEMS_PER_PAGE) || 10,
};

export default config;
