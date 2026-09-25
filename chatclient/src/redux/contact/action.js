import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultMessages } from "../../constants/apiMessages";
import { api_delete, get, post, put } from "../../action/axios";

export const getContactList = createAsyncThunk (
  "contact/getContactList",
  async (params, thunkApi) => {
  try {
    const response = await get(
      `contacts?page=${params.page}&size=${params.size}&sortBy=${params.sortBy}&sortOrder=${params.sortOrder}`,
      true,
    );
    const { httpCode } = response;
    console.log(response)
    if (httpCode === "200 OK") {
      return response;
    }
    return response;
  } catch (error) {
    console.log(error);
    thunkApi.rejectWithValue(error);
    return {};
  }
});

export const getAllContactList = createAsyncThunk (
    "contact/getAllContactList",
    async (thunkApi
) => {
  try {
    const response = await get(
      `contacts/list`,
      true,
    );
    const { httpCode, payloadDto } = response;
    if (httpCode === "200 OK") {
      return {
        dataList: payloadDto,
      };
    }
    return {
      dataList: [],
    };
  } catch (error) {
    console.log(error);
    thunkApi.rejectWithValue(error);
    return {
      dataList: [],
    };
  }
});

export const deleteContact = createAsyncThunk (
  "contact/deleteContact",
  async (id, ThunkApi) => {
    try {
      const response = await api_delete(`contacts/${id || ""}`, true);
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
      ThunkApi.rejectWithValue(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      ThunkApi.rejectWithValue(error);
    }
  }
});

export const createContact = createAsyncThunk (
  "contact/createContact",
  async (data, thunkApi) => {
  try {
    const response = await post("contacts", data, true);
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
  } catch (exception) {
    if (typeof exception === "object") {
      const { error } = exception;
      const { data } = error;
      const { apiError } = data;
      thunkApi.rejectWithValue(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      thunkApi.rejectWithValue(exception);
    }
  }
});

export const updateContact = createAsyncThunk (
  "contact/updateContact",
  async (data, thunkApi) => {
  try {
    const response = await put(`contacts/${data?.id || ""}`, data, true);
    if (response.httpCode === "200 OK") {
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
      thunkApi.rejectWithValue(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      thunkApi.rejectWithValue(error);
    }
  }
});
