import { FaUserCircle } from 'react-icons/fa';
import { useStoreSelector } from '../../../hooks/useStore';
import { Link } from 'react-router-dom';
import {  useState, useMemo } from 'react';
import UserDropdown from './userDropdown';
import { useRouterRole } from '../../../hooks/useRouterRole';


const Navbar = () => {

  const [dropDownOpen, setDropDownOpen] = useState(false)
  const user = useStoreSelector((state) => state.auth)
  const role = useRouterRole()
  
  const navItems = useMemo(() => {
  switch (role) {
    case "user":
      return {
        first: "Home",
        second: "Auction",
        third: "Contact",
        firstUrl: "#",
      };
    case "seller":
      return {
        first: "DashBoard",
        second: "Auction",
        third: "Contact",
        firstUrl: "/seller/dashboard",
      };
    case "admin":
      return {
        first: "DashBoard",
        second: "Sellers",
        third: "Users",
        firstUrl: "/admin/dashboard",
      };
    default:
      return {
        first: "",
        second: "",
        third: "",
        firstUrl: "#",
      };
  }
}, [role]);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-transparent backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-white text-2xl font-bold cursor-pointer">
          Bidzo
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to={navItems.firstUrl} className="text-white hover:text-gray-300 transition duration-300">
            { navItems.first}
          </Link>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">
            { navItems.second }
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">
            { navItems.third }
          </a>
        </div>

        {/* User Icon */}
        {
          user.isAuthenticated ?
            <div className="relative inline-block text-left">
              <div
                className="text-white text-2xl cursor-pointer"
                onClick={()=> setDropDownOpen(!dropDownOpen)}
              >
                <FaUserCircle />
              </div>
              { dropDownOpen && <UserDropdown />}
              </div>
              :
              <div className="text-white text-md cursor-pointer ">
                <Link to={'/user/login'}>
                  <button className="bg-blue-400 py-2 px-4 rounded-lg">Login</button>
                </Link>

              </div>

        }
              {

              }

            </div>
    </nav>
  );
};

export default Navbar;