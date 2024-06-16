import { createBrowserRouter } from "react-router-dom";
import NotFoudPage from "../components/NotFoudPage";
import Login from "../communication/Login";
import SignUp from "../communication/SignUp";
import Chat from "../communication/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFoudPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
