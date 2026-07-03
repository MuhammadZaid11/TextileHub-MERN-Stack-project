import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/slices/orderSlice';
import { FaBox } from 'react-icons/fa';

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, isLoading, error } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getMyOrders());
    }
  }, [dispatch, navigate, userInfo]);

  const statusColor = (status) => {
    const map = {
      'Delivered': 'bg-green-100 text-green-700',
      'Cancelled': 'bg-red-100 text-red-700',
      'Shipped': 'bg-blue-100 text-blue-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Confirmed': 'bg-indigo-100 text-indigo-700',
      'Packed': 'bg-purple-100 text-purple-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Orders</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(n => <div key={n} className="animate-pulse bg-gray-200 h-24 rounded-xl"></div>)}
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-16 text-center">
          <FaBox className="text-6xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No orders yet</h2>
          <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-bold text-gray-500 text-sm mb-1">Order ID</p>
                <p className="font-bold text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className="font-bold text-gray-500 text-sm mb-1">Date</p>
                <p className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-bold text-gray-500 text-sm mb-1">Total</p>
                <p className="font-bold text-blue-700">${order.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-bold text-gray-500 text-sm mb-1">Payment</p>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-500 text-sm mb-1">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusColor(order.status)}`}>{order.status}</span>
              </div>
              <Link to={`/order/${order._id}`} className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
