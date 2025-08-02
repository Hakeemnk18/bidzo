import { lazy } from "react";




const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const DashBoardPage = lazy(()=> import('../features/admin/pages/AdminDashboardPage'))
const AuctionTable = lazy(()=> import('../features/admin/components/ActionTable'))
const PublicRoute = lazy(()=> import("../features/admin/components/PublicRoutes"))
const ProtectedRoute = lazy(()=> import("../features/admin/components/ProtectedRoute"))




const adminRoute = [
    {
        path: '/admin/login',
        element:(
            <PublicRoute>
                <UserLogin />
            </PublicRoute>
                
            
                
            
            
        )
    },
    {
        path: '/admin/dashboard',
        element:(
            <ProtectedRoute >
                <DashBoardPage />

            </ProtectedRoute>
                
            
            
        )
    },
    {
        path: '/admin/sellerManagement',
        element:(
            <ProtectedRoute >
                <AuctionTable role={'seller'}/>
            </ProtectedRoute>
            
            
        )
    },
    {
        path: '/admin/userManagement',
        element:(
            <ProtectedRoute>
                <AuctionTable role={'user'}/>

            </ProtectedRoute>
            
            
        )
    },

]

export default adminRoute