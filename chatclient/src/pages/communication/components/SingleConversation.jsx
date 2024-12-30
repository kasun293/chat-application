/* eslint-disable react/prop-types */
import { Box, Grid, styled, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SingleConversation = ({
  conversation,
  handleConversation,
  isSelected,
}) => {
  return (
    <Box>
      <HoverBox
        sx={{ backgroundColor: isSelected ? "#1bc247" : "lightgreen" }}
        borderRadius={"10px"}
        backgroundColor={"lightgreen"}
        height={"50px"}
        border={"1px solid green"}
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
          <Typography>{conversation?.groupId}</Typography>
          <Typography>{"23:12"}</Typography>
          {/* <p >{conversation?.description}</p> */}
        </Grid>
      </HoverBox>
    </Box>
  );
};

const HoverBox = styled(Box)`
  border-radius: 10px;
  background-color: lightgreen;
  height: 40px;
  border: 1px solid green;
  margin: 5px;
  transition: background-color 0.3s;
  align-content: center;

  &:hover {
    background-color: green;
    cursor: pointer;
  }
`;

export default SingleConversation;
