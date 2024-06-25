import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Snackbar,
} from "@mui/material";
import { DEF_ACTIONS } from "../constants/permissions";
import { useEffect, useState } from "react";
import SingleConversation from "./SingleConversation";
import {
  createGroupConversation,
  deleteConversation,
  getConversationList,
  getUserProfile,
  updateGroupConversation,
} from "../action/action";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import ChatPage from "./ChatPage";
import CreateGroupDialog from "./CreateGroupDialog";
import DialogBox from "../components/DialogBox";
import FloatingActionButtons from "../components/FloatingActionButtons";
import AddContactDialog from "./AddContactDialog";

const Chat = () => {
  const [conversation, setConversation] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [ contactOpen, setContactOpen ] = useState(false);

  console.log({contactOpen})
  // const containerRef = useRef(null);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  console.log({ formData });

  useEffect(() => {
    selectUser();
  }, []);
  useEffect(() => {
    fetchGroupList();
  }, [loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if (
      //   !event.target.closest(
      //     ".button-group, .chat-page, .create-group-dialog, .delete-group-dialog, .autocomplete"
      //   ) && action !== DEF_ACTIONS.EDIT
      // ) {
      //   setConversation(null);
      // }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectUser = () => {
    getUserProfile()
      .then((response) => {
        console.log({ response });
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log({ user });
  const selectConversation = (groupId) => {
    const selectedGroup = groupList.find((group) => group.id === groupId);
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

  const handleContactOpen  = () => {
    setContactOpen(true);
  }

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

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    setOpen(true);
    setformData(conversation);
  };

  const onDelete = () => {
    setAction(DEF_ACTIONS.DELETE);
    setformData(conversation);
    setOpenDelete(true);
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

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    setOpen(true);
    setformData(conversation);
    console.log("onedit", formData);
  };

  const fetchGroupList = () => {
    getConversationList().then(({ dataList = [] }) => {
      console.log({ dataList });
      setGroupList(dataList);
    });
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
    <div
      style={{
        width: "1000px",
      }}
    >
      {/* <h4>Chat Functionality - Beta</h4> */}
      <Grid container justifyContent="center">
        <Grid className="button-group" item xs={3} md={3} lg={3}>
          <Box
            sx={{
              height: "100%",
              overflow: "auto",
              position: "relative",
              border: "1px solid pink",
              borderRadius: "20px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Button
              fullWidth
              sx={{
                ":hover": {
                  backgroundColor: "#538392",
                },
                backgroundColor: "#78ABA8",
              }}
              onClick={handleOpen}
              title="add"
            >
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
            <ButtonGroup
              variant="contained"
              disableElevation
              size="small"
              aria-label="action button group"
              fullWidth
              sx={{
                ":hover": {
                  backgroundColor: "#538392",
                },
                backgroundColor: "#78ABA8",
              }}
            >
              <Button
                sx={{
                  ":hover": {
                    backgroundColor: "#538392",
                  },
                  backgroundColor: "#78ABA8",
                }}
                onClick={handleOpen}
                title="add"
              >
                <Add />
                {DEF_ACTIONS.ADD}
              </Button>
              {conversation !== null && (
                <Button
                  sx={{
                    backgroundColor: "#78ABA8",
                  }}
                  onClick={onEdit}
                  title="edit"
                >
                  <Edit />
                  {DEF_ACTIONS.EDIT}
                </Button>
              )}
              {conversation !== null && (
                <Button
                  sx={{
                    backgroundColor: "#78ABA8",
                  }}
                  onClick={onView}
                  title="view"
                >
                  <Vrpano />
                  {DEF_ACTIONS.VIEW}
                </Button>
              )}
              {conversation !== null && (
                <Button
                  sx={{
                    backgroundColor: "#78ABA8",
                  }}
                  onClick={onDelete}
                  title="delete"
                >
                  <Delete />
                  {DEF_ACTIONS.DELETE}
                </Button>
              )}
            </ButtonGroup>
            {loading === false &&
              groupList.map((group) => (
                <SingleConversation
                  key={group.id}
                  conversation={group}
                  handleConversation={() => selectConversation(group.id)}
                  isSelected={conversation?.id === group.id}
                />
              ))}
            <FloatingActionButtons 
              title={"Add Contacts"}
              onClick={handleContactOpen}
            />
          </Box>
        </Grid>
        <Grid item xs={4} md={8} lg={8}>
          <ChatPage conversation={conversation} user={user} />
        </Grid>
        <AddContactDialog
        open={contactOpen}
        handleClose
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
    </div>
  );
};

export default Chat;
