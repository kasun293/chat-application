import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../action/axios";
import { defaultMessages } from "../../constants/apiMessages";

export const getUserProfile = createAsyncThunk( async (
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await get("users/logged-in-user", true);
    if (response?.httpCode === "200 OK") {
      return response?.payload;
    } else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error);
  }
});

export const getLoggedInUser = createAsyncThunk(
  'user/getLoggedInUser',
  async (_, thunkAPI) => {
    try {
      const response = await get("users/logged-in-user", true);

    if (response?.httpCode === "200 OK") {
      return response;
    } else {
      const exception = {
        error: {
          data: {
            apiError: {
              message: response?.message || defaultMessages.apiErrorUnknown,
            },
          },
        },
      };
      throw exception;
    }
  } catch ({ error }) {
    if (typeof error === "object") {
      const { data } = error;
      const { apiError } = data;
      thunkAPI.rejectWithValue(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      thunkAPI.rejectWithValue(error);
    }
  }
});