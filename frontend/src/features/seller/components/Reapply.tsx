import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../../api/axios';
import { toast } from 'react-toastify';


interface IResReapply {
    success: boolean,
    message: string,
}

const Reapply = () => {


    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");


    const [formData, setFormData] = useState({ name: "", email: "" });
    const [errors, setErrors] = useState<{ name?: string, email?: string }>({});
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleNewPassword = async () => {
        const newErrors: typeof errors = {};
        const { name, email } = formData

        if (name.trim().length < 6) {
            newErrors.name = "Enter your name";
        }
        if (email.trim() === '') {
            newErrors.email = "Invalid email"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        } else {

            try {

                console.log("inside else")
                console.log(id)
                const res = await instance.patch<IResReapply>(`/seller/reapply/${id}`)

                if (res.data.success) {
                    toast(res.data.message)
                    navigate('/seller/login')
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
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            placeholder="Enter name"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="Enter email "
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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

export default Reapply