/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
// import { stringAvatar } from "../../../constants/stringUtils";

const ChatMessage = ({ message, user, conversation }) => {
  console.log({ message });

 const getTemporalDateTime = (isoTime) => {
  if (!isoTime) return "";
  return new Date(isoTime).toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const time = getTemporalDateTime(message?.timeStamp);
  
  return (
    <Box
      sx={{
        // backgroundColor: "rgb(255, 255, 255)",

        zIndex: 111,
        // width: "fit-content",
        // contentFit: "max-content",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: message?.senderId === user?.id ? "flex-end" : "flex-start",
        margin: "10px 0",
        borderRadius: "10px",
        // padding: "5px",
        pt: 1,
        pl: 1,
      }}
    >
      {conversation?.conversationType === "GROUP" && (
        <Box
          sx={{
            marginRight: message?.senderId === user?.id ? "8px" : "auto",
            display: "flex",
            flexDirection:
              message?.senderId === user?.id ? "row-reverse" : "row",
            alignItems: "center",
            gap: 1,
            backgroundColor:
              message?.senderId === user?.id
                ? "rgb(220, 248, 198)"
                : "rgb(255, 255, 255)",
          }}
        >
          {/* <Avatar {...stringAvatar(message?.senderName)} size="35" round={true} /> */}
          {/* <h6>{message?.senderName}</h6> */}
          <Typography sx={{ fontSize: "12px" }}>
            {message?.senderName}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          marginRight: message?.senderId === user?.id ? "8px" : "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "60%",
          height: "auto",
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingRight: "10px",
          paddingLeft: "10px",
          borderRadius: "16px",
          wordWrap: "break-word",
          backgroundColor:
            message?.senderId === user?.id
              ? "rgb(220, 248, 198)"
              : "rgb(255, 255, 255)",
        }}
      >
        <p style={{ color: "black" }}>{message?.content}</p>
        <p style={{paddingLeft: "10px", alignSelf: "flex-end", fontSize: "10px", color: "gray" }}>{time}</p>
      </Box>
    </Box>
  );
};

export default ChatMessage;
