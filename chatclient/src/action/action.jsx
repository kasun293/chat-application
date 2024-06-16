import axios from "axios";

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

export const getConversationList = async () => {
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

export const deleteConversation = async (
  formData,
    onSuccess = () => {},
    onError = (_message) => {}
) => {
  try {
    const response = await axios.delete("url")
    if (response){
      console.log(response)
    }else{
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUserProfile = async () => {
  try{
    const response = await axios.get("url");
    if(response.ok) {
      return response;
    } else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  }catch (error){
    console.log(error)
  }
}

export const updateGroupConversation = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = axios.put('url')
    if(response){
      return response;
    } else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error)
    
  }
}

export const createGroupConversation = async () => {
  try {
    const response = axios.post("url")
    if (response){
      return response;
    }else {
      const exception = {
        apiError: response.message,
      };
      throw exception;
    }
  } catch (error) {
    console.log(error)
  }
}