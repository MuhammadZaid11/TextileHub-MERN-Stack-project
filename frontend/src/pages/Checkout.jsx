import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrderCreate } from '../redux/slices/orderSlice';
import { clearCartItems, saveShippingAddress, savePaymentMethod } from '../redux/slices/cartSlice';

const STEPS = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { order, isLoading, isSuccess, error } = useSelector((state) => state.order);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [selectedPayment, setSelectedPayment] = useState(paymentMethod || 'Cash on Delivery');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (isSuccess && order) {
      dispatch(clearCartItems());
      dispatch(resetOrderCreate());
      navigate(`/order/${order._id}`);
    }
  }, [isSuccess, order, dispatch, navigate]);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    setStep(1);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(selectedPayment));
    setStep(2);
  };

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress: { address, city, postalCode, country },
      paymentMethod: selectedPayment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice: Number(totalPrice),
    }));
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      {/* Step Progress Bar */}
      <div className="flex items-center mb-12">
        {STEPS.map((label, index) => (
          <div key={label} className="flex-1 flex items-center">
            <div className="flex flex-col items-center w-full">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                index < step ? 'bg-green-500 border-green-500 text-white' :
                index === step ? 'bg-blue-600 border-blue-600 text-white' :
                'bg-white border-gray-300 text-gray-400'
              }`}>
                {index < step ? '✓' : index + 1}
              </div>
              <span className={`text-xs mt-2 font-semibold ${index === step ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded ${index < step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Shipping */}
      {step === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Address</h2>
          <form onSubmit={handleShippingSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address</label>
              <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Karachi" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Postal Code</label>
                <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required placeholder="75000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
              <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={country} onChange={(e) => setCountry(e.target.value)} required placeholder="Pakistan" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition mt-2">
              Continue to Payment
            </button>
          </form>
        </div>
      )}

      {/* Step 1: Payment */}
      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            {['Cash on Delivery', 'Credit/Debit Card (Mock)', 'Bank Transfer (Mock)'].map((method) => (
              <label key={method} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${selectedPayment === method ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={selectedPayment === method}
                  onChange={() => setSelectedPayment(method)}
                  className="w-4 h-4 text-blue-600 mr-3"
                />
                <span className="font-semibold text-gray-800">{method}</span>
              </label>
            ))}
            <div className="flex gap-4 mt-4">
              <button type="button" onClick={() => setStep(0)} className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">
                Back
              </button>
              <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
                Continue to Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Review & Place Order */}
      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Shipping</h3>
              <p className="text-gray-600">{address}, {city} {postalCode}, {country}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Payment</h3>
              <p className="text-gray-600">{selectedPayment}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                  <img src={item.images?.[0] || '/placeholder.jpg'} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <span className="flex-grow font-medium text-gray-800">{item.name}</span>
                  <span className="text-gray-600">{item.qty} × ${item.price.toFixed(2)} = <strong>${(item.qty * item.price).toFixed(2)}</strong></span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b">Order Summary</h3>
            <div className="space-y-3 text-gray-700 mb-6">
              <div className="flex justify-between"><span>Items</span><span>${itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shippingPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${taxPrice}</span></div>
              <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-4 border-t">
                <span>Total</span><span className="text-blue-700">${totalPrice}</span>
              </div>
            </div>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</div>}
            <button onClick={() => setStep(1)} className="w-full border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition mb-3">
              Back
            </button>
            <button
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0 || isLoading}
              className={`w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
