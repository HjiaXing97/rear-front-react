import { Outlet } from "react-router-dom";

const AppMain = () => {
  return (
    <div className="flex-1">
      <Outlet />
    </div>
  );
};
export default AppMain;
