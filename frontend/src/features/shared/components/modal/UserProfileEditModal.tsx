import { useState } from "react";
import instance from "../../../../api/axios";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../../utils/showErrorToast";



interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    updated: () => void;
    userName: string,
    userPhone: string
}

interface ResGetToken {
    success: true,
    message: string,
    data: string
}

const ProfileEdit = ({ isOpen, onClose, updated, userName, userPhone }: ConfirmModalProps) => {
    if (!isOpen) return null


    const [formData, setFormData] = useState({ name: userName, phone: userPhone });
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
    const [loading, setLoading] = useState(false);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleEmail = async () => {
        const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
        const phoneRegex = /^[6-9]\d{9}$/

        const newErrors: typeof errors = {};
       if (formData.name.trim() === '' || !nameRegex.test(formData.name)) {
            newErrors.name = "Invalid Name"
        }

        if (!phoneRegex.test(formData.phone.trim())) {
            newErrors.phone = 'invalid phone number'
        }



        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);
            return;
        } else {
            setLoading(true)
            try {
                const res = await instance.patch<ResGetToken>('/user/profile', formData)
                setLoading(false)
                if (res.data.success) {
                    toast(res.data.message)
                    updated()
                    onClose()
                }
            } catch (error: any) {
                setLoading(false)
                showErrorToast(error)
                console.log("error in edit profile ", error)
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
                        
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        placeholder="Name"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4" >
                    <input
                        
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                        placeholder="Phone number"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;