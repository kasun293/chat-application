/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatPage = ({ conversation, user, client, messages }) => {
  const [inputData, setInputData] = useState("");
  const filteredMessages = messages.filter(
    (item) => item?.conversationId === conversation?.id
  );
  const messageInputRef = useRef();
  const messagesEndRef = useRef(null);
  const handleChange = (value) => {
    setInputData((current = {}) => {
      let newData = { ...current };
      newData = value;
      return newData;
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

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
        senderName: `${user?.firstName} ${user?.lastName}`,
      };
      client.publish({
        destination: "/app/send-message",
        body: JSON.stringify(chatMessage),
        skipContentLengthHeader: true,
      });
      messageInputRef.current.value = "";
      setInputData("");
    }
  };

  return (
    <Box
      className="chat-page"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="left"
      ml={2}
    >
      <Box
        sx={{
          height: "500px",
          overflow: "auto",
          width: "100%",
          border: "none",
          borderRadius: "20px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {filteredMessages.map((message, index) => (
          <ChatMessage key={index} message={message} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box display="flex" justifyContent="left" alignItems="left" mt={2}>
        <TextField
          sx={{
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
            width: "100%",
            height: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "36px",
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
              client == null || conversation?.id == null || inputData === ""
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
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
