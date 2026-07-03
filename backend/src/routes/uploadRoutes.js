import express from 'express';
import upload from '../utils/upload.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.send({
    success: true,
    message: 'Image Uploaded',
    data: `/${req.file.path.replace(/\\/g, '/')}`,
  });
});

export default router;
