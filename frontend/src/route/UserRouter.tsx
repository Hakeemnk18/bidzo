import { lazy, Suspense } from "react"
import PublicRoute from "../features/user/components/PublicRoute"
import LoadingSpinner from "../features/shared/components/LoadingSpinner"
import ResetPassword from "../features/shared/components/ResetPassword"


const Home = lazy(()=> import ("../features/user/pages/Home"))
const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const SignupPage = lazy(()=> import('../features/user/pages/SignUpPage'))




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
    }
    
]

export default userRoutes