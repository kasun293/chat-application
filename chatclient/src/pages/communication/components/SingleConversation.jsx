/* eslint-disable react/prop-types */
import { Avatar, Box, Grid, styled, Typography } from "@mui/material";
import { useUser } from "../../../context/auth/useAuthHook";

const SingleConversation = ({
  conversation,
  handleConversation,
  isSelected,
}) => {
  const {user} = useUser();
  // const getDateTime = (unix) => {
  //   if (!unix) return "";
  //   const timestamp = unix * 1000;
  //   const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  //   const time = new Intl.DateTimeFormat("en-US", options).format(
  //     new Date(timestamp)
  //   );
  //   return time;
  // };

  const getTemporalDateTime = (isoTime) => {
    if (!isoTime) return "";
    // Asia/Colombo
    const options = {
  timeZone: 'Asia/Colombo',
  // year: 'numeric',
  // month: 'long',
  // day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,};
    const date = new Date(isoTime);
    return date.toLocaleString('en-US', options);    
};

  const getConversationName = (conversation) => {
    if (conversation?.conversationType === "GROUP") {
      return conversation?.conversationName;
    } else {
      const contact = conversation?.contacts.filter((contact) => contact.id !== user.id)[0];
      return contact?.displayName || "Unknown User";
    }
  };
  return (
    <>
      <HoverBox
        sx={{ backgroundColor: isSelected ? "#d7daff" : "white" }}
        borderRadius={"10px"}
        // backgroundColor={"lightgreen"}
        height={"50px"}
        // border={"1px solid green"}
        onClick={handleConversation}
        // margin={"15px"}
        mb={1}
      >
        <Grid
          container
          direction="row"
          alignItems={"center"}
          // alignContent={"center"}
          height={"100%"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Avatar sx={{ml: 1}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Box>
              <Box>
              <Typography
              sx={{
                fontWeight: isSelected ? "bold" : "normal",
                fontSize: "clamp(0.8em, 1vw, 2rem)",
              }}
            >
              {getConversationName(conversation)}
            </Typography>
            </Box>
            <Box>
              <Typography fontSize={"clamp(0.6em, 0.7vw, 0.8rem)"} color={"gray"}>
                Amal: How are you?
              </Typography>
            </Box>
            </Box>
          </Box>
          <Box display={"flex"} height={"100%"} alignItems={"top"}>
            <Typography fontSize={"clamp(0.5em, 0.5vw, 0.7rem)"} pr={1} pt={1}>
              {getTemporalDateTime(conversation?.createdDate)}
            </Typography>
          </Box>
          {/* <p >{conversation?.description}</p> */}
        </Grid>
      </HoverBox>
    </>
  );
};

const HoverBox = styled(Box)`
  border-radius: 5px;
  background-color: white;
  height: 50px;
  // margin: 5px;
  transition: background-color 0.3s;
  align-content: center;

  &:hover {
    background-color: #d7daff;
    cursor: pointer;
  }
`;

export default SingleConversation;
