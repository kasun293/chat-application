import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";


export const AppRoutes = () => {
  

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
