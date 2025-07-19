import { FaUserCircle } from 'react-icons/fa';
import { useStoreSelector } from '../../../hooks/useStore';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const user = useStoreSelector((state) => state.auth)

  
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
        {
          user.isAuthenticated ?
            <div className="text-white text-2xl cursor-pointer">
              <FaUserCircle />
            </div> :
            <div className="text-white text-md cursor-pointer ">
              <Link to={'/login'}>
                  <button className="bg-blue-400 py-2 px-4 rounded-lg">Login</button>
              </Link>
              
            </div>

        }

      </div>
    </nav>
  );
};

export default Navbar;