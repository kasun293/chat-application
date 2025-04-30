/* eslint-disable react/prop-types */
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  colors,
} from "@mui/material";
import { FieldName } from "../../../components/FieldName";
import { Fonts } from "../../../constants/Fonts";
import { DEF_ACTIONS } from "../../../constants/permissions";
// import { create } from "@mui/material/styles/createTransitions";
import { useEffect, useState } from "react";
import { createContact, updateContact } from "../../../action/contact/action";

const AddContactDialog = ({
  open,
  handleClose,
  mode,
  action,
  setLoading,
  selectedContact,
}) => {
  const [formData, setFormData] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'error' | 'info' | 'warning'
  });
  useEffect(() => {
    if (action === DEF_ACTIONS.EDIT) {
      setFormData(selectedContact);
    }
  }, [action, selectedContact]);
  console.log({ selectedContact, action });
  const handleChange = (value, key) => {
    setFormData((currentData = {}) => {
      let newData = { ...currentData };
      newData[key] = value;
      return newData;
    });
  };
  const onSuccess = () => {
    setSnackbar({
      open: true,
      message: "Contact saved successfully!",
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
  const confirmAction = async (event, data, mode) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (formData?.id) {
        await updateContact(data, onSuccess, onError);
      } else {
        await createContact(data, onSuccess, onError);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      className="add-contact-dialog"
      open={open}
      onClose={handleClose}
      aria-labelledby="add-contact"
      aria-describedby="add a new contact"
      PaperProps={{ sx: { borderRadius: "15px", backgroundColor: "#ACE1AF" } }}
    >
      <DialogTitle
        id="new-contact"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {action} Contact
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            sx={{
              margin: "15px",
              width: "97%",
              borderRadius: "5px",
            }}
          >
            <Grid item sm={12} md={12} lg={12}>
              <div>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Name
                </FieldName>
                <TextField
                  name="name"
                  id="name"
                  value={formData?.name || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) => handleChange(e?.target?.value || "", "name")}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${colors.white}`,
                    },
                  }}
                />
              </div>
              <div>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Phone Number
                </FieldName>
                <TextField
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData?.phone || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "phone")
                  }
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      backgroundColor: `${colors.white}`,
                    },
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            setFormData({});
          }}
          autoFocus
          color="info"
          variant="contained"
          size="small"
          sx={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
        <Button
          disabled={action === DEF_ACTIONS.VIEW}
          onClick={(event) => confirmAction(event, formData, mode)}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginLeft: "20px" }}
        >
          {action === DEF_ACTIONS.EDIT ? "Update" : "Save"}
        </Button>
      </DialogActions>
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
    </Dialog>
  );
};

export default AddContactDialog;
