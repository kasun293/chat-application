import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "./action";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLogout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(signUp.pending, (state) => {
        state.loading = true;
    })
    .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
    })
    .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(login.pending, (state) => {
        state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.payload.accessToken;
        state.isAuthenticated = true;
    })
    .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
  }
});

export const { setUser, setToken, setIsAuthenticated, setLogout } = authSlice.actions;

export default authSlice.reducer;