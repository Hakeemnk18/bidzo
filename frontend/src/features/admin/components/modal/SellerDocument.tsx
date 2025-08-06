import { useState } from "react";
import instance from "../../../../api/axios";
import { toast } from "react-toastify";
import type { ApiResponse } from "../../../../types/user.types";



interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleApprove: () => void;
    rejcted: () => void
    id: string
}



const SellerDocumentModal = ({ isOpen, onClose, handleApprove, id, rejcted }: ConfirmModalProps) => {
    if (!isOpen) return null

    const [isReason, setIsReason] = useState(false)
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState('')
    const [reasonError, setReasonError] = useState('')



    const handleApproveButton =  () => {
        handleApprove()
        onClose()
    }

    const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setReason(e.target.value)
        setReasonError('')
    }

    const handleRejectButton = async () => {
        if(reason.trim() === ''){
            setReasonError('text area is empty')
            return
        }else{
            setLoading(true)
            try {
                const res = await instance.patch<ApiResponse>(`/admin/seller/management/${id}/reject`,{
                    reason: reason
                })
                setLoading(false)
                onClose()

                if(res.data.success){
                    toast(res.data.message)
                    rejcted()

                }

            } catch (error) {
                toast("error in reject seller")
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

                <div className="absolute right-6 top-3 text-gray-900 hover:bg-red-400 px-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-3xl hover:cursor-pointer"
                    >
                        &times;
                    </button>
                </div>


                <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">name</p>
                    <p className="text-lg font-semibold mb-4 text-black" >David</p>

                    <p className="text-sm text-gray-500 mb-1">email</p>
                    <p className="text-lg font-semibold mb-4 text-black">david@gmail.com</p>

                    <p className="text-sm text-gray-500 mb-1">phone</p>
                    <p className="text-lg font-semibold mb-4 text-black" >1231231234</p>
                </div>


                {
                    isReason &&

                    <div className="mb-4" >

                        <textarea
                            placeholder="reason"
                            name="reason"
                            id="reason"
                            value={reason}
                            onChange={(e)=> handleChange(e)}
                            className={` text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300`}
                        >

                        </textarea>
                        {reasonError && <p className="text-red-500">text area is empty</p>}
                        
                    </div>

                }


                <div className="flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={isReason ? handleRejectButton : ()=> setIsReason(true)}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        Reject
                    </button>
                    <button
                        disabled={isReason}
                        type="button"
                        onClick={handleApproveButton}
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed"
                    >
                        Aprrove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellerDocumentModal;