import { lazy } from "react";




const UserLogin = lazy(()=> import('../features/user/pages/Login'))
const DashBoardPage = lazy(()=> import('../features/admin/pages/AdminDashboardPage'))
const AuctionTable = lazy(()=> import('../features/admin/components/ActionTable'))
const PublicRoute = lazy(()=> import("../features/admin/components/PublicRoutes"))
const ProtectedRoute = lazy(()=> import("../features/admin/components/ProtectedRoute"))
const PlanTable = lazy(()=> import("../features/admin/components/plan/PlanTable"))
const PlanCreatePage = lazy(()=> import('../features/admin/components/plan/CreatePlanForm'))
const PlanEditPage = lazy(()=> import('../features/admin/components/plan/EditPlan'))
const CategoryPage = lazy(()=> import('../features/admin/components/category/CategoryTable'))
const ProductManagementPage = lazy(()=> import('../features/seller/components/product/ProductTable'))






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
    {
        path: '/admin/planManagement',
        element:( 
            <ProtectedRoute>
                <PlanTable />
            </ProtectedRoute>
                

        )
    },
    {
        path: '/admin/addPlan',
        element:( 
            <ProtectedRoute>
                <PlanCreatePage />
            </ProtectedRoute>
                

        )
    },
    {
        path: '/admin/editPlan',
        element:( 
            <ProtectedRoute>
                <PlanEditPage />
            </ProtectedRoute>
                

        )
    },
    {
        path: '/admin/categoryManagement',
        element:( 
            <ProtectedRoute>
                <CategoryPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/admin/productManagement',
        element:( 
            <ProtectedRoute>
                <ProductManagementPage />
            </ProtectedRoute>
        )
    },
    

]

export default adminRoute