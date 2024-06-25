/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  colors,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DEF_ACTIONS } from "../constants/permissions";
import { FieldName } from "../components/FieldName";
import { Fonts } from "../constants/Fonts";

const CreateGroupDialog = ({
  open,
  handleClose,
  confirmAction,
  formData,
  mode,
  handleChange,
  action,
}) => {
  const [options, setOptions] = useState([]);
  const [cropOptions, setCropOptions] = useState([]);
  const [gnOptions, setGnOptions] = useState([]);

  console.log(options);
  console.log(cropOptions);
  console.log(gnOptions);

  useEffect(() => {
    // getAllAiAndMahaweliUnits().then(({ dataList = [] }) => {
    setOptions();
    // });
    // get_CropList().then(({ dataList = [] }) => {
    //   let newDtaList = dataList.map((item) => {
    //     return { value: item.id, name: item.description };
    //   });
    setCropOptions();
    // });
    // get_GnDivisionListWithoutPage().then(({ dataList = [] }) => {
    //   let newGnOptions = dataList.map((item) => {
    //     return { value: item.id, name: item.name };
    //   });
    setGnOptions();
    // });
  }, []);

  return (
    <Dialog
      className="create-group-dialog"
      open={open}
      onClose={handleClose}
      aria-labelledby="new-group"
      aria-describedby="add a new group"
      PaperProps={{ sx: { borderRadius: "15px", backgroundColor: "#ACE1AF" } }}
    >
      <DialogTitle
        id="new-group"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} Create New Group
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
                  Group Name
                </FieldName>
                <TextField
                  name="groupName"
                  id="groupName"
                  value={formData?.conversationName || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "conversationName")
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
                  Description
                </FieldName>
                <TextField
                  name="description"
                  id="description"
                  value={formData?.description || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "description")
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
                <FieldName>Filter Type</FieldName>
                <Select
                  name="filterType"
                  id="filterType"
                  value={formData?.filterType || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "filterType")
                  }
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                  }}
                  size="small"
                >
                  <MenuItem value={"GROUP"}>Group</MenuItem>
                  <MenuItem value={"PRIVATE"}>Private</MenuItem>
                </Select>
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

export default CreateGroupDialog;
