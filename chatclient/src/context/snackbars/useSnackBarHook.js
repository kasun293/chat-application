import { useContext } from "react";
import { SnackBarContext } from "./SnackBarContext";

export const useSnackBars = () => {
  const context = useContext(SnackBarContext);
  return context;
};
