/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { getMessageList } from "../../../action/login/action";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatPage = ({ conversation, user }) => {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef();
  const messagesEndRef = useRef(null);
  const [client, setClient] = useState(null);
  const type = "GROUP";

  useEffect(() => {
    const fetchMessages = () => {
      getMessageList(type, conversation?.id).then(({ dataList = [] }) => {
        setMessages(dataList);
        console.log({ dataList });
      });
    };

    setMessages([]);
    fetchMessages();
    const newClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-endpoint"),
      onConnect: () => {
        newClient.subscribe(`/topic/${conversation.id}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });

    newClient.activate();
    setClient(newClient);

    return () => {
      newClient.deactivate();
    };
  }, [conversation?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      publishMessage();
      event.preventDefault();
    }
  };

  const publishMessage = () => {
    if (client) {
      const chatMessage = {
        content: messageInputRef.current.value,
        recipientType: "GROUP",
        recipientValue: conversation.id,
        senderId: user.id,
        senderName: `${user.firstName} ${user.lastName}`,
      };
      client.publish({
        destination: "/app/chat.send-message",
        body: JSON.stringify(chatMessage),
        skipContentLengthHeader: true,
      });
      messageInputRef.current.value = "";
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
          border: "1px solid pink",
          borderRadius: "20px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {messages.map((message, index) => (
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
        />
        <Box marginLeft={2}>
          <Button
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
