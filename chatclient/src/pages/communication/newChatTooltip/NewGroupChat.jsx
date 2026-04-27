import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FieldName } from "../../../components/FieldName";
import { Colors } from "../../../constants/Colors";

const NewGroupChat = ({ contactList }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [formData, setFormData] = useState({});
  const [nextEnabled, setNextEnabled] = useState(false);
  console.log({ nextEnabled });

  const handleChangeNext = () => {
    setNextEnabled((prev) => !prev);
  };

  const handleChangeCancel = () => {
    setNextEnabled(false);
    setSelectedContacts([]);
    setFormData({});
  };

  const handleChangeGroupCreateCancel = () => {
    setNextEnabled(false);
    setFormData({});
  };

  const handleChange = (value, key) => {
    setFormData((currentData = {}) => {
      let newData = { ...currentData };
      newData[key] = value;
      return newData;
    });
  };

  const handleContactSelect = (contact) => {
    setSelectedContacts((prevSelected = []) => {
      let newSelected = [...prevSelected];
      if (newSelected.find((c) => c?.id === contact?.id)) {
        return newSelected;
      } else {
        return [...newSelected, contact];
      }
    });
  };

  const handleContactRemove = (contact) => {
    setSelectedContacts((prevSelected = []) => {
      let newSelected = [...prevSelected];
      const index = newSelected.findIndex((c) => c?.id === contact?.id);
      if (index !== -1) {
        newSelected.splice(index, 1);
      }
      return newSelected;
    });
  };

  return (
    <>
      <Box bgcolor={"white"}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          {selectedContacts.map((contact) => (
            <Grid item display={"flex"} alignItems={"center"} key={contact?.id}>
              <Typography fontSize={"clamp(0.8em, 0.8vw, 1rem)"}>
                {contact?.displayName}
              </Typography>
              <IconButton onClick={() => handleContactRemove(contact)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          ))}
          {selectedContacts.length > 0 && (
            <>
              {!nextEnabled && (
                <Grid container mt={1} mb={1} justifyContent={"space-between"}>
                  <Grid>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        width: "8em",
                        // mb: 4,
                        backgroundColor: "#5763FF", // Custom hex color
                        "&:hover": {
                          backgroundColor: "#6a74ffff", // Custom hover background color
                        },
                      }}
                      onClick={handleChangeNext}
                    >
                      Next
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{
                        width: "8em",
                      }}
                      onClick={handleChangeCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              )}
              {nextEnabled && (
                <>
                  <Box width={"100%"} mr={1}>
                    {/* <Grid item sm={12} md={12} lg={12}> */}
                    <FieldName
                      style={{
                        width: "100%",
                      }}
                    >
                      Group Name
                    </FieldName>
                    <TextField
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData?.phone || ""}
                      // disabled={action === DEF_ACTIONS.VIEW}
                      onChange={(e) =>
                        handleChange(e?.target?.value || "", "phone")
                      }
                      size="small"
                      // fullWidth
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                    />
                    {/* </Grid> */}
                  </Box>
                  <Grid
                    mt={2}
                    mb={2}
                    mr={1}
                    container
                    justifyContent={"space-between"}
                  >
                    <Grid>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          width: "8em",
                          // mb: 4,
                          backgroundColor: "#5763FF", // Custom hex color
                          "&:hover": {
                            backgroundColor: "#6a74ffff", // Custom hover background color
                          },
                        }}
                        onClick={handleChangeNext}
                      >
                        Create
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{
                          width: "8em",
                        }}
                        onClick={handleChangeGroupCreateCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
        {!nextEnabled && (
          <Box mt={1}>
            <Typography pb={2} fontSize={14} color={"gray"}>
              All Contacts
            </Typography>
            <Box maxHeight={"40vh"} overflow={"auto"}>
              {/* Map through contacts here */}
              {contactList.map((contact) => (
                <Button
                  key={contact.id}
                  fullWidth
                  sx={{
                    color: "black",
                    justifyContent: "flex-start",
                    textTransform: "none",
                  }}
                  onClick={() => handleContactSelect(contact)}
                >
                  <Box
                    key={contact.id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ width: "4vh", height: "4vh", mr: 1 }} />
                    <Typography
                      fontSize={"clamp(0.8em, 1vw, 1rem)"}
                      fontWeight={500}
                      color={"black"}
                    >
                      {contact.displayName}
                    </Typography>
                  </Box>
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

NewGroupChat.propTypes = {
  contactList: PropTypes.array.isRequired,
};

export default NewGroupChat;
