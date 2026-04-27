import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fonts } from "../../../constants/Fonts";
import CloseIcon from "@mui/icons-material/Close";
import { DEF_ACTIONS } from "../../../constants/permissions";

const DeleteDialog = ({
  open,
  handleClose,
  action,
  title,
  confirmAction,
  itemTitle,
  itemDescription,
}) => {
  return (
    <>
      <Dialog
        className="add-contact-dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="add-contact"
        aria-describedby="add a new contact"
        PaperProps={{
          sx: { borderRadius: "15px", backgroundColor: "#ffffff" },
        }}
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
          {action} {title}
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
                <Grid
                  item
                  sm={12}
                  md={12}
                  lg={12}
                  backgroundColor={"#f5faff"}
                  borderRadius={"5px"}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    mb={1}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {itemTitle ? itemTitle : ""}
                      {" - "}
                      {itemDescription ? itemDescription : ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Are you sure you want to delete this contact?
                  </Typography>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <Typography variant="body2" color="textSecondary">
                    This action cannot be undone.
                  </Typography>
                </Grid>
                <Grid item mt={3} sm={12} md={12} lg={12}>
                  <Button
                    fullWidth
                    disabled={action === DEF_ACTIONS.VIEW}
                    onClick={(event) => confirmAction()}
                    // color="success"
                    variant="contained"
                    size="large"
                    sx={{
                      color: "white",
                      backgroundColor: "#5763FF",
                      borderRadius: "7px",
                    }}
                  >
                    {/* {action === DEF_ACTIONS.EDIT ? "Update" : "Save"} */}
                    {"Confirm"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  confirmAction: PropTypes.func.isRequired,
  title: PropTypes.string,
  itemDescription: PropTypes.string,
  itemTitle: PropTypes.string,
};
