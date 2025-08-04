import { useState } from "react";
import instance from "../../../../api/axios";
import { toast } from "react-toastify";



interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ResGetToken {
    success: true,
    message: string,
    data: string
}

const ResetPasswordModal = ({ isOpen, onClose, }: ConfirmModalProps) => {
    if (!isOpen) return null


    const [formData, setFormData] = useState({ email: "", password: "", rePassword: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string, rePassword?: string }>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleEmail = async () => {
        console.log("inside hansle email")

        const newErrors: typeof errors = {};
        if (!formData.email.includes("@") || formData.email.trim().length < 1) {
            newErrors.email = "Invalid email";
        }



        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);
            return;
        } else {
            setLoading(true)
            try {
                const res = await instance.post<ResGetToken>('/user/email', {
                    email: formData.email
                })
                setLoading(false)
                if (res.data.success) {
                    toast(res.data.message)
                    onClose()
                }
            } catch (error: any) {
                setLoading(false)
                if (error.response && error.response.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Failed to fetch user data");
                }
                console.log("error in forgot passwrd email veri ", error)
            }

        }
    }





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
                <div className="mb-4" >
                    <input
                        
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="Email Id"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                        type="button"
                        onClick={handleEmail}
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal;