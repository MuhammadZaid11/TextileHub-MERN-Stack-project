import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const categoryFilter = req.query.category ? { category: req.query.category } : {};

    const filters = { ...keyword, ...categoryFilter };

    const count = await Product.countDocuments(filters);
    const products = await Product.find(filters)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      data: {
        products,
        page,
        pages: Math.ceil(count / pageSize),
        count,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create product review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ success: false, message: 'Product already reviewed' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ success: true, message: 'Review added' });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};
