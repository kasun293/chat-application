import { defaultMessages } from "../../constants/apiMessages";
import { get, post } from "../axios";

export const getConversationList = async (
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const { httpCode, payloadDto } = await get("conversations", true);
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

export const createPrivateConversation = async (
  data = "",
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const response = await post("conversations/private?contactNumber=" + data, null, true);
    if (response?.httpCode === "200 OK") {
      onSuccess();
      return {
        payload: response?.payload,
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
