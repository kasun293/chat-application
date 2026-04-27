import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import ContactList from "../Contact/ContactList";
import { useState } from "react";
// import { Fonts } from "../../../constants/Fonts";

const NewChatDialog = ({ open, handleClose, handleClickContact }) => {
  const [groupChat, setGroupChat] = useState(false);

  const handleGroupChat = () => {
    setGroupChat(true);
  };
  const handleBack = () => {
    setGroupChat(false);
  };
  // const handleClickContact = (contact) => {
  //   console.log("Selected contact:", contact);
  // };

  return (
    <Dialog
      className="add-contact-dialog"
      open={open}
      onClose={handleClose}
      aria-labelledby="add-contact"
      aria-describedby="add a new contact"
      PaperProps={{
        sx: {
          borderRadius: "15px",
          backgroundColor: "#8fa9ffff",
          height: "60vh",
          width: "20vw",
        },
      }}
    >
      {/* <DialogTitle
        id="new-contact"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {action} Contact
      </DialogTitle> */}
      <DialogContent>
        <Typography>This is dialog content</Typography>
        <Box>
          <Button onClick={handleGroupChat}>Start new group chat</Button>
        </Box>
        <Box>
          {groupChat === true ? (
            <Typography>Group chat component</Typography>
          ) : (
            <ContactList handleClickContact={handleClickContact} />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {groupChat && (
          <Button
            onClick={() => {
              handleBack();
            }}
            autoFocus
            color="info"
            variant="contained"
            size="small"
            sx={{ marginLeft: "10px" }}
          >
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            handleClose();
          }}
          autoFocus
          color="error"
          variant="contained"
          size="small"
          sx={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
NewChatDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClickContact: PropTypes.func.isRequired,
};

export default NewChatDialog;
