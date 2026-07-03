import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tight">
          TEXTILE<span className="text-gray-800">HUB</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="text-gray-600 hover:text-blue-600 flex items-center relative">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none">
                <FaUser className="mr-1" /> {userInfo.name}
              </button>
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block border border-gray-100 z-50">
                <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">My Profile</Link>
                <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">My Orders</Link>
                {userInfo.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium">Admin Dashboard</Link>
                )}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
