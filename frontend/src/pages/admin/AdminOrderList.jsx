import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

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

const AdminOrderList = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    } else {
      fetchOrders();
    }
  }, [userInfo, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading orders');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatusHandler = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status } : o));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Orders</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3,4,5].map(n => <div key={n} className="animate-pulse bg-gray-200 h-16 rounded-xl"></div>)}
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Order ID', 'Customer', 'Date', 'Total', 'Paid', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4 font-mono text-xs text-gray-500">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-5 py-4 font-semibold text-gray-800">{order.user?.name || 'N/A'}</td>
                    <td className="px-5 py-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4 font-bold text-gray-900">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        className="bg-gray-100 border-0 rounded-lg px-2 py-1 text-xs font-bold focus:ring-2 focus:ring-blue-500"
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(e) => updateStatusHandler(order._id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline font-semibold text-xs">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
