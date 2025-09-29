import React, { useState, useContext, useEffect } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useStoreSelector } from '../../../hooks/useStore';
import instance from '../../../api/axios';
import type { INotification, IResNotification } from '../../../types/notification.types';
import type { ApiResponse } from '../../../types/user.types';






const Notification = () => {


    //const notifications = useContext(SocketContext)
    const { list } = useStoreSelector((state) => state.notification)
    const [notification, setNotifications] = useState<INotification[]>([])

    // const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    // useSocket('123',(newNotfication)=>{
    //     setNotifications((prev)=> [newNotfication,...prev])
    // })

    const markAsRead = async (id: string) => {
        try {
            console.log("id inside mark ",id)
            const res = await instance.patch<ApiResponse>(`/user/notification/${id}`)
            if (res.data.success) {
                setNotifications(prevNotifications =>
                    prevNotifications.map(notification =>
                        notification.id === id ? { ...notification, read: true } : notification
                    )
                );
            }
        } catch (error: any) {
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to  mark as read");
            }
            console.log("error in mark as read notification")
        }

    };
    const fetchData = async () => {
        try {
            const res = await instance.get<IResNotification>('/user/notification')

            if (res.data.success) {
                console.log(res.data.data)
                setNotifications(res.data.data)
            }
        } catch (error: any) {
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to fetch plan data");
            }
            console.log("error in fetch notification")
        }
    }
    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div className='mt-40 mb-10 flex justify-center'>
            <div
                className="w-180 bg-[#1f2937] border border-[#374151] rounded-lg shadow-xl overflow-hidden animate-slide-in-down"
                onClick={
                    
                    (e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-[#374151]">
                    <h3 className="text-lg font-semibold text-gray-200">Notifications</h3>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                        <FaTimes />
                    </button>
                </div>
                {list.length > 0 ? (
                    <ul className="divide-y divide-[#374151]">
                        {notification.map((notification, index) => (
                            <li
                                key={index}
                                className={`p-4 hover:bg-[#374151] transition-colors duration-200 cursor-pointer bg-[#1f2937]
                    `}
                                onClick={
                                    () => {
                                        if(!notification.read){
                                            markAsRead(notification.id)
                                        }
                                        
                                    }}
                            >
                                <p className={`text-sm ${notification.read ? 'text-gray-400' : 'font-medium text-gray-100'}`}>
                                    {notification.message}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="p-4 text-center text-gray-400">No new notifications.</p>
                )}
            </div>
        </div>
    );
};

export default Notification;