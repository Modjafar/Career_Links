import express from 'express';
import {
    getExams,
    getExam,
    getExamsByCategory,
    getActiveExams,
    getUpcomingExams,
    createExam,
    updateExam,
    deleteExam,
} from '../controllers/examController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getExams);
router.get('/active/all', getActiveExams);
router.get('/upcoming/all', getUpcomingExams);
router.get('/category/:category', getExamsByCategory);
router.get('/:id', getExam);

// Protected routes (admin only)
router.post('/', verifyToken, verifyAdmin, createExam);
router.put('/:id', verifyToken, verifyAdmin, updateExam);
router.delete('/:id', verifyToken, verifyAdmin, deleteExam);

export default router;
