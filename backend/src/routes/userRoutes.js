import express from 'express';
import { getUsers, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
