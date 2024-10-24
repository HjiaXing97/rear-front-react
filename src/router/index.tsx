import { Navigate } from "react-router-dom";
import type IRouteProps from "@/types/route";
import authRoutes from "./authRoute";

import Login from "@/pages/login";
import NotFound from "@/pages/NotFound";
import Layout from "@/layout";

const routes: IRouteProps[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      title: "登录",
    },
  },

  {
    path: "/",
    element: <Layout />,
    children: [...authRoutes],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { routes, authRoutes };
