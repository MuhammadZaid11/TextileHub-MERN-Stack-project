import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    const categoryExists = await Category.findOne({ name });
    
    if (categoryExists) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = await Category.create({ name, description, image });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await Category.deleteOne({ _id: category._id });
      res.json({ success: true, message: 'Category removed' });
    } else {
      res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
};
