import userRoutes from "./UserRouter";
import sellerRoute from "./SellerRoute";
import App from "../App";
import RouteError from "../features/shared/components/404";
import adminRoute from "./AdminRoute";


const allRoutes = [
    {
      path: '/',
      element: <App />, 
      errorElement: <RouteError />,
      children: [
        ...userRoutes,
      ],
    },
    {
      path: '/seller',
      element: <App />,
      errorElement: <RouteError />,
      children: [
        ...sellerRoute
      ]
    },
    {
      path: '/admin',
      element: <App />,
      errorElement: <RouteError />,
      children: [
        ...adminRoute
      ]
    }
];

export default allRoutes