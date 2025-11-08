import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AppLayout from "../Layout/Applayout";
export const Router = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                index:true,
                element:<ProtectedRoute><Dashboard/></ProtectedRoute>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"signup",
                element:<Signup/>
            },
            {
                path:"dashboard",
                element:<ProtectedRoute><Dashboard/></ProtectedRoute>
            }
        
        ],
        errorElement:<div>Something went wrong</div>
    },
    {
    }
]);