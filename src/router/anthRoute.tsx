import { lazy } from "react";
import { Navigate } from "react-router-dom";

import type IRouteProps from "@/types/route";

const User = lazy(() => import("@/views/system/user"));
const Dict = lazy(() => import("@/views/system/dict"));
const Web3Page = lazy(() => import("@/views/web3"));

const AppMain = lazy(() => import("@/layout/components/AppMain"));

const authRoutes: IRouteProps[] = [
  {
    path: "/system",
    element: <AppMain />,
    meta: {
      title: "系统管理",
    },
    children: [
      {
        index: true,
        element: <Navigate to="user" />,
      },
      {
        path: "user",
        element: <User />,
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "dict",
        element: <Dict />,
        meta: {
          title: "字典管理",
        },
      },
    ],
  },
  {
    path: "/web3",
    element: <Web3Page />,
    meta: {
      title: "交易所",
    },
  },
];

export default authRoutes;
