import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const useUserAccessValidation = () => {
  const [initilizing, setInitializing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const validateUserLoggedInState = async () => {
    try {
      const isLoggedIn = await getUserLoggedState();
  console.log({ isLoggedIn });

      if (!isLoggedIn && location.pathname === "/chat") {
        navigate("/");
      }
      setInitializing(false);
    } catch (error) {
      setInitializing(false);
      console.error(error);
    }
  };
  useEffect(() => {
    validateUserLoggedInState();
  }, []);
  return initilizing;
};

export const getUserLoggedState = () => {
  const token = getLsToken();

  if (token === null || token === undefined) {
    return false;
  }
  return true;
};

export const getLsToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
