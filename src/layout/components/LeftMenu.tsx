import { useEffect, useState } from "react";
import { Menu, type MenuProps } from "antd";
import { authRoutes } from "@/router";

import type IRouteProps from "@/types/route";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItems = Required<MenuProps>["items"][number];

const LeftMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const transformRoutes = (routes: IRouteProps[], parantPath = "") => {
    return (
      routes
        .map((route) => {
          const key = parantPath ? `${parantPath}/${route.path}` : route.path; // 拼接父级 path
          const label = route.meta?.title || key; // 使用 meta.label 或 fallback 到 path
          const index = route.index; // 使用 meta.label 或 fallback 到 path

          // 构建基础对象
          //@ts-ignore
          const result: MenuItems = { key, label, index };

          // 如果有子路由，递归调用
          if (route.children) {
            const children = transformRoutes(route.children, key);

            // 过滤掉 index 为 true 的路由
            if (children.length > 0) {
              //@ts-ignore
              result.children = children.filter((child) => !child.index);
            }
          }

          return result;
        })
        //@ts-ignore
        .filter((route) => !route.index)
    ); // 过滤掉 index 为 true 的路由
  };

  const menuList: MenuItems[] = transformRoutes(authRoutes);

  const handleItemClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    console.log(openKeys);
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
    const pathArr = location.pathname.split("/").filter(Boolean);

    if (pathArr.length > 1) {
      setOpenKeys([`/${pathArr[0]}`]);
    } else {
      setOpenKeys([...pathArr]);
    }
  }, [location.pathname]);

  return (
    <div className="w-[240px]">
      <Menu
        items={menuList}
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onClick={handleItemClick}
        onOpenChange={onOpenChange}
      ></Menu>
    </div>
  );
};
export default LeftMenu;
