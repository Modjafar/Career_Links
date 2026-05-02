import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { config } from './config/env.js';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.js';
import opportunityRoutes from './routes/opportunities.js';
import examRoutes from './routes/exams.js';
import bookmarkRoutes from './routes/bookmarks.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // In development, allow any localhost origin
        if (config.NODE_ENV === 'development' &&
            (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:'))) {
            return callback(null, true);
        }

        // Check against configured frontend URL
        if (origin === config.FRONTEND_URL) {
            return callback(null, true);
        }

        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
};

app.use(cors(corsOptions));


// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Career Links API is running',
        timestamp: new Date().toISOString(),
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API Documentation: http://localhost:${PORT}/api`);
    console.log(`🌍 Environment: ${config.NODE_ENV}`);
});

export default app;
