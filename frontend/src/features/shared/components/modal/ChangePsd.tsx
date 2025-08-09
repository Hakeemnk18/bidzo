import { useEffect, useState } from "react";
import instance from "../../../../api/axios";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../../utils/showErrorToast";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from 'react-icons/fa';



interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ResGetToken {
    success: true,
    message: string,
    data: string
}

const ChangePassword = ({ isOpen, onClose, }: ConfirmModalProps) => {
    if (!isOpen) return null


    const [formData, setFormData] = useState({ password: '', rePassword: ''});
    const [errors, setErrors] = useState<{oldPassword?: string, password?: string, rePassword?: string }>({});
    const [loading, setLoading] = useState(false);
    const [showOldpassword, setShowOldpassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isOldCorrect, setIsOldCorrect] = useState(true)
    const [oldPassword, setOldPassword] = useState('')
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleOldPassword = async ()=>{

        try {
            const res = await instance.post<{success: boolean}>('/user/check-password',{
                password: oldPassword
            })
            if(res.data.success){
                setIsOldCorrect(false)
                
            }else{
                setIsOldCorrect(true)
            }
            
        } catch (error: any) {
            showErrorToast(error)
            console.log("error in old password check ",error)
        }

    }
    const handleSubmit = async () => {
        

        const newErrors: typeof errors = {};
       

        if (formData.password.trim().length < 6) {
            newErrors.password = "Password should be 6 caracters"
        }

        if(formData.rePassword !== formData.password){
            newErrors.rePassword = "password doesn't match"
        }



        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);
            return;
        } else {
            setLoading(true)
            try {
                const res = await instance.patch<ResGetToken>('/user/password', {
                    password: formData.password
                })
                setLoading(false)
                if (res.data.success) {
                    toast(res.data.message)
                    
                    onClose()
                }
            } catch (error: any) {
                setLoading(false)
                showErrorToast(error)
                console.log("error in edit profile ", error)
            }

        }
    }

    useEffect(()=>{
        
        if(oldPassword.length > 0){
            handleOldPassword()
        }
        
    },[oldPassword])




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
            
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-10">
                        <svg
                            className="animate-spin h-6 w-6 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    </div>
                )}

                <div className="mb-4 relative" >
                    <input
                        disabled={!isOldCorrect}
                        type={ showOldpassword ? 'text' : 'password'}
                        name="oldPassword"
                        onChange={(e)=> setOldPassword(e.target.value)}
                        value={oldPassword}
                        placeholder="Enter Old Password"
                        className={`disabled:bg-gray-200 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                    />
                    <button 
                    onClick={()=> setShowOldpassword(!showOldpassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" >
                        
                        { showOldpassword ? <FaEyeSlash /> :<FaEye /> }
                    </button>
                    
                    {errors.oldPassword && <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>}
                </div>

                <div className="mb-4 relative" >
                    <input
                        disabled={isOldCorrect}
                        type={ showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="new password"
                        className={`disabled:bg-gray-200 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                    />
                    <button 
                    onClick={()=> setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" >
                        
                        { showPassword ? <FaEyeSlash /> :<FaEye /> }
                    </button>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="mb-4" >
                    <input
                        disabled={isOldCorrect}
                        type="password"
                        name="rePassword"
                        onChange={handleChange}
                        value={formData.rePassword}
                        placeholder="Reenter password"
                        className={`disabled:bg-gray-200 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                    />
                    {errors.rePassword && <p className="text-red-500 text-xs mt-1">{errors.rePassword}</p>}
                </div>






                <div className="flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isOldCorrect}
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;