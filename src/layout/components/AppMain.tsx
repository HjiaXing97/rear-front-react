import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const AppMain = () => {
  return (
    <div className="flex-1">
      <Suspense fallback={<div>....loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default AppMain;
