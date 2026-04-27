import { useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { getLoggedInUser } from "../../action/login/action";

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    fetchUserData();
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUserData = async () => {
    try {
      const response = await getLoggedInUser();
      setUser(response?.payload);
      if (window.location.pathname === "/login") {
        window.location.href = "/chats";
      }
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const value = {
    user,
    getUser,
    removeUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};
