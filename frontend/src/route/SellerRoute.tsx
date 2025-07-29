import { lazy } from "react";



const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const SignupPage = lazy(()=> import('../features/user/pages/SignUpPage'))


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
            <SignupPage />
        )
    }

]

export default sellerRoute