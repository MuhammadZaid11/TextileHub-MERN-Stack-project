const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">TEXTILEHUB</h3>
          <p className="text-sm">Premium quality fabrics for wholesale and retail. Transforming the textile industry digitally.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Shop</a></li>
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Cotton</a></li>
            <li><a href="#" className="hover:text-blue-400">Silk</a></li>
            <li><a href="#" className="hover:text-blue-400">Linen</a></li>
            <li><a href="#" className="hover:text-blue-400">Denim</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for latest updates and offers.</p>
          <div className="flex">
            <input type="email" placeholder="Email Address" className="px-4 py-2 w-full rounded-l-md text-gray-900 outline-none" />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TextileHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
