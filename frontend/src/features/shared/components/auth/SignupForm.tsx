import React, { useState } from "react";
import { Link } from "react-router-dom";


const SignUpForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};
        if (!formData.email.includes("@") || formData.email.trim().length < 1){
            newErrors.email = "Invalid email";
        } 
        if (formData.password.trim().length < 6){
            newErrors.password = "Min 6 characters";
        } 

        console.log("inside handle submit ",newErrors)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }else{
            console.log("submitted")
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

            

            <p className="text-right text-sm mt-3">
                <Link to={'/signup'} className="font-bold hover:underline">
                        
                    Login
                
                </Link>
                
            </p>
        </form>
    );
};

export default SignUpForm;