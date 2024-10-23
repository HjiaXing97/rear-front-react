import { useRoutes } from "react-router-dom";
import { routes } from "@/router";
import { Suspense } from "react";
const App = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>{useRoutes(routes)}</Suspense>
  );
};

export default App;
