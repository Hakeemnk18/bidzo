import { useNavigate } from "react-router-dom";
import { useStoreDispatch } from "../../../../hooks/useStore";
import { clearToken } from "../../../../utils/tokenHelpers";
import { logout } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { useRouterRole } from "../../../../hooks/useRouterRole";


interface UserDropdownProps {
    onClose: ()=> void ;
}


const UserDropdown = ({ onClose }: UserDropdownProps) => {

    const dispatch = useStoreDispatch()
    const navigate = useNavigate()
    const role = useRouterRole()

    const handleLogout = () => {
        dispatch(logout())
        
        clearToken()
        toast.success("Logged out successfully");
        onClose()
    }

    const handleProfile = () => {
        
        navigate(`/${role}/profile`)
        onClose()
    }

    const handleNotification = () => {
        navigate('/user/notification')
        onClose()
    }


    return (

        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white z-50">
            <ul className="py-1 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleProfile}>My Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dashboard</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleNotification}>Notification</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
            </ul>
        </div>


    );
};

export default UserDropdown;