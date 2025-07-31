import { lazy } from "react";
import ProtectedRoute from "../features/admin/components/ProtectedRoute";
import PublicRoute from "../features/admin/components/PublicRoutes";



const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const DashBoardPage = lazy(()=> import('../features/admin/pages/AdminDashboardPage'))
const AuctionTable = lazy(()=> import('../features/admin/components/ActionTable'))




const adminRoute = [
    {
        path: '/admin/login',
        element:(
            <PublicRoute >
                <UserLogin />
            </PublicRoute>
            
        )
    },
    {
        path: '/admin/dashboard',
        element:(
            <ProtectedRoute>
                <DashBoardPage />
            </ProtectedRoute>
            
        )
    },
    {
        path: '/admin/sellerManagement',
        element:(
            <AuctionTable role={'seller'}/>
            
        )
    },
    {
        path: '/admin/userManagement',
        element:(
            <AuctionTable role={'user'}/>
            
        )
    },

]

export default adminRoute