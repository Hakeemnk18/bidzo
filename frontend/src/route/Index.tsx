import userRoutes from "./UserRouter";
import sellerRoute from "./SellerRoute";
import App from "../App";
import RouteError from "../features/shared/components/404";


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
    }
];

export default allRoutes