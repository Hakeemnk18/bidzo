import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStoreDispatch } from "../../../../hooks/useStore";
import type { ApiResponse, GoogleLoginResponse, LoginResponse } from "../../../../types/user.types";
import { login } from "../../slices/authSlice";
import OTPVerification from "./OTPVerification";
import axios from "axios";
import { useRouterRole } from "../../../../hooks/useRouterRole";

const SignUpForm = () => {
    const [isOTP, setIsOTP] = useState<boolean>(false)
    const [formData, setFormData] = useState({ email: "", password: "", rePassword: "", phone: "", name: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string, name?: string, phoneNumber?: string, rePassword?: string }>({});
    const dispatch = useStoreDispatch()
    const navigate = useNavigate()
    const role = useRouterRole()




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        const newErrors: typeof errors = {};
        const { name, email, password, rePassword, phone } = formData
        const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/


        if (name.trim() === '' || !nameRegex.test(name)) {
            newErrors.name = "Invalid Name"
        }
        if (!emailRegex.test(email.trim()) || email.trim().length < 1) {
            newErrors.email = "Invalid email";
        }
        if (password.trim().length < 6) {
            newErrors.password = "Min 6 characters";
        }
        if (rePassword !== password) {
            newErrors.rePassword = "password doesn't match"
        }
        if (!phoneRegex.test(phone.trim())) {
            newErrors.phoneNumber = 'invalid phone number'
        }


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            try {
                const res = await axios.post<ApiResponse>("http://localhost:4004/user/send-otp", { email });

                if (res.data.success) {
                    toast(res.data.message)
                    setIsOTP(true)
                } else {
                    toast(res.data.message)
                }

            } catch (error: any) {
                if (error.response && error.response.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Failed to send OTP. Please try again later.");
                }
                console.log("error in send otp  signup page", error)
            }
        }

    };

    const onVerifiedOtp = async () => {
        try {
            const res = await axios.post<GoogleLoginResponse>(`http://localhost:4004/${role}/sign-up`, formData)
            if (res.data.success) {
                toast(res.data.message)
                setIsOTP(false)

                if (role === 'user') {
                    const userData: LoginResponse = res.data.data!
                    localStorage.setItem("authToken", userData.token);
                    localStorage.setItem("userName", userData.name);
                    localStorage.setItem("userRole", userData.role);
                    dispatch(login({
                        name: userData.name,
                        role: userData.role
                    }));
                    navigate('/');
                }


            }
        } catch (error: any) {
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to send OTP. Please try again later.");
            }
            console.log("error in send otp  signup page", error)
        }
    }

    return (
        <>
            <form className="p-4 w-full" onSubmit={handleSubmit}>
                <h2 className="text-center text-lg font-bold mb-4">SignUp</h2>
                <div className="w-full mb-4">

                    <input
                        type="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>


                <div className="w-full mb-4">

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Id"
                        className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>


                <div className="w-full mb-4">

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="w-full mb-4">

                    <input
                        type="password"
                        name="rePassword"
                        value={formData.rePassword}
                        onChange={handleChange}
                        placeholder="Re Enter password"
                        className={`w-full px-4 py-2 border ${errors.rePassword ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.rePassword && <p className="text-red-500 text-xs mt-1">{errors.rePassword}</p>}
                </div>

                <div className="w-full mb-4">

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={`w-full px-4 py-2 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md mt-2"
                >
                    Submit
                </button>



                <div className="flex items-center space-x-1 text-sm">
                    <p className="text-gray-500">You don't have account?</p>
                    <Link to={`/${role}/login`} className="font-bold hover:underline text-blue-600">
                        Login
                    </Link>
                </div>


            </form>
            {isOTP && <OTPVerification email={formData.email} onSuccess={onVerifiedOtp} />}
        </>




    );
};

export default SignUpForm;
