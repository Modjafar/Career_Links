import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    getNotifications,
    markNotificationAsRead,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// All user routes require authentication
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.get('/notifications', verifyToken, getNotifications);
router.put('/notifications/:notificationId/read', verifyToken, markNotificationAsRead);

export default router;
