import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../redux/slices/orderSlice';

const STATUS_STEPS = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const mockPayHandler = () => {
    dispatch(payOrder({
      orderId: id,
      paymentResult: {
        id: `MOCK_${Date.now()}`,
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: order?.user?.email,
      }
    }));
  };

  const currentStatusIndex = order ? STATUS_STEPS.indexOf(order.status) : 0;

  if (isLoading) return <div className="text-center py-20"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto"></div></div>;
  if (error) return <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-10">{error}</div>;
  if (!order) return null;

  return (
    <div className="py-8">
      <Link to="/orders" className="text-blue-600 hover:underline mb-6 inline-block">&larr; My Orders</Link>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h1>
          <p className="text-gray-500 text-sm mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`px-4 py-2 rounded-full font-bold text-sm ${
          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
          order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>{order.status}</span>
      </div>

      {/* Order Tracker */}
      {order.status !== 'Cancelled' && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Order Tracking</h2>
          <div className="flex items-center">
            {STATUS_STEPS.map((step, index) => (
              <div key={step} className="flex-1 flex items-center">
                <div className="flex flex-col items-center w-full">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    index <= currentStatusIndex ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {index < currentStatusIndex ? '✓' : index + 1}
                  </div>
                  <span className={`text-xs mt-2 font-semibold text-center ${index <= currentStatusIndex ? 'text-blue-600' : 'text-gray-400'}`}>{step}</span>
                </div>
                {index < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 rounded ${index < currentStatusIndex ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <span className="flex-grow font-medium text-gray-800">{item.name}</span>
                <span className="text-gray-600">{item.qty} × ${item.price.toFixed(2)}</span>
                <span className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Shipping Address</h3>
            <p className="text-gray-600">
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between"><span>Items</span><span>${order.itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${order.shippingPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${order.taxPrice.toFixed(2)}</span></div>
              <div className="flex justify-between font-extrabold text-lg text-gray-900 pt-3 border-t">
                <span>Total</span><span className="text-blue-700">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Payment</h3>
            <p className="text-gray-600 mb-2">{order.paymentMethod}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Not Paid'}
            </span>
            {!order.isPaid && order.paymentMethod !== 'Cash on Delivery' && (
              <button onClick={mockPayHandler} className="mt-4 w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition">
                Mark as Paid (Mock)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
