import express from 'express';
import {
    getBookmarks,
    addBookmark,
    removeBookmark,
    checkBookmark,
} from '../controllers/bookmarkController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// All bookmark routes require authentication
router.get('/', verifyToken, getBookmarks);
router.post('/add', verifyToken, addBookmark);
router.delete('/:bookmarkId', verifyToken, removeBookmark);
router.get('/check/:itemId', verifyToken, checkBookmark);

export default router;
