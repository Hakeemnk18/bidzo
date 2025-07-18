import { lazy } from "react"

const Home = lazy(()=> import ("../features/user/pages/Home"))




const userRoutes = [
    {
        path:'/',
        element:(
            <Home />
        ),
    },
    
]

export default userRoutes