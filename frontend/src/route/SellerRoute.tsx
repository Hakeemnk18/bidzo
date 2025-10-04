import { lazy, Suspense } from "react";
import PublicRoute from "../features/seller/components/PublicRoute";
import ProtectedRoute from "../features/seller/components/ProtectedRoute";
import LoadingSpinner from "../features/shared/components/LoadingSpinner"



const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const SignupPage = lazy(()=> import('../features/user/pages/SignUpPage'))
const SellerDashBoardPage = lazy(()=> import('../features/seller/page/SellerdashboardPage'))
const ReapplyComponent = lazy(()=> import('../features/seller/components/Reapply'))
const ProfilePage = lazy(()=> import('../features/shared/pages/ProfilePage'))
const NotificationPage = lazy(()=> import('../features/shared/components/Notification'))
const PlansPage = lazy(()=> import('../features/shared/components/plans/Plans'))


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
    },
     {
        path: '/seller/reapply',
        element:(
            <ReapplyComponent />
            
        )
    },
    {
        path:'/seller/profile',
        element:(
            <ProtectedRoute>
                <Suspense fallback={< LoadingSpinner />}>
                    <ProfilePage />
                </Suspense>
            </ProtectedRoute>
           
            
        ),
    },
    {
        path:'/seller/plans',
        element:(
         <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
                <PlansPage/>
            </Suspense>
         </ProtectedRoute>
        ),
    }
    
    

]

export default sellerRoute