import React, { useState, useContext } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';
import { useSocket } from '../../../hooks/useSocket';
import { SocketContext } from '../../../store/useSocket';


interface Notification {
    id?: number;
    message: string;
    read?: boolean;
}

const mockNotifications: Notification[] = [
    { message: 'Your plan has been upgraded to Pro.'}
];

const Notification = () => {

    
    const notifications = useContext(SocketContext)

    // const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    // useSocket('123',(newNotfication)=>{
    //     setNotifications((prev)=> [newNotfication,...prev])
    // })

    // const markAsRead = (id: number) => {
    //     setNotifications(prevNotifications =>
    //         prevNotifications.map(notification =>
    //             notification.id === id ? { ...notification, read: true } : notification
    //         )
    //     );
    // };



    return (
        <div className='mt-40 mb-10 flex justify-center'>
            <div
                className="w-180 bg-[#1f2937] border border-[#374151] rounded-lg shadow-xl overflow-hidden animate-slide-in-down"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-[#374151]">
                    <h3 className="text-lg font-semibold text-gray-200">Notifications</h3>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                        <FaTimes />
                    </button>
                </div>
                {notifications.length > 0 ? (
                    <ul className="divide-y divide-[#374151]">
                        {notifications.map((notification, index) => (
                            <li
                                key={index}
                                className={`p-4 hover:bg-[#374151] transition-colors duration-200 cursor-pointer bg-[#1f2937]
                    `}
                                // onClick={() => markAsRead(notification.id)}
                            >
                                <p className={`text-sm ${notification.message ? 'text-gray-400' : 'font-medium text-gray-100'}`}>
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