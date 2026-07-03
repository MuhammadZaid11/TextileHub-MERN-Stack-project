import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItemToCart = (product, qty = 1) => {
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
    navigate('/cart');
  };

  return { addItemToCart };
};

export default useCart;
