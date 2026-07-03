import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <Link to={`/product/${product._id}`} className="relative h-64 overflow-hidden group block">
        <img 
          src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isFeatured && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Featured
          </div>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          </div>
          <span className="text-gray-400 text-xs ml-2">({product.numReviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-extrabold text-blue-700">${product.price.toFixed(2)}</span>
          <Link to={`/product/${product._id}`} className="bg-gray-900 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
