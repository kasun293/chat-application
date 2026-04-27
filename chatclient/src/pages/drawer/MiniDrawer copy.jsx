import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import { useUserAccessValidation } from "../../helpers/permission";
import { useNavigate } from "react-router-dom";
import { StorageConstants } from "../../constants/storage-constants";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSnackBars } from "../../context/snackbars/useSnackBarHook";
import { SnackBarTypes } from "../../components/SnackBar/SnackBarTypes";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../context/auth/useAuthHook";
import Main from "../Main";
import { routes } from "../../routes/routes";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  border: "none",
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const MiniDrawer = () => {
  // useUserAccessValidation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();
  const { token, setToken } = useAuth();
  const { user, getUser, removeUser} = useUser();
    console.log({token})
    console.log({getUser})

  React.useEffect(() => {
    if (token === null) {
      navigate("/login");
    } else {
      navigate("/chats");
    }
  }, [token, navigate]);

  const handleMenueItemIndex = (index) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSuccess = () => {
    removeUser();
    navigate("/chat-new");
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Logout successful!",
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Logout failed!",
    });
  };

  const logOut = () => {
    try {
      localStorage.removeItem(StorageConstants.token);
      setToken(null);
      onSuccess();
      navigate("/login");
    } catch (error) {
      onError();
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ boxShadow: "none" }} position="fixed" open={open}>
        <Toolbar
          id="tool-bar"
          sx={{ backgroundColor: "white", borderLeft: "none", color: "black" }}
        >
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Add search bar here
          </Typography>
          <Box
            display={"flex"}
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            <Typography>{user?.displayName}</Typography>
            <Button
              sx={{ marginLeft: 2 }}
              variant="contained"
              color="secondary"
              onClick={logOut}
            >
              Logout
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        id="drawer"
        variant="permanent"
        open={open}
        sx={{ border: "none" }}
      >
        <DrawerHeader id="drawer-header">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          {routes[0].children.map(
            (child, index) => (
              <ListItem key={child.name} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => {handleMenueItemIndex(index); navigate(child.path)}
                  }
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                      mx: 2,
                      my: 1,
                      borderRadius: 1,
                      bgcolor: selectedIndex === index ? "#5763FF" : "white",
                      ":hover": {
                        background:
                          selectedIndex === index ? "#6a74ffff" : null,
                      },
                    },
                    open
                      ? {
                          justifyContent: "initial",
                        }
                      : {
                          justifyContent: "center",
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                        color: selectedIndex === index ? "white" : "black",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    {index === 0 ? <ChatOutlinedIcon /> : null}
                    {index === 1 ? <PeopleAltOutlinedIcon /> : null}
                    {index === 2 ? <AddIcCallOutlinedIcon /> : null}
                    {index === 3 ? <SettingsOutlinedIcon /> : null}
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.name}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                      {
                        // Add the background color based on the condition
                        color: selectedIndex === index ? "white" : "black",
                      },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
        {/* <Divider /> */}
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box
        component="main"
        display={"flex"}
        flexDirection={"column"}
        sx={{ p: 3 }}
        height={"100vh"}
        width={"100%"}
        bgcolor={"#F5F6FF"}
      >
        <DrawerHeader />
        <Main />
      </Box>
    </Box>
  );
};

export default MiniDrawer;
