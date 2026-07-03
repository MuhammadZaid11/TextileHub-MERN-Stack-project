import { addToCart } from '../redux/slices/cartSlice';

/**
 * Helper to dispatch add to cart from ProductDetails or ProductCard
 */
export const addToCartHelper = (dispatch, product, qty = 1) => {
  dispatch(
    addToCart({
      _id: product._id,
      name: product.name,
      images: product.images,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    })
  );
};
