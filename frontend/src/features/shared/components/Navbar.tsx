import { FaUserCircle } from 'react-icons/fa';
import { useStoreSelector } from '../../../hooks/useStore';
import { Link } from 'react-router-dom';
import {  useState, useMemo } from 'react';
import UserDropdown from './modal/userDropdown';
import { useRouterRole } from '../../../hooks/useRouterRole';


const Navbar = () => {

  const [dropDownOpen, setDropDownOpen] = useState(false)
  const user = useStoreSelector((state) => state.auth)
  const role = localStorage.getItem('userRole')

  
  const navItems = useMemo(() => {
  switch (role) {
    case "user":
      return {
        first: "Home",
        second: "Auction",
        third: "Contact",
        fourth: "",
        fifth: "",
        sixth: "",
        seventh:'',
        firstUrl: "#",
        secondUrl: "/user/auctions",
        thirdUrl: "#",
        fourthUrl: "",
        fifthUrl: "",
        sixthUrl: "",
        seventhUrl: ''
      };
    case "seller":
      return {
        first: "DashBoard",
        second: "Auction",
        third: "Product",
        fourth: "",
        fifth: "",
        sixth: "",
        seventh: '',
        firstUrl: "/seller/dashboard",
        secondUrl: "/seller/auction/management",
        thirdUrl: "/seller/product/management",
        fourthUrl: "",
        fifthUrl: "",
        sixthUrl: "",
        seventhUrl: ''
      };
    case "admin":
      return {
        first: "DashBoard",
        second: "Sellers",
        third: "Users",
        fourth: "Plans",
        fifth: "Auctions",
        sixth: "category",
        seventh: "product",
        firstUrl: "/admin/dashboard",
        secondUrl: '/admin/sellerManagement',
        thirdUrl: '/admin/userManagement',
        fourthUrl: '/admin/planManagement',
        fifthUrl: "/admin/auctionManagement",
        sixthUrl: '/admin/categoryManagement',
        seventhUrl:'/admin/productManagement'
      };
    default:
      return {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: "",
        seventh: "",
        firstUrl: "#",
        secondUrl: "#",
        thirdUrl: "#",
        fourthUrl: "",
        fifthUrl: "",
        sixthUrl: "",
        seventhUrl: ""
      };
  }
}, [role]);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-transparent backdrop-blur-md ">
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
          <Link to={navItems.secondUrl} className="text-white hover:text-gray-300 transition duration-300">
            { navItems.second }
          </Link>
          <Link to={navItems.thirdUrl} className="text-white hover:text-gray-300 transition duration-300">
            { navItems.third }
          </Link>
          { role === 'admin' && 
          <>
            <Link to={navItems.fourthUrl} className="text-white hover:text-gray-300 transition duration-300">
            { navItems.fourth }
          </Link>
          <Link to={navItems.fifthUrl} className="text-white hover:text-gray-300 transition duration-300">
            { navItems.fifth }
          </Link>
          <Link to={navItems.sixthUrl} className="text-white hover:text-gray-300 transition duration-300">
            { navItems.sixth }
          </Link>
          <Link to={navItems.seventhUrl} className="text-white hover:text-gray-300 transition duration-300">
            { navItems.seventh }
          </Link>
          </>
            
          }
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
              { dropDownOpen && <UserDropdown onClose={()=> setDropDownOpen(false)}/>}
              </div>
              :
              <div className="text-white text-md cursor-pointer ">
                <Link to={'/user/login'}>
                  <button className="bg-blue-400 py-2 px-4 rounded-lg">Login</button>
                </Link>

              </div>

        }
              

            </div>
    </nav>
  );
};

export default Navbar;