import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Menu, type MenuProps } from "antd";

import { authRoutes } from "@/router";
import { useAppDispatch } from "@/store/hooks";
import { addTag } from "@/store/modules/tags";

import { transformRoutes, addMenuHierarchy } from "@/utils";
import type { LevelKeysProps } from "@/types/route";

type MenuItems = Required<MenuProps>["items"][number];

const LeftMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuList: MenuItems[] = transformRoutes(authRoutes);

  const levelKeys = addMenuHierarchy(menuList as LevelKeysProps[]);

  const floatMenu = menuList.reduce((acc, cur) => {
    if (cur?.children) {
      return [...acc, acc.children];
    }
    return [...acc];
  }, []);

  const handleItemClick = ({ key }: { key: string }) => {
    console.log(floatMenu);
    navigate(key);
    dispatch(addTag(key));
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const currentOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (currentOpenKey !== undefined) {
      const repeatIndex = keys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setOpenKeys(
        keys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setOpenKeys(keys);
    }
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  useEffect(() => {
    const pathname = location.pathname.split("/").filter(Boolean);
    setOpenKeys([`/${pathname[0]}`]);
  }, []);

  return (
    <div className="w-[240px]">
      <Menu
        items={menuList}
        mode="inline"
        selectedKeys={selectedKeys}
        onClick={handleItemClick}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
      ></Menu>
    </div>
  );
};
export default LeftMenu;
