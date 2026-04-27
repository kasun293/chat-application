import { Box, Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ContactTable from "./ContactTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddContactDialog from "./communication/components/AddContactDialog";
import { useState } from "react";
import { DEF_ACTIONS } from "../constants/permissions";
import DeleteDialog from "./communication/components/DeleteDialog";
import { deleteContact } from "../action/contact/action";
import { useSnackBars } from "../context/snackbars/useSnackBarHook";
import { SnackBarTypes } from "../components/SnackBar/SnackBarTypes";

const ContactList = () => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { addSnackBar } = useSnackBars();

  const handleClickOpen = () => {
    setAction(DEF_ACTIONS.ADD);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedContact({});
    setOpen(false);
  };

  const handleRowEdit = (e) => {
    setSelectedContact(e);
    setAction(DEF_ACTIONS.EDIT);
    setOpen(true);
  };

  const handleRowDelete = (e) => {
    setSelectedContact(e);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    // Implement delete logic here
    setLoading(true);
    try {
      await deleteContact(selectedContact.id, onSuccess, onError);
    } catch (error) {
      console.log(error);
    }
    setSelectedContact({});
    setLoading(false);
    setDeleteDialogOpen(false);
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Contact deleted successfully!",
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Unexpected error occurred please contact support!",
    });
  };

  return (
    <>
      <Box flexGrow={1} display={"flex"} flexDirection={"row"}>
        <Box
          id="chat-list-container"
          flexGrow={1}
          borderRadius={"0.6em"}
          bgcolor={"white"}
          p={2}
        >
          <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Button
              variant="contained"
              sx={{
                mb: 4,
                backgroundColor: "#5763FF", // Custom hex color
                "&:hover": {
                  backgroundColor: "#6a74ffff", // Custom hover background color
                },
              }}
              onClick={handleClickOpen}
            >
              Add contact
            </Button>
            <TextField
              placeholder="Search contacts"
              sx={{ width: 500 }}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <ContactTable
            handleRowDelete={handleRowDelete}
            handleRowEdit={handleRowEdit}
            loading={loading}
          />
        </Box>
      </Box>
      <AddContactDialog
        selectedContact={selectedContact}
        open={open}
        setLoading={setLoading}
        onClose={handleDialogClose}
        handleClose={handleDialogClose}
        action={action}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        title={"Contact"}
        handleClose={() => setDeleteDialogOpen(false)}
        action="Delete"
        itemTitle={selectedContact?.phone}
        itemDescription={selectedContact?.displayName}
        confirmAction={handleDelete}
      />
    </>
  );
};

export default ContactList;
