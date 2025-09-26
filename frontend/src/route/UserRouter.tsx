import { lazy, Suspense } from "react"
import PublicRoute from "../features/user/components/PublicRoute"
import LoadingSpinner from "../features/shared/components/LoadingSpinner"
import ResetPassword from "../features/shared/components/ResetPassword"
import ProtectedRoute from "../features/user/components/ProtectedRoute"
import { SocketProvider } from "../store/useSocket"


const Home = lazy(()=> import ("../features/user/pages/Home"))
const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const SignupPage = lazy(()=> import('../features/user/pages/SignUpPage'))
const ProfilePage = lazy(()=> import('../features/shared/pages/ProfilePage'))
const NotificationPage = lazy(()=> import('../features/shared/components/Notification'))





const userRoutes = [
    {
        path:'/',
        element:(
            <Home />
        ),
    },
    {
        path:'/user/login',
        element:(
            <PublicRoute >
                <Suspense fallback={< LoadingSpinner />}>
                    <UserLogin />
                </Suspense>
                
            </PublicRoute>
            
        ),
    },
    {
        path:'/user/signup',
        element:(
            <PublicRoute >
                <Suspense fallback={< LoadingSpinner />}>
                    <SignupPage />
                </Suspense>
            </PublicRoute>
            
        ),
    },
    {
        path:'/user/reset-password',
        element:(
            <ResetPassword />
            
        ),
    },
    {
        path:'/user/profile',
        element:(
            <ProtectedRoute>
                <Suspense fallback={< LoadingSpinner />}>
                    <ProfilePage />
                </Suspense>
            </ProtectedRoute>
           
            
        ),
    },
    {
        path:'/user/notification',
        element:(
         
            <NotificationPage/>
         
            
           
            
        ),
    }
    
]

export default userRoutes