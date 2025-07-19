import { lazy } from "react"

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
            <UserLogin />
        ),
    }
    
]

export default userRoutes