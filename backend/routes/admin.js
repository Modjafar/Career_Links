import express from 'express';
import {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    toggleUserRole,
    highlightOpportunity,
    getStatsByCategory,
} from '../controllers/adminController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.get('/dashboard', verifyToken, verifyAdmin, getDashboardStats);
router.get('/users', verifyToken, verifyAdmin, getAllUsers);
router.delete('/users/:userId', verifyToken, verifyAdmin, deleteUser);
router.put('/users/:userId/role', verifyToken, verifyAdmin, toggleUserRole);
router.put('/opportunities/:opportunityId/highlight', verifyToken, verifyAdmin, highlightOpportunity);
router.get('/stats/category', verifyToken, verifyAdmin, getStatsByCategory);

export default router;
