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

export const transformRoutes = (routes: IRouteProps[]): ItemsProps[] => {
  //@ts-ignore
  return routes
    .map((route) => {
      const { path, children, ...reset } = route;

      if (!path) return;

      return {
        key: path,
        label: reset.meta?.title || "系统管理",
        children: children
          ? transformRoutes(children ?? []).filter(() => {
              return path;
            })
          : undefined,
      };
    })
    .filter((item) => item);
};

export const floatArray = (array: any[]) => {
  const arr: any[] = [];
  const floatChildren = (list: any[]) => {
    arr.push(
      ...(list.reduce((prev, next) => {
        prev.push(next);
        if (next.children) {
          floatChildren(next.children);
        }
        return prev;
      }, []) ?? [])
    );
  };

  floatChildren(array);

  return arr;
};
