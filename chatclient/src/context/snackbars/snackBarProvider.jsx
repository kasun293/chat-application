import { useState } from "react";
import { SnackBarContext } from "./SnackBarContext";

export const SnackBarProvider = (props) => {
  const [snackBars, setSnackBars] = useState([]);

  const addSnackBar = (snackbar) => {
    let newSnackBars = [...snackBars];
    newSnackBars.push(snackbar);
    setSnackBars(newSnackBars);
  };

  const removeSnackBar = (index) => {
    let newSnackBars = [...snackBars];
    newSnackBars[index] = null;
    setSnackBars(newSnackBars);
  };

  const resetSnackBar = () => {
    setSnackBars([]);
  };

  const value = {
    snackBars,
    addSnackBar,
    removeSnackBar,
    resetSnackBar,
  };

  return <SnackBarContext.Provider value={value} {...props} />;
};
