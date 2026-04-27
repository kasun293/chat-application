import { get } from "../axios";

export const getConversationMessageList = async (
    id
) => {
  try {
    const { httpCode, payloadDto } = await get("messages/conversation/"+id, true);
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