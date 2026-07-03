import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { useSelector as useReduxSelector } from 'react-redux';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const AdminProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, navigate, userInfo]);

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        dispatch(fetchProducts());
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting product');
      }
    }
  };

  const createProductHandler = async () => {
    try {
      const { data } = await api.post('/products');
      navigate(`/admin/products/${data.data._id}/edit`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating product');
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Products</h1>
        <button onClick={createProductHandler} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
          <FaPlus /> Create Product
        </button>
      </div>

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
                  {['ID', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">#{product._id.slice(-8)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.countInStock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <Link to={`/admin/products/${product._id}/edit`} className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition">
                        <FaEdit />
                      </Link>
                      <button onClick={() => deleteProductHandler(product._id)} className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition">
                        <FaTrash />
                      </button>
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

export default AdminProductList;
