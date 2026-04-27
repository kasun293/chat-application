import NotFoudPage from "../components/NotFoudPage";
import Login2 from "../pages/login/Login2";
import SignUp2 from "../pages/signup/SignUp2";
import ProtectedRoute from "./ProtectedRoute";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Chat2 from "../pages/communication/Chat2";
import { Typography } from "@mui/material";
import ContactList from "../pages/ContactList";
import MiniDrawer from "../pages/drawer/MiniDrawer copy";

 export const routes = [
    {
      path: "/",
      element: <MiniDrawer />, // Parent layout
      errorElement: <NotFoudPage />,
      children: [
        {
          name: "Chat",
          path: "chats",
          index: true,
          icon: <ChatOutlinedIcon />,
          element: (
            <ProtectedRoute>
              <Chat2 />
            </ProtectedRoute>
          ),
        },
        {
          name: "Group Chats",
          icon: <PeopleAltOutlinedIcon />,
          path: "group-chats",
          element: (
            <ProtectedRoute>
              <Typography>Group Chats</Typography>
            </ProtectedRoute>
          ),
        },
        {
          name: "Add contacts",
          icon: <AddIcCallOutlinedIcon />,
          path: "contacts",
          element: (
            <ProtectedRoute>
              <ContactList />
            </ProtectedRoute>
          ),
        },
        {
          name: "Settings",
          icon: <SettingsOutlinedIcon />,
          path: "settings",
          element: (
            <ProtectedRoute>
              <Typography>Settings</Typography>
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login2 />,
    },
    {
      path: "/signup",
      element: <SignUp2 />,
    },
  ];