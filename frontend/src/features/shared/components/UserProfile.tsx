import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import instance from '../../../api/axios';
import type { IResUserProfileData, IUserProfileData } from '../../../types/user.types';
import { showErrorToast } from '../../../utils/showErrorToast';
import ProfileEdit from './modal/UserProfileEditModal';
import ChangePassword from './modal/ChangePsd';
import { useNavigate } from 'react-router-dom';





const Profile = () => {

  const [userData, setUserData] = useState<IUserProfileData | null>(null)
  const [isProfileEdit, setIsProfileedit] = useState(false)
  const [isUpdated, setIsupdated] = useState(true)
  const [isChangePsd, setIsChangePsd] = useState(false)
  const role = localStorage.getItem('userRole')
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await instance.get<IResUserProfileData>('/user/profile')
      if (res.data.success) {

        setUserData(res.data.data!)

      }
    } catch (error: any) {
      showErrorToast(error)
      console.log("error in  login page", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [isUpdated])

  return (
    <div className="flex justify-center items-center   mt-40">
      <div className="w-200 max-w-4xl bg-white rounded-xl overflow-hidden flex shadow-2xl h-100 mb-20">
        {/* Left section */}
        <div className="w-1/2 bg-[#2e3260] text-white flex flex-col items-center justify-center p-8">
          <div className="w-32 h-32 bg-gray-400 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mt-4">{userData?.name}</h2>
          <button
          onClick={()=> navigate(`/${role}/plans`)}
           className="mt-4 px-6 py-2 bg-yellow-400 text-black font-medium rounded-full  hover:bg-yellow-300 transition-all duration-200">
            upgrade
          </button>
        </div>

        {/* Right section */}
        <div className="w-1/2 bg-white p-8 h-full flex flex-col justify-center relative">
          <div >
            <button 
            onClick={()=> setIsProfileedit(true)}
            className=" absolute top-8 right-8 self-start mt-4  transition ">
              <FaEdit />
            </button>
            <p className="text-sm text-gray-500 mb-1">email</p>
            <p className="text-lg font-semibold mb-4">{userData?.email}</p>

            <p className="text-sm text-gray-500 mb-1">phone</p>
            <p className="text-lg font-semibold mb-4">{userData?.phoneNumber}</p>
          </div>

          <button 
          onClick={()=> setIsChangePsd(true)}
          className=" absolute bottom-8 right-8 self-start mt-8 px-6 py-2 bg-[#4338ca] text-white rounded-full hover:bg-[#3730a3] transition duration-200">
            change password
          </button>
        </div>
      </div>
      {
        isChangePsd &&
        <ChangePassword 
        onClose={()=> setIsChangePsd(false)}
        isOpen={isChangePsd}
        />
      }

      { isProfileEdit && 
       <ProfileEdit 
        updated={()=> setIsupdated(!isUpdated)}
        isOpen={isProfileEdit}
        onClose={()=> setIsProfileedit(false)}
        userName={userData?.name!}
        userPhone={userData?.phoneNumber!}
        />

      }
    </div>
  );
};

export default Profile;
