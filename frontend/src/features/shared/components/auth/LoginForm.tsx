import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStoreDispatch } from "../../../../hooks/useStore";
import type { GoogleLoginResponse, LoginResponse } from "../../../../types/user.types";
import { login } from "../../slices/authSlice";
import GoogleLogin from "./GoogleLogin";


const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const location = useLocation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        const newErrors: typeof errors = {};
        if (!formData.email.includes("@") || formData.email.trim().length < 1) {
            newErrors.email = "Invalid email";
        }
        if (formData.password.trim().length < 6) {
            newErrors.password = "Min 6 characters";
        }

        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            let role = 'user'


            if (location.pathname.includes('admin')) role = 'admin'
            if (location.pathname.includes('seller')) role = 'seller'

            
            try {
                const res = await fetch(`http://localhost:4004/${role}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });


                if (res.ok) {
                    const data: LoginResponse = await res.json();
                    
                    // useStoreDispatch();
                    toast("Login successful");
                } else {
                    const errorData: { error: string } = await res.json();
                    toast(errorData.error);

                }

            } catch (error) {
                toast("errorin server")
            }


        }

    };

    return (
        <form className="p-4 w-full" onSubmit={handleSubmit}>
            <h2 className="text-center text-lg font-bold mb-4">Login</h2>

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

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md mt-2"
            >
                Submit
            </button>

            <GoogleLogin />

            <div className="flex items-center space-x-1 text-sm">
                <p className="text-gray-500">You don't have account?</p>
                <Link to="/signup" className="font-bold hover:underline text-blue-600">
                    Signup
                </Link>
            </div>


        </form>
    );
};

export default LoginForm;
