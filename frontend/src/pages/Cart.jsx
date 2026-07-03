import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQtyHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return (
    <div className="py-8">
      <div className="flex items-center mb-8">
        <Link to="/" className="flex items-center text-blue-600 hover:underline mr-4">
          <FaArrowLeft className="mr-2" /> Continue Shopping
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-16 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items yet.</p>
          <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 border border-gray-100">
                <img
                  src={item.images?.[0] || '/placeholder.jpg'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-grow">
                  <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-800 hover:text-blue-600">
                    {item.name}
                  </Link>
                  <p className="text-blue-700 font-bold text-lg mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    onClick={() => updateQtyHandler(item, item.qty - 1)}
                    disabled={item.qty <= 1}
                  >-</button>
                  <span className="px-4 py-1 font-bold border-x border-gray-300">{item.qty}</span>
                  <button
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    onClick={() => updateQtyHandler(item, item.qty + 1)}
                    disabled={item.qty >= item.countInStock}
                  >+</button>
                </div>
                <p className="font-bold text-gray-900 w-20 text-right">${(item.price * item.qty).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCartHandler(item._id)}
                  className="text-red-500 hover:text-red-700 p-2 ml-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 h-fit sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">Order Summary</h2>
            <div className="space-y-3 text-gray-700 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span className="font-semibold">${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (15%)</span>
                <span className="font-semibold">${taxPrice}</span>
              </div>
              <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-4 border-t">
                <span>Total</span>
                <span className="text-blue-700">${totalPrice}</span>
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Proceed to Checkout
            </button>
            {shippingPrice === 0 && (
              <p className="text-center text-green-600 text-sm font-semibold mt-4">🎉 You qualify for free shipping!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
