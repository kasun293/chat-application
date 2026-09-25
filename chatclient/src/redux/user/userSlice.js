import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUser, getUserProfile} from "./action";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: null,
    email: null,
    displayName: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.displayName = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
    })
    .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
    })
    .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(getLoggedInUser.pending, (state) => {
        state.loading = true;
    })
    .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.payload.id;
        state.displayName = action.payload.payload.displayName;
    })
    .addCase(getLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;