import { type RouteObject } from "react-router-dom";

interface RouteMeta {
  title?: string;
}

type IRouteProps = RouteObject & {
  meta?: RouteMeta;
  children?: IRouteProps[];
};

export interface ItemsProps {
  key: string;
  label: string;
  children?: ItemsProps[];
}

export interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

export default IRouteProps;
