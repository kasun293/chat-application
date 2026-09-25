import axios from "axios";
// import { StorageConstants } from "../../constants/storage-constants";
// import { defaultMessages } from "../../constants/apiMessages";
// import { get, post } from "../axios";
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




