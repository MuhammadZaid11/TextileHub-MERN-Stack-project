import express from 'express';
import { getProducts, getProductById, createProductReview } from '../controllers/productController.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/adminProductController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
