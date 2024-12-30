import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { DEF_ACTIONS } from "../../constants/permissions";
import { useEffect, useState } from "react";
import {
  createGroupConversation,
  deleteConversation,
  getConversationList,
  getUserProfile,
  updateGroupConversation,
} from "../../action/login/action";
// import { Add } from "@mui/icons-material";
import ChatPage from "./components/ChatPage";
import CreateGroupDialog from "./components/CreateGroupDialog";
import DialogBox from "../../components/DialogBox";
// import FloatingActionButtons from "../../components/FloatingActionButtons";
import AddContactDialog from "./components/AddContactDialog";
import SingleConversation from "./components/SingleConversation";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import IconButton from "@mui/material/IconButton";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

const Chat = () => {
  const [conversation, setConversation] = useState(null);
  console.log({ conversation });
  const [conversationList, setconversationList] = useState([
    { id: 1, groupId: "group one" },
    { id: 2, groupId: "group two" },
    { id: 3, groupId: "group three" },
    { id: 4, groupId: "group four" },
    { id: 5, groupId: "group five" },
    { id: 6, groupId: "group six" },
    { id: 7, groupId: "group seven" },
    { id: 8, groupId: "group eight" },
    { id: 9, groupId: "group nine" },
    { id: 10, groupId: "group ten" },
    { id: 11, groupId: "group eleven" },
    { id: 12, groupId: "group twelve" },
    { id: 13, groupId: "group thirteen" },
    { id: 14, groupId: "group fourteen" },
    { id: 15, groupId: "group fifteen" },
  ]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  console.log({ contactOpen });
  // const containerRef = useRef(null);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  console.log({ formData });

  useEffect(() => {
    const selectUser = async () => {
      getUserProfile()
        .then((response) => {
          console.log({ response });
          setUser(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    selectUser();
  }, []);
  useEffect(() => {
    const fetchconversationList = async () => {
      getConversationList().then(({ dataList = [] }) => {
        console.log({ dataList });
        setconversationList(dataList);
      });
    };

    fetchconversationList();
  }, [loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".chat-list") &&
        !event.target.closest(".message-window")
      ) {
        console.log("clicked outside");
        setConversation(null);
      }
    };

    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const selectConversation = (groupId) => {
    const selectedGroup = conversationList.find(
      (group) => group.id === groupId
    );
    if (selectedGroup) {
      setConversation(selectedGroup);
    }
  };
  const handleChange = (value, target) => {
    setformData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  // const handleContactOpen = () => {
  //   setContactOpen(true);
  // };

  const handleContactClose = () => {
    setContactOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const confirmAction = async () => {
    setLoading(true);
    try {
      if (formData?.id) {
        await updateGroupConversation(formData, onSuccess, onError);
      } else {
        await createGroupConversation(formData, onSuccess, onError);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setLoading(false);
    setformData({});
  };
  const handleOpen = () => {
    setAction(DEF_ACTIONS.ADD);
    setOpen(true);
    setformData({});
  };

  // const onView = () => {
  //   setAction(DEF_ACTIONS.VIEW);
  //   setOpen(true);
  //   setformData(conversation);
  // };

  // const onDelete = () => {
  //   setAction(DEF_ACTIONS.DELETE);
  //   setformData(conversation);
  //   setOpenDelete(true);
  // };

  const confirmDelete = async () => {
    setformData(conversation);
    setLoading(true);
    await deleteConversation(formData, onSuccess, onError);
    setConversation(null);
    setOpenDelete(false);
    setLoading(false);
  };

  const closeDelete = () => {
    setOpenDelete(false);
  };

  // const onEdit = () => {
  //   setAction(DEF_ACTIONS.EDIT);
  //   setOpen(true);
  //   setformData(conversation);
  //   console.log("onedit", formData);
  // };

  const onSuccess = () => {
    <Snackbar>
      <Alert severity="success">Success</Alert>
    </Snackbar>;
  };

  const onError = (message) => {
    <Snackbar>
      <Alert severity="success">Success</Alert>
    </Snackbar>;
  };
  const renderSelectedItems = () => {
    return <p>{conversation?.groupId}</p>;
  };

  return (
    <Box
      alignContent={"center"}
      justifyItems={"center"}
      width={"100vw"}
      height={"100vh"}
    >
      <Grid container lg={8} justifyContent="center">
        <Grid className="chat-list" item xs={3} md={3} lg={3}>
          <Box
            sx={{
              height: "75vh",
              overflow: "auto",
              position: "relative",
              border: "1px solid pink",
              borderRadius: "20px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              "::-webkit-scrollbar": {
                width: "5px",
                height: "80%",
              },
              "::-webkit-scrollbar:hover": {
                width: "10px",
              },
              "::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#888",
                width: "5px",
                borderRadius: "4px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#555",
                cursor: "pointer",
                width: "10px",
              },
              "::-webkit-scrollbar-button": {
                height: "4%" /* Height of the scrollbar buttons */,
              },
            }}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  // float: "left",
                  color: "black",
                  p: "10px",
                }}
              >
                Chats
              </Typography>
              <Box>
                <IconButton
                  fullWidth
                  sx={{
                    ":hover": {
                      // backgroundColor: "#538392",
                    },
                    // backgroundColor: "#78ABA8",
                    // float: "right",
                  }}
                  onClick={handleOpen}
                  title="add"
                >
                  <DriveFileRenameOutlineIcon />
                  {/* {DEF_ACTIONS.ADD} */}
                </IconButton>
                <IconButton
                  fullWidth
                  sx={{
                    ":hover": {
                      // backgroundColor: "#538392",
                    },
                    // backgroundColor: "#78ABA8",
                    // float: "right",
                  }}
                  onClick={handleOpen}
                  title="add"
                >
                  <RecentActorsIcon />
                  {/* {DEF_ACTIONS.ADD} */}
                </IconButton>
              </Box>
            </Box>

            {loading === false &&
              conversationList.map((group) => (
                <SingleConversation
                  key={group.id}
                  conversation={group}
                  handleConversation={() => selectConversation(group.id)}
                  isSelected={conversation?.id === group.id}
                />
              ))}
            {/* <FloatingActionButtons
              sx={{ position: "sticky", bottom: "10px", right: "10px" }}
              title={"Add Contacts"}
              onClick={handleContactOpen}
            /> */}
          </Box>
        </Grid>
        <Grid className="message-window" item xs={4} md={8} lg={8}>
          <ChatPage conversation={conversation} user={user} />
        </Grid>
        <AddContactDialog
          open={contactOpen}
          handleClose={handleContactClose}
          confirmAction
          formData
          mode
          handleChange
          action
        />
        <CreateGroupDialog
          action={action}
          open={open}
          handleChange={handleChange}
          handleClose={handleClose}
          formData={formData}
          confirmAction={confirmAction}
        />
        <DialogBox
          className="delete-group-dialog"
          open={openDelete}
          title={`Delete Group`}
          actions={
            <div>
              <Button
                variant="contained"
                color="info"
                onClick={confirmDelete}
                sx={{ ml: "8px" }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={closeDelete}
                sx={{ ml: "8px" }}
              >
                Close
              </Button>
            </div>
          }
        >
          <>
            {/* <DeleteMsg /> */}
            <Divider sx={{ mt: "16px" }} />
            {renderSelectedItems()}
          </>
        </DialogBox>
      </Grid>
    </Box>
  );
};

export default Chat;
