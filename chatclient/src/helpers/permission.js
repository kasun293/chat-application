import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getLocalStorageItem } from "../storage/localStorage";
import { StorageConstants } from "../constants/storage-constants";

export const useUserAccessValidation = () => {
  const [initilizing, setInitializing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const validateUserLoggedInState = () => {
    try {
      const isLoggedIn = getUserLoggedState();

      if (!isLoggedIn && !["/", "/signup"].includes(location.pathname)) {
        navigate("/");
      } else if (isLoggedIn && ["/", "/signup"].includes(location.pathname)) {
        navigate("/chat-new");
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
  const token = getLocalStorageItem(StorageConstants.token);

  if (token === null || token === undefined) {
    return false;
  }
  return true;
};
