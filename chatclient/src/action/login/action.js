import axios from "axios";
import { StorageConstants } from "../../constants/storage-constants";
import { defaultMessages } from "../../constants/apiMessages";
import { get, post } from "../axios";
// import { authAxios } from "../api/api";

export const fetchUserList = async () => {
  try {
    const response = await fetch("url");
    if (response.ok) {
      return { dataList: response.payload };
    } else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMessageList = async () => {
  try {
    const response = await axios.get("url");
    if (response.ok) {
      return { dataList: response.payload };
    } else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const getConversationList = async () => {
//   try {
//     const response = await axios.get("conversations");
//     if (response.ok) {
//       return { dataList: response.payload };
//     } else {
//       const exception = {
//         apiError: response.message,
//       };
//       throw exception;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const deleteConversation = async (
  formData,
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await axios.delete("url");
    if (response) {
      console.log(response);
    } else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const getUserProfile = async () => {
//   try {
//     const response = await axios.get("url");
//     if (response.ok) {
//       return response;
//     } else {
//       const exception = {
//         apiError: response.message,
//       };
//       throw exception;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getUserProfile = async (
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
};

export const updateGroupConversation = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = axios.put("url");
    if (response) {
      return response;
    } else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createGroupConversation = async () => {
  try {
    const response = axios.post("url");
    if (response) {
      return response;
    } else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const login = async () => {
//   try {
//     const response = await axios.post("http://localhost:8080/api/v1/users/login")
//     console.log({login})
//     if (response) {
//       console.log({response})
//       localStorage.setItem("token", response.token)
//       return response

//     }
//   } catch (error) {
//     console.log(error)

//   }
// }

export const signUp = async (
  signUpData,
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await post("users/register", signUpData);
    console.log({ response });

    if (response?.httpCode === "200 OK") {
      onSuccess();
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
      onError(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      onError(error);
    }
  }
};

export const login = async (
  loginData,
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await post("users/login", loginData);

    if (response?.httpCode === "200 OK") {
      localStorage.setItem(
        StorageConstants.token,
        response.payload.accessToken,
      );
      onSuccess();
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
      onError(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      onError(error);
    }
  }
};

export const getLoggedInUser = async (
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await get("users/logged-in-user", true);

    if (response?.httpCode === "200 OK") {
      onSuccess();
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
      onError(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      onError(error);
    }
  }
};
