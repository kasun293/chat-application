import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { DEF_ACTIONS } from "../../constants/permissions";
import { useEffect, useState } from "react";
import {
  createGroupConversation,
  deleteConversation,
  getUserProfile,
  updateGroupConversation,
} from "../../action/login/action";
import ChatPage from "./components/ChatPage";
// import CreateGroupDialog from "./components/CreateGroupDialog";
import DialogBox from "../../components/DialogBox";
import AddContactDialog from "./components/AddContactDialog";
import SingleConversation from "./components/SingleConversation";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import IconButton from "@mui/material/IconButton";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { BASE_URL } from "../../api";
// import { useUserAccessValidation } from "../../helpers/permission";
import { getConversationList } from "../../action/conversation/action";
import TabContent from "../../components/TabContent/TabContent";
import ChatIcon from "@mui/icons-material/Chat";
import ContactsIcon from "@mui/icons-material/Contacts";
// import ContactList from "./Contact/ContactList";
import Contact from "./Contact/Contact";

const Chat = () => {
  // useUserAccessValidation();
  const [conversation, setConversation] = useState(null);
  const [conversationList, setconversationList] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);
  const [value, setValue] = useState(0);

  const toggleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getHeader() {
    switch (value) {
      case 0:
        return "Chats";
      case 1:
        return "Contacts";
      default:
        return "Chats";
    }
  }

  useEffect(() => {
    const selectUser = async () => {
      getUserProfile()
        .then((response) => {
          setUser(response);
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
        setConversation(null);
      }
    };

    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    setMessages([]);
    const newClient = new Client({
      webSocketFactory: () => new SockJS(BASE_URL + "ws-endpoint"),

      onConnect: () => {
        conversationList.forEach((item) => {
          newClient.subscribe(`/topic/${item.id}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
        });
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });

    newClient.activate();
    setClient(newClient);

    return () => {
      newClient.deactivate();
    };
  }, [conversationList]);

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
      display={"grid"}
      alignContent={"center"}
      justifyItems={"center"}
      width={"100vw"}
      height={"100vh"}
    >
      <Grid container lg={8} justifyContent="center">
        <Grid className="chat-list" item xs={3} md={3} lg={3.5}>
          <Box
            sx={{
              height: "100%",
              overflow: "auto",
              position: "relative",
              border: "none",
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
                {getHeader()}
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
            <Box>
              <Tabs
                value={value}
                onChange={toggleChange}
                aria-label="icon tabs example"
              >
                <Tab title="Chats" icon={<ChatIcon />} aria-label="chat-list" />
                <Tab
                  title="Contacts"
                  icon={<ContactsIcon />}
                  aria-label="contact-list"
                />
              </Tabs>
              <TabContent value={value} index={0}>
                {loading === false &&
                  conversationList.map((group) => (
                    <SingleConversation
                      user={user}
                      key={group.id}
                      conversation={group}
                      handleConversation={() => selectConversation(group.id)}
                      isSelected={conversation?.id === group.id}
                    />
                  ))}
              </TabContent>
              <TabContent value={value} index={1}>
                <Contact />
              </TabContent>
            </Box>
          </Box>
        </Grid>
        <Grid className="message-window" item xs={4} md={8} lg={8}>
          <ChatPage
            conversation={conversation}
            list={conversationList}
            user={user}
            client={client}
            messages={messages}
          />
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
        <AddContactDialog
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
