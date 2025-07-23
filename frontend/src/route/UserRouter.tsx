import { lazy, Suspense } from "react"
import PublicRoute from "../features/user/components/PublicRoute"
import LoadingSpinner from "../features/shared/components/LoadingSpinner"

const Home = lazy(()=> import ("../features/user/pages/Home"))
const UserLogin = lazy(()=> import('../features/user/pages/Login'))




const userRoutes = [
    {
        path:'/',
        element:(
            <Home />
        ),
    },
    {
        path:'/login',
        element:(
            <PublicRoute >
                <Suspense fallback={< LoadingSpinner />}>
                    <UserLogin />
                </Suspense>
                
            </PublicRoute>
            
        ),
    }
    
]

export default userRoutes