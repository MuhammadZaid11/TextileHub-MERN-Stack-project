import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBox, FaUsers, FaShoppingCart, FaDollarSign, FaClipboardList, FaTachometerAlt, FaTags } from 'react-icons/fa';

const StatCard = ({ icon, title, value, color }) => (
  <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${color} flex items-center gap-5`}>
    <div className={`text-4xl ${color.replace('border-l-4 border-', 'text-')}`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm font-semibold">{title}</p>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex min-h-[80vh]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white rounded-2xl mr-8 p-6 flex-shrink-0 hidden lg:flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-extrabold">TEXTILEHUB</h2>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
        <nav className="space-y-2 flex-grow">
          {[
            { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/admin/dashboard' },
            { icon: <FaBox />, label: 'Products', path: '/admin/products' },
            { icon: <FaTags />, label: 'Categories', path: '/admin/categories' },
            { icon: <FaShoppingCart />, label: 'Orders', path: '/admin/orders' },
            { icon: <FaUsers />, label: 'Customers', path: '/admin/users' },
          ].map(({ icon, label, path }) => (
            <Link key={label} to={path} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium">
              <span>{icon}</span> {label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="text-gray-400 hover:text-white text-sm">← Back to Store</Link>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, {userInfo?.name}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<FaDollarSign />} title="Total Revenue" value="$24,560" color="border-blue-500" />
          <StatCard icon={<FaShoppingCart />} title="Total Orders" value="148" color="border-green-500" />
          <StatCard icon={<FaUsers />} title="Customers" value="89" color="border-purple-500" />
          <StatCard icon={<FaBox />} title="Products" value="52" color="border-yellow-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/admin/products/new" className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
                <span className="font-semibold text-blue-700">+ Add New Product</span>
                <FaBox className="text-blue-500" />
              </Link>
              <Link to="/admin/orders" className="flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition">
                <span className="font-semibold text-green-700">View Pending Orders</span>
                <FaClipboardList className="text-green-500" />
              </Link>
              <Link to="/admin/categories" className="flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition">
                <span className="font-semibold text-purple-700">Manage Categories</span>
                <FaTags className="text-purple-500" />
              </Link>
            </div>
          </div>

          {/* Order Status Breakdown */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
            <div className="space-y-3">
              {[
                { label: 'Pending', count: 24, color: 'bg-yellow-500', pct: '16%' },
                { label: 'Shipped', count: 38, color: 'bg-blue-500', pct: '26%' },
                { label: 'Delivered', count: 74, color: 'bg-green-500', pct: '50%' },
                { label: 'Cancelled', count: 12, color: 'bg-red-500', pct: '8%' },
              ].map(({ label, count, color, pct }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`${color} h-2 rounded-full`} style={{ width: pct }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
