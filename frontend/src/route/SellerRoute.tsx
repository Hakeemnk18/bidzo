import { lazy } from "react";



const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const SellerRegistration = lazy(()=> import('../features/seller/pages/SignupPage'))


const sellerRoute = [
    {
        path: '/seller/login',
        element:(
            <UserLogin />
        )
    },
    {
        path: '/seller/signup',
        element:(
            <SellerRegistration />
        )
    }

]

export default sellerRoute