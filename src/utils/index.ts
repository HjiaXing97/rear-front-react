import type IRouteProps from "@/types/route";
import type { LevelKeysProps, ItemsProps } from "@/types/route";

export const addMenuHierarchy = (menus: LevelKeysProps[]) => {
  const key: Record<string, number> = {};

  const func = (menu: LevelKeysProps[], level = 1) => {
    menu.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };

  func(menus);

  return key;
};

export const transformRoutes = (
  routes: IRouteProps[],
  parantPath = ""
): ItemsProps[] => {
  //@ts-ignore
  return routes
    .map((route) => {
      const { path, children, ...reset } = route;

      if (!path) return;

      return {
        key: parantPath ? `${parantPath}/${path}` : (path as string),
        label: reset.meta?.title || "系统管理",
        children: children
          ? transformRoutes(children ?? [], path).filter(() => {
              return path;
            })
          : undefined,
      };
    })
    .filter((item) => item);
};
