import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../action/axios";
import { defaultMessages } from "../../constants/apiMessages";

export const signUp = createAsyncThunk(
  'user/signUp',
  async (signUpData, thunkAPI) => {
  try {
    const response = await post("users/register", signUpData);
    console.log({ response });

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

export const login = createAsyncThunk(
  'user/login',
  async (loginData, thunkAPI) => { 
  try {
    const response = await post("users/login", loginData);

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