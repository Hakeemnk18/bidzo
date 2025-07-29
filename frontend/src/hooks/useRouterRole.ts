import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useRouterRole = () => {

    const [role, setRole] = useState('')
    const location = useLocation()



    useEffect(() => {
        if (location.pathname.includes('admin')) {
            setRole('admin');
        } else if (location.pathname.includes('seller')) {
            setRole('seller');
        } else {
            setRole('user');
        }
    }, [location.pathname]);

    return role
}

