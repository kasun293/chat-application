import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoudPage from "../components/NotFoudPage";
import Login from "../communication/Login";
import SignUp from "../communication/SignUp";
import Chat from "../communication/Chat";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";

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
