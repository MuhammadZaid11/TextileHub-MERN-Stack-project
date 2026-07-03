const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
      <div className="text-8xl font-extrabold text-gray-200 mb-4">404</div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-500 text-lg mb-8">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
