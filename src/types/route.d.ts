import { type RouteObject } from "react-router-dom";

interface RouteMeta {
  title?: string;
}

type IRouteProps = RouteObject & {
  meta?: RouteMeta;
  children?: IRouteProps[];
};

export default IRouteProps;
