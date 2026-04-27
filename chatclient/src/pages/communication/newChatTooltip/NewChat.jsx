import React, { useEffect, useState } from "react";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  // Avatar,
  Box,
  Button,
  CircularProgress,
  colors,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import NewSingleChat from "./NewSingleChat";
import NewGroupChat from "./NewGroupChat";
import { getAllContactList } from "../../../action/contact/action";

const NewChat = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      // mock fetch delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Fetch contacts logic here
      try {
        const response = await getAllContactList();
        setContactList(response?.dataList || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const [contactList, setContactList] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (value) => {
    const searchTerm = value.toLowerCase();

    setContactList(() => {
      // 1. Create a shallow copy to avoid mutating the original 'contactList'
      const sortedContacts = [...contactList].sort((a, b) => {
        const nameA = a.displayName.toLowerCase();
        const nameB = b.displayName.toLowerCase();

        // 2. Find the position of the search term in each name
        const indexA = nameA.indexOf(searchTerm);
        const indexB = nameB.indexOf(searchTerm);

        // 3. Logic: If it's not found (-1), move it to the end.
        // If it is found, the lower the index (closer to start), the higher the rank.
        if (indexA === -1 && indexB !== -1) return 1;
        if (indexA !== -1 && indexB === -1) return -1;

        // If both match, sort by the earliest occurrence
        if (indexA !== indexB) return indexA - indexB;

        // If they match at the same position, sort alphabetically
        return nameA.localeCompare(nameB);
      });

      return sortedContacts;
    });
  };

  return (
    <>
      <Box sx={{ padding: "1em 0em 0em 1em" }} bgcolor={"white"}>
        {activeTab === 0 && (
          <Box>
            <Typography
              fontSize={"clamp(1em, 1.2vw, 2rem)"}
              color={"black"}
              fontWeight={500}
            >
              New chat
            </Typography>
          </Box>
        )}
        {activeTab === 1 && (
          <Box display={"flex"} alignItems={"flex-start"}>
            <IconButton
              size="small"
              sx={{ mr: 1 }}
              onClick={() => setActiveTab(0)}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              fontSize={"clamp(1em, 1.2vw, 2rem)"}
              color={"black"}
              fontWeight={500}
            >
              Group chat
            </Typography>
          </Box>
        )}
        <Box pt={1}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <InputBase
              placeholder="Search name or number"
              inputProps={{ "aria-label": "search name or number" }}
              // value={formData?.name || ""}
              //   disabled={action === DEF_ACTIONS.VIEW}
              onChange={(e) => handleChange(e?.target?.value)}
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  backgroundColor: `${colors.white}`,
                  fontSize: "clamp(0.8em, 1vw, 1rem)",
                },
                fontSize: "clamp(1.2em, 1vw, 1rem)",
              }}
            />
          </Box>
        </Box>
        {activeTab === 0 && (
          <>
            <Box>
              <Button
                fullWidth
                sx={{
                  color: "black",
                  fontSize: "clamp(0.8em, 1vw, 1rem)",
                  justifyContent: "flex-start",
                }}
                component="label"
                role={undefined}
                variant="text"
                tabIndex={-1}
                startIcon={<PeopleAltOutlinedIcon />}
                onClick={() => setActiveTab(1)}
              >
                {" "}
                Group Chat
              </Button>
            </Box>
            <Box>
              <Button
                fullWidth
                sx={{
                  color: "black",
                  fontSize: "clamp(0.8em, 1vw, 1rem)",
                  justifyContent: "flex-start",
                }}
                component="label"
                role={undefined}
                variant="text"
                tabIndex={-1}
                startIcon={<AddIcCallOutlinedIcon />}
              >
                {" "}
                Add Contact
              </Button>
            </Box>
          </>
        )}
        {activeTab === 0 && (
          <>
            {loading === false ? (
              <NewSingleChat contactList={contactList} />
            ) : (
              <Box
                p={2}
                color={"grey.500"}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                <CircularProgress color="inherit" />
              </Box>
            )}
          </>
        )}
        {activeTab === 1 && (
          <>
            {loading === false ? (
              <NewGroupChat contactList={contactList} />
            ) : (
              <Box
                p={2}
                color={"grey.500"}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                <CircularProgress color="inherit" />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default NewChat;
