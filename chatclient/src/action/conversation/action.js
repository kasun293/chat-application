import { get } from "../axios";

export const getConversationList = async (
  onSuccess = () => {},
  onError = (_message) => {}
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
