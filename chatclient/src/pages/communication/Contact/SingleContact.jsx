/* eslint-disable react/prop-types */
import { Box, Grid, IconButton, styled, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Delete, Edit } from "@mui/icons-material";

const SingleContact = ({
  contact,
  handleConversation,
  isSelected,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <>
      <Box>
        <HoverBox
          sx={{ backgroundColor: isSelected ? "#424AC2" : "#5763FF" }}
          borderRadius={"10px"}
          height={"50px"}
          onClick={handleConversation}
          margin={"5px"}
        >
          <Grid container direction="row" alignItems={"center"}>
            <AccountCircleIcon sx={{ px: 1 }} fontSize="large" />
            <Typography>{contact?.name}</Typography>
            <Box justifySelf={"flex-end"} sx={{ marginLeft: "auto" }}>
              <IconButton onClick={() => onClickEdit(contact)}>
                <Edit fontSize="small" sx={{ color: "white" }} />
              </IconButton>
              <IconButton onClick={() => onClickDelete(contact)}>
                <Delete fontSize="small" sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Grid>
        </HoverBox>
      </Box>
    </>
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

export default SingleContact;
