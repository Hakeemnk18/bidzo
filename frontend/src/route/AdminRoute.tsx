import { lazy } from "react";



const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const DashBoardPage = lazy(()=> import('../features/admin/pages/AdminDashboardPage'))



const adminRoute = [
    {
        path: '/admin/login',
        element:(
            <UserLogin />
        )
    },
    {
        path: '/admin/dashboard',
        element:(
            <DashBoardPage />
        )
    },

]

export default adminRoute