import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../../api/axios';
import { toast } from 'react-toastify';
import axios from 'axios';


interface IResReapply {
    success: boolean,
    message: string,
}

interface IResCloudinaryURL {
    secure_url: string
}

const Reapply = () => {


    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");


    const [formData, setFormData] = useState({ document: null as File | null, documentUrl: '' });
    const [errors, setErrors] = useState<{ document?: string }>({});
    const navigate = useNavigate()



    const handleDocumentSubmit = async () => {
        const newErrors: typeof errors = {};

        if (!formData.document) {
            newErrors.document = "Please upload a document";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        } else {

            const file = formData.document as File;

            const formDataUpload = new FormData();
            formDataUpload.append("file", file);
            formDataUpload.append("upload_preset", "pdf_unsigned");
            formDataUpload.append("folder", "pdf_upload");




            try {
                const uploadRes = await axios.post<IResCloudinaryURL>("https://api.cloudinary.com/v1_1/dijkesgb1/raw/upload", formDataUpload);
                const uploadedUrl = uploadRes.data.secure_url;
                formData.documentUrl = uploadedUrl;

                
                const res = await instance.patch<IResReapply>(`/seller/reapply/${id}`, formData)

                if (res.data.success) {
                    toast(res.data.message)
                    navigate('/seller/login')
                }
            } catch (error: any) {
                if (error.response && error.response.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Failed to resubmit");
                }
                console.log("error in re apply", error)
                return;
            }





        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const isPdf = file.type === "application/pdf";

            if (!isPdf) {
                setErrors(prev => ({ document: "only pdf file allowed" }));
                e.target.value = "";
                return
            }
            setFormData(prev => ({ ...prev, document: file }));
            setErrors(prev => ({ document: "" }));
        }
    };

    return (
        <>
            <div className='mt-50 inset-0 z-50 flex items-center justify-center'>
                <div className='bg-white w-100 p-10 rounded-xl'>
                    <div className="w-full mb-4">

                        <input
                            type="file"
                            accept=".pdf"
                            name="document"
                            placeholder="submit the file"
                            onChange={handleFileChange}
                            className={`w-full px-4 py-2 border ${errors.document ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.document && <p className="text-red-500 text-xs mt-1">{errors.document}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={handleDocumentSubmit}
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md mt-2"
                    >
                        Reapply
                    </button>

                </div>

            </div>

        </>

    )
}

export default Reapply