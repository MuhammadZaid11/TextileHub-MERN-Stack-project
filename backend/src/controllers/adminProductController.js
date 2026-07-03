import Product from '../models/Product.js';

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      images: ['/images/sample.jpg'],
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      images,
      brand,
      category,
      countInStock,
      material,
      width,
      weight,
      pattern
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.images = images;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.material = material;
      product.width = width;
      product.weight = weight;
      product.pattern = pattern;

      const updatedProduct = await product.save();
      res.json({ success: true, data: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ success: true, message: 'Product removed' });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};
