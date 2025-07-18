
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-transparent backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-white text-2xl font-bold cursor-pointer">
          Bidzo
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">
            Products
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">
            Contact
          </a>
        </div>

        {/* User Icon */}
        <div className="text-white text-2xl cursor-pointer">
          <FaUserCircle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;