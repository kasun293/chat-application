import { defaultMessages } from "../../constants/apiMessages";
import { api_delete, get, post, put } from "../axios";

export const getContactList = async (
  page = 0,
  size = 10,
  sortBy = "id",
  sortOrder = "asc",
) => {
  try {
    const response = await get(
      `contacts?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      true,
    );
    const { httpCode } = response;
    if (httpCode === "200 OK") {
      return {
        response,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getAllContactList = async (
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
    return {
      dataList: [],
    };
  }
};

export const deleteContact = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await api_delete(`contacts/${id || ""}`, true);
    if (response?.httpCode === "200 OK") {
      onSuccess();
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
      onError(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      onError(error);
    }
  }
};
export const createContact = async (
  data = {},
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await post("contacts", data, true);
    if (response?.httpCode === "200 OK") {
      onSuccess();
      return {
        dataList: response?.payload,
      };
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
      onError(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      onError(exception);
    }
  }
};

export const updateContact = async (
  data = {},
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await put(`contacts/${data?.id || ""}`, data, true);
    if (response.httpCode === "200 OK") {
      onSuccess();
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
    console.log(response);
  } catch ({ error }) {
    if (typeof error === "object") {
      const { data } = error;
      const { apiError } = data;
      onError(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      onError(error);
    }
  }
};
