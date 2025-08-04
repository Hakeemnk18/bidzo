import { lazy, Suspense } from "react";
import PublicRoute from "../features/seller/components/PublicRoute";
import ProtectedRoute from "../features/seller/components/ProtectedRoute";



const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const SignupPage = lazy(()=> import('../features/user/pages/SignUpPage'))
const SellerDashBoardPage = lazy(()=> import('../features/seller/page/SellerdashboardPage'))


const sellerRoute = [
    {
        path: '/seller/login',
        element:(
            <PublicRoute >
                <UserLogin />
            </PublicRoute>
            
        )
    },
    {
        path: '/seller/signup',
        element:(
            <PublicRoute >
                <SignupPage />
            </PublicRoute>
            
        )
    },
     {
        path: '/seller/dashboard',
        element:(
            <ProtectedRoute>
                <SellerDashBoardPage />
            </ProtectedRoute>
            
        )
    }

]

export default sellerRoute