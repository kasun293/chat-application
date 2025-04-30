/* eslint-disable react/prop-types */
import { Box, Grid, styled, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SingleConversation = ({
  conversation,
  handleConversation,
  isSelected,
  user,
}) => {
  console.log({ conversation });
  const getDateTime = (unix) => {
    if (!unix) return "";
    const timestamp = unix * 1000;
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const time = new Intl.DateTimeFormat("en-US", options).format(
      new Date(timestamp)
    );
    return time;
  };

  const getConversationName = (conversation) => {
    if (conversation?.conversationType === "GROUP") {
      return conversation?.conversationName;
    } else {
      if (conversation?.createdBy === user?.id) {
        return conversation?.contacts[0]?.name;
      } else {
        return conversation?.creatorName;
      }
    }
  };
  return (
    <Box>
      <HoverBox
        sx={{ backgroundColor: isSelected ? "#424AC2" : "#5763FF" }}
        borderRadius={"10px"}
        // backgroundColor={"lightgreen"}
        height={"50px"}
        // border={"1px solid green"}
        onClick={handleConversation}
        margin={"5px"}
      >
        <Grid
          container
          direction="row"
          alignItems={"center"}
          // alignContent={"center"}
          justifyContent={"space-between"}
        >
          <AccountCircleIcon sx={{ px: 1 }} fontSize="large" />
          <Typography>{getConversationName(conversation)}</Typography>
          <Typography>{getDateTime(conversation?.createdDate)}</Typography>
          {/* <p >{conversation?.description}</p> */}
        </Grid>
      </HoverBox>
    </Box>
  );
};

const HoverBox = styled(Box)`
  border-radius: 10px;
  background-color: lightpurple;
  height: 40px;
  margin: 5px;
  transition: background-color 0.3s;
  align-content: center;

  &:hover {
    background-color: #323994;
    cursor: pointer;
  }
`;

export default SingleConversation;
