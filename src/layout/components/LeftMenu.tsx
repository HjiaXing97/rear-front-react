import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Menu, type MenuProps } from "antd";

import { authRoutes } from "@/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTag } from "@/store/modules/tags";

import { transformRoutes, addMenuHierarchy, floatArray } from "@/utils";
import type { LevelKeysProps } from "@/types/route";

type MenuItems = Required<MenuProps>["items"][number];

const LeftMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tag } = useAppSelector((stata) => stata.tagsSlice);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuList: MenuItems[] = transformRoutes(authRoutes);
  const levelKeys = addMenuHierarchy(menuList as LevelKeysProps[]);

  const floatMenu = floatArray(menuList);

  const handleItemClick = ({ key }: { key: string }) => {
    const tagIndex = tag.findIndex((item) => item.key === key);
    if (tagIndex === -1) {
      console.log(key);
      console.log(floatMenu);

      const menuItem = floatMenu.find((item) => item.key === key);
      dispatch(addTag(menuItem));
    }
    navigate(key);
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

    const menuItem = floatMenu.find((item) => item.key === location.pathname);
    if (menuItem) dispatch(addTag(menuItem));
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
