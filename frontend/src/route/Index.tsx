import userRoutes from "./UserRouter";
import App from "../App";


const allRoutes = [
    {
      path: '/',
      element: <App />, 
      children: [
        ...userRoutes,
      ],
    },
];

export default allRoutes