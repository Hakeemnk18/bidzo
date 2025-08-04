import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../../api/axios';
import { toast } from 'react-toastify';


interface IResForgetPassword {
    success: boolean,
    message: string,
    data: string
}

const ResetPassword = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({ password: "", rePassword: "" });
    const [errors, setErrors] = useState<{ password?: string, rePassword?: string }>({});
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleNewPassword = async () => {
        const newErrors: typeof errors = {};
        const { password, rePassword } = formData

        if (password.trim().length < 6) {
            newErrors.password = "Min 6 characters";
        }
        if (rePassword !== password) {
            newErrors.rePassword = "password doesn't match"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        } else {

            try {
                const res = await instance.post<IResForgetPassword>('/user/forgot-password', {
                    password: formData.password,
                    token: token
                })

                if (res.data.success) {
                    toast(res.data.message)
                    console.log("role ",res.data.data)
                    if(res.data.data === 'user'){
                        navigate('/user/login')
                    }else if(res.data.data === 'admin'){
                        navigate('/admin/login')
                    }else if(res.data.data === 'seller'){
                        navigate('/seller/login')
                    }
                }
            } catch (error: any) {
                if (error.response && error.response.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Failed to fetch user data");
                }
                console.log("error in reset password sumbit ", error)
            }


        }
    }

    return (
        <>
            <div className='mt-50 inset-0 z-50 flex items-center justify-center'>
                <div className='bg-white w-100 p-10 rounded-xl'>
                    <div className="mb-4 ">
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="Enter New Password"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="rePassword"
                            onChange={handleChange}
                            value={formData.rePassword}
                            placeholder="Re Enter Password"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                        />
                        {errors.rePassword && <p className="text-red-500 text-xs mt-1">{errors.rePassword}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={handleNewPassword}
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md mt-2"
                    >
                        Submit
                    </button>

                </div>

            </div>

        </>

    )
}

export default ResetPassword