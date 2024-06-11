import { Snackbar } from "@mui/material";
import { DEF_ACTIONS } from "../constants/permissions";
import { useEffect, useRef, useState } from "react";


const Chat = () => {
  const [conversation, setConversation] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const containerRef = useRef(null);
  const [ action, setAction ] = useState(DEF_ACTIONS.ADD);

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

  const handleClose = () => {
    setOpen(false);
  };
  const confirmAction = async () => {
    setLoading(true);
    try {
      if (formData?.id) {
        await updateGroup(formData, onSuccess, onError);
      } else {
        await createGroup(formData, onSuccess, onError);
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
    await deleteMessageGroup(formData, onSuccess, onError);
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
    getMessageGroupList().then(({ dataList = [] }) => {
      console.log({ dataList });
      setGroupList(dataList);
    });
  };
  const onSuccess = () => {
    <Snackbar>
      <Alert severity="success">Success</Alert>
    </Snackbar>
  };

  const onError = (message) => {
    <Snackbar>
      <Alert severity="success">Success</Alert>
    </Snackbar>
  };
  const renderSelectedItems = () => {
    return <p>{conversation?.groupId}</p>;
  };

  return (
    <div>
      <h4>Chat Functionality - Beta</h4>
      <Grid container justifyContent="center">
        <Grid className="button-group" item xs={3} md={3} lg={3}>
          <Box
            sx={{
              height: "100%",
              overflow: "auto",

              border: "3px solid green",
              borderRadius: "20px",
            }}
          >
            <ButtonGroup
              variant="contained"
              disableElevation
              size="small"
              aria-label="action button group"
              color="success"
              fullWidth
            >
                <Button onClick={handleOpen} title="add">
                  <Add />
                  {DEF_ACTIONS.ADD}
                </Button>
              {conversation !== null && (
                  <Button onClick={onEdit} title="edit">
                    <Edit />
                    {DEF_ACTIONS.EDIT}
                  </Button>
              )}
              {conversation !== null && (
                  <Button onClick={onView} title="view">
                    <Vrpano />
                    {DEF_ACTIONS.VIEW}
                  </Button>
              )}
              {conversation !== null && (
                  <Button onClick={onDelete} title="delete">
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
          </Box>
        </Grid>
        <Grid item xs={4} md={8} lg={8}>
          <ChatPage conversation={conversation} user={user} />
        </Grid>
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
            <ActionWrapper>
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
            </ActionWrapper>
          }
        >
          <>
            <DeleteMsg />
            <Divider sx={{ mt: "16px" }} />
            {renderSelectedItems()}
          </>
        </DialogBox>
      </Grid>
    </div>
  );
};

export default Chat;
