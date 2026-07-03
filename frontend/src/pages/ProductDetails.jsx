import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, clearProductDetails } from '../redux/slices/productSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { product, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  const addToCartHandler = () => {
    // Add to cart logic will be here
    console.log(`Added ${qty} of ${product.name} to cart`);
  };

  if (isLoading) return <div className="text-center py-20"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto"></div></div>;
  if (error) return <div className="bg-red-100 text-red-700 p-4 rounded-lg my-10">{error}</div>;
  if (!product) return null;

  return (
    <div className="py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Products</Link>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center relative">
            <img 
              src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} 
              alt={product.name} 
              className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500 origin-center"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="text-sm text-blue-600 uppercase tracking-widest font-bold mb-2">{product.category}</div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center mb-6 border-b pb-6">
              <div className="flex text-yellow-400 text-lg mr-2">
                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-gray-500 text-sm">{product.numReviews} Reviews</span>
            </div>
            
            <div className="text-3xl font-extrabold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center space-x-6 mb-8">
              {/* Quantity Selector */}
              {product.countInStock > 0 && (
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  >-</button>
                  <span className="px-4 py-2 text-gray-900 font-bold border-x border-gray-300">{qty}</span>
                  <button 
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    onClick={() => setQty(qty < product.countInStock ? qty + 1 : qty)}
                  >+</button>
                </div>
              )}
              
              <button 
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className={`flex-1 py-3 rounded-lg font-bold text-white shadow-md transition-colors ${
                  product.countInStock > 0 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 space-x-4 border-t pt-6">
              <p><span className="font-semibold text-gray-900">Brand:</span> {product.brand}</p>
              <p><span className="font-semibold text-gray-900">Material:</span> {product.material || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex border-b mb-6">
          <button 
            className={`pb-4 px-6 text-lg font-bold transition-colors ${activeTab === 'description' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`pb-4 px-6 text-lg font-bold transition-colors ${activeTab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.numReviews})
          </button>
        </div>
        
        {activeTab === 'description' && (
          <div className="text-gray-600 leading-relaxed">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Product Specifications</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Width:</strong> {product.width || 'N/A'}</li>
              <li><strong>Weight:</strong> {product.weight || 'N/A'}</li>
              <li><strong>Pattern:</strong> {product.pattern || 'N/A'}</li>
              <li><strong>Availability:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</li>
            </ul>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            {product.reviews.length === 0 && <div className="bg-blue-50 text-blue-700 p-4 rounded-lg">No reviews yet. Be the first to review!</div>}
            {product.reviews.map((review) => (
              <div key={review._id} className="mb-6 pb-6 border-b last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(Math.round(review.rating))}{'☆'.repeat(5 - Math.round(review.rating))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-2">{review.createdAt.substring(0, 10)}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
