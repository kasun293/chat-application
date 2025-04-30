import { useState } from "react";
import AddContactDialog from "../components/AddContactDialog";
import ContactList from "./ContactList";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { DEF_ACTIONS } from "../../../constants/permissions";
import DeleteDialog from "../../../components/DeleteDialog/DeleteDialog";
import { deleteContact } from "../../../action/contact/action";
// import { DEF_ACTIONS } from "../../../constants/permissions";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  // const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'error' | 'info' | 'warning'
  });
  const handleClickOpen = () => {
    setAction(DEF_ACTIONS.ADD);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setAction(DEF_ACTIONS.EDIT);
    setOpen(true);
    // setSelectedContact(contact);
  };
  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      // Call the delete API here using the selectedContact ID
      await deleteContact(selectedContact.id, onSuccess, onError); // Assuming you have a deleteContact function in your action file
      setLoading(false);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedContact(null);
  };

  const onSuccess = () => {
    setSnackbar({
      open: true,
      message: "Contact Deleted successfully!",
      severity: "success",
    });
  };

  const onError = (message) => {
    setSnackbar({
      open: true,
      message: message || "Something went wrong!",
      severity: "error",
    });
  };
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box mt={1} display={"flex"} justifyContent={"center"}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Add Contact
        </Button>
      </Box>
      {!loading && (
        <ContactList onClickEdit={handleEdit} onClickDelete={handleDelete} />
      )}
      <AddContactDialog
        setLoading={setLoading}
        action={action}
        handleClose={handleClose}
        open={open}
        selectedContact={selectedContact}
      />
      <DeleteDialog
        property={selectedContact?.name}
        open={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contact;
