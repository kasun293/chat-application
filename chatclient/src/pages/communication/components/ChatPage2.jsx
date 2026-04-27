/* eslint-disable react/prop-types */
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import Bg from "../../../assets/chat-bg.jpeg";
import SendIcon from "@mui/icons-material/Send";
import { useWebSocket } from "../../../context/webSocket/useWebSocketHook";
import { getConversationMessageList } from "../../../action/message/action";

const ChatPage2 = ({ conversation, user, client, messages }) => {
  const [messagesList, setMessagesList] = useState([]);
  console.log({ conversation });
  const [inputData, setInputData] = useState("");
  const { messageMap } = useWebSocket();
  // const filteredMessages = messages.filter(
  //   (item) => item?.conversationId === conversation?.id
  // );
  const messageInputRef = useRef();
  const messagesEndRef = useRef(null);
  const handleChange = (value) => {
    setInputData((current = {}) => {
      let newData = { ...current };
      newData = value;
      return newData;
    });
  };

  const fetchMessagesForConversation = async (conversationId) => {
    try {
      const response = await getConversationMessageList(conversationId);
      setMessagesList(response?.dataList || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMessagesList((current = []) => {
      let newData = [...current];
      if (messageMap.has(conversation?.id)) {
        newData = [...newData, messageMap.get(conversation?.id)];
      } else {
        newData = [];
      }
      return newData;
    });
  }, [messageMap]);

  useEffect(() => {
    if (conversation?.id) {
      fetchMessagesForConversation(conversation?.id);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      publishMessage();
      event.preventDefault();
    }
  };

  const publishMessage = () => {
    if (client && conversation?.id && messageInputRef.current.value) {
      const chatMessage = {
        content: messageInputRef.current.value,
        conversationId: conversation?.id,
        senderId: user?.id,
        senderName: `${user?.displayName}`,
        timeStamp: new Date().toISOString(),
      };
      console.log("chatmessagewithtimestamp", chatMessage);
      client.publish({
        destination: "/app/send-message",
        body: JSON.stringify(chatMessage),
        skipContentLengthHeader: true,
      });
      messageInputRef.current.value = "";
      setInputData("");
      setMessagesList((current) => {
        let newData = [...current, chatMessage];
        return newData;
      });
    }
  };

  const getConversationName = (conversation) => {
    if (conversation?.conversationType === "GROUP") {
      return conversation?.conversationName;
    } else {
      return conversation?.contacts.filter((contact) => contact.id !== user.id)[0]?.displayName || "Unknown User";
      // return "Unknown User";
    }
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <Box
      className="chat-page"
      display="flex"
      flexGrow={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="left"
      // bgcolor={"lightpink"}
      // ml={2}
    >
      <Box bgcolor={"white"} gap={2} p={2} display={"flex"}>
        <Avatar {...stringAvatar(getConversationName(conversation))} />
        <Typography>{getConversationName(conversation)}</Typography>
      </Box>
      <Box
        sx={{
          background: `linear-gradient(rgba(240, 240, 240, 0.8), rgba(240, 240, 240, 0.8)), url(${Bg})`,
          // opacity: 0.12,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "16px",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "auto",
          width: "100%",
          border: "none",
          position: "relative",
          // borderRadius: "20px",
          // boxShadow:
          //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {messagesList.map((message, index) => (
          <ChatMessage key={index} message={message} user={user} conversation={conversation} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box display="flex" justifyContent="left" alignItems="left" mt={2}>
        <TextField
          sx={{
            color: "white",
            // "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
            width: "100%",
            height: "10px",
            "& .MuiOutlinedInput-root": {
              // borderRadius: "36px",
              "& fieldset": {
                borderColor: "gray",
              },
              "& input": {
                height: "10px",
              },
            },
          }}
          inputProps={{ style: { color: "black" } }}
          inputRef={messageInputRef}
          variant="outlined"
          placeholder="Type a message..."
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Box marginLeft={2}>
          <Button
            disabled={
              // client == null || conversation?.id == null || inputData === ""
              conversation?.id == null || inputData === ""
            }
            variant="contained"
            // color="secondary"
            sx={{
              width: "94px",
              height: "42px",
              borderRadius: "36px",
              backgroundColor: "#78ABA8",
              ":hover": {
                backgroundColor: "#538392",
              },
            }}
            onClick={publishMessage}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage2;
