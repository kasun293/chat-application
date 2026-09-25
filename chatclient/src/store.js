import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import userReducer from "./redux/user/userSlice";
import contactReducer from "./redux/contact/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
  },
});