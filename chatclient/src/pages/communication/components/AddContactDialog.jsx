import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  colors,
} from "@mui/material";
import { FieldName } from "../../../components/FieldName";
import { Fonts } from "../../../constants/Fonts";
import { DEF_ACTIONS } from "../../../constants/permissions";
// import { useEffect, useState } from "react";
import { createContact, updateContact } from "../../../action/contact/action";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { defaultMessages } from "../../../constants/apiMessages";
import { useSnackBars } from "../../../context/snackbars/useSnackBarHook";
import PropTypes from "prop-types";

const AddContactDialog = ({
  open,
  handleClose,
  action,
  setLoading,
  selectedContact,
}) => {
  console.log({ action });
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (selectedContact && Object.keys(selectedContact).length > 0) {
      setFormData(selectedContact);
    }
  }, [selectedContact]);
  const { addSnackBar } = useSnackBars();

  const handleChange = (value, key) => {
    setFormData((currentData = {}) => {
      let newData = { ...currentData };
      newData[key] = value;
      return newData;
    });
  };

  const onSuccess = () => {
    addSnackBar({
      type: "success",
      message:
        action === DEF_ACTIONS.EDIT
          ? "Contact updated successfully!"
          : "Contact added successfully!",
    });
    setFormData({});
    handleClose();
  };

  const onError = (message) => {
    addSnackBar({
      type: "error",
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  const confirmAction = async (event, data) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (action === DEF_ACTIONS.EDIT) {
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
      PaperProps={{ sx: { borderRadius: "15px", backgroundColor: "#ffffff" } }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
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
            <Grid container spacing={2}>
              <Grid item sm={12} md={12} lg={12}>
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
                  value={formData?.displayName || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "displayName")
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
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
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
              </Grid>
              <Grid item mt={3} sm={12} md={12} lg={12}>
                <Button
                  fullWidth
                  disabled={action === DEF_ACTIONS.VIEW}
                  onClick={(event) => confirmAction(event, formData)}
                  // color="success"
                  variant="contained"
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#5763FF",
                    borderRadius: "7px",
                  }}
                >
                  {action === DEF_ACTIONS.EDIT ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

AddContactDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  setLoading: PropTypes.func.isRequired,
  selectedContact: PropTypes.object,
};

export default AddContactDialog;
