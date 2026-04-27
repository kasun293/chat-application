import { Avatar, Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { defaultMessages } from "../../../constants/apiMessages";
import { createPrivateConversation } from "../../../action/conversation/action";
import { useSnackBars } from "../../../context/snackbars/useSnackBarHook";
import { useLocation, useNavigate } from "react-router-dom";
const NewSingleChat = ({ contactList }) => {
  const { addSnackBar } = useSnackBars();
  const location = useLocation();
  const navigate = useNavigate();

  const onSuccess = () => {
    addSnackBar({
      type: "success",
      message: "Chat created successfully!",
    });
    // handleClose();
  };

  const onError = (message) => {
    addSnackBar({
      type: "error",
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  const handleContactClick = async (contact) => {
    // mock fetch delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const {payload} = await createPrivateConversation(contact?.phone, onSuccess, onError);
      const conversationId = payload?.id;
      if (conversationId) {
        const newUrl = `${location.pathname}?id=${conversationId}`;
        // window.history.pushState({ path: newUrl }, "", newUrl);
        navigate(newUrl);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <Box bgcolor={"white"}>
        <Box mt={1}>
          <Typography
            pb={2}
            fontSize={"clamp(0.8em, 1vw, 1rem)"}
            color={"gray"}
          >
            All Contacts
          </Typography>
          <Box maxHeight={"40vh"} overflow={"auto"}>
            {/* Map through contacts here */}
            {contactList.map((contact) => (
              <Button
                onClick={() => handleContactClick(contact)}
                key={contact?.id}
                fullWidth
                sx={{
                  color: "black",
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
              >
                <Box
                  key={contact?.id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar sx={{ width: "4vh", height: "4vh", mr: 1 }} />
                  <Typography
                    fontSize={"clamp(0.8em, 1vw, 1rem)"}
                    fontWeight={450}
                    color={"black"}
                  >
                    {contact?.displayName}
                  </Typography>
                </Box>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

NewSingleChat.propTypes = {
  contactList: PropTypes.array.isRequired,
};

export default NewSingleChat;
