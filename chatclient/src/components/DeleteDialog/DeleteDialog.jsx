/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const DeleteDialog = ({ property, open, onConfirm, onCancel }) => {
  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogTitle>Do you want to delete?</DialogTitle>
          <Typography>{property}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
