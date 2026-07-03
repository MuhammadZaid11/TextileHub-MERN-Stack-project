import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-900 text-white rounded-2xl p-10 md:p-20 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Discover Premium Quality Fabrics for Every Need
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-8">
            From luxurious silk to durable denim, source the finest textiles directly from top manufacturers.
          </p>
          <button className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition duration-300 shadow-lg transform hover:-translate-y-1">
            Shop Collection
          </button>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Cotton', 'Silk', 'Linen', 'Denim'].map((cat) => (
            <div key={cat} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center cursor-pointer hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                 {/* Icon placeholder */}
                 <span className="font-bold">{cat[0]}</span>
              </div>
              <h3 className="font-semibold text-gray-800">{cat}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <div>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Arrivals</h2>
          <a href="#" className="text-blue-600 font-semibold hover:underline hidden md:block">View All</a>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse bg-gray-200 rounded-xl h-80"></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10">No products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
