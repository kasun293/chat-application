/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    colors,
  } from "@mui/material";
  import { DEF_ACTIONS } from "../constants/permissions";
  import { FieldName } from "../components/FieldName";
  import { Fonts } from "../constants/Fonts";
  
  const AddContactDialog = ({
    open,
    handleClose,
    confirmAction,
    formData,
    mode,
    handleChange,
    action,
  }) => {
  
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
          {mode} Add New Contact
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
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "name")
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
            onClick={handleClose}
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
      </Dialog>
    );
  };
  
  export default AddContactDialog;
  