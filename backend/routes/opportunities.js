import express from 'express';
import {
    getOpportunities,
    getOpportunity,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getHighlighted,
} from '../controllers/opportunityController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getOpportunities);
router.get('/featured/highlighted', getHighlighted);
router.get('/:id', getOpportunity);

// Protected routes (admin only)
router.post('/', verifyToken, verifyAdmin, createOpportunity);
router.put('/:id', verifyToken, verifyAdmin, updateOpportunity);
router.delete('/:id', verifyToken, verifyAdmin, deleteOpportunity);

export default router;
