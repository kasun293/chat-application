import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoudPage from "../components/NotFoudPage";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Chat from "../pages/communication/Chat";

export const Routes = () => {
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/chat",
          element: <Chat />,
        },
      ],
    },
  ];

  const routesForNonAuthenticatedOnly = [
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFoudPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  const { token } = useAuth();

  const router = createBrowserRouter([
    ...routesForNonAuthenticatedOnly,
    ...(token ? routesForAuthenticatedOnly : []),
  ]);

  return <RouterProvider router={router} />;
};
