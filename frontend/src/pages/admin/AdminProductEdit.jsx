import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

const CATEGORIES = ['Cotton', 'Silk', 'Linen', 'Denim', 'Polyester', 'Rayon', 'Velvet', 'Wool', 'Khaddar', 'Printed Fabric', 'Embroidery Fabric', 'Curtain Fabric', 'Sofa Fabric', 'Bedsheets', 'Uniform Fabric', 'Industrial Fabric'];

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Cotton');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [width, setWidth] = useState('');
  const [weight, setWeight] = useState('');
  const [pattern, setPattern] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        const p = data.data;
        setName(p.name);
        setPrice(p.price);
        setImages(p.images || []);
        setBrand(p.brand);
        setCategory(p.category);
        setCountInStock(p.countInStock);
        setDescription(p.description);
        setMaterial(p.material || '');
        setWidth(p.width || '');
        setWeight(p.weight || '');
        setPattern(p.pattern || '');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product');
      }
    };
    fetchProduct();
  }, [id]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await api.post('/upload', formData, config);
      setImages((prev) => [...prev, data.data]);
    } catch (err) {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await api.put(`/products/${id}`, {
        name, price, images, brand, category, countInStock, description, material, width, weight, pattern,
      });
      setSuccessMsg('Product updated successfully!');
      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <Link to="/admin/products" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Products</Link>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Product</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">{error}</div>}
      {successMsg && <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">{successMsg}</div>}

      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
              <input className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Brand</label>
              <input className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={brand} onChange={(e) => setBrand(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
              <input type="number" min="0" step="0.01" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
              <input type="number" min="0" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
              <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Material</label>
              <input className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={material} onChange={(e) => setMaterial(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Width</label>
              <input className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g. 60 inches" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Weight</label>
              <input className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 200 GSM" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Pattern</label>
              <input className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="e.g. Solid, Printed" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Upload Image</label>
            <input type="file" onChange={uploadFileHandler} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100" />
            {uploading && <p className="text-blue-600 text-sm mt-2">Uploading...</p>}
            <div className="flex flex-wrap gap-3 mt-3">
              {images.map((img, i) => (
                <img key={i} src={img} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductEdit;
