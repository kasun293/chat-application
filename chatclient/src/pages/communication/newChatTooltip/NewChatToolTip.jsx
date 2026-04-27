import {
  ClickAwayListener,
  Grid,
  IconButton,
  //   TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import NewChat from "./NewChat";

const NewChatToolTip = () => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Grid>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              sx={{
                ".css-ja5taz-MuiTooltip-tooltip": { backgroundColor: "white" },
              }}
              title={<NewChat />}
              slotProps={{
                popper: {
                  disablePortal: false,
                },
                tooltip: {
                  sx: {
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: 3,
                  },
                },
              }}
            >
              <IconButton onClick={handleTooltipOpen}>
                <ChatIcon />
              </IconButton>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </Grid>
    </>
  );
};

export default NewChatToolTip;
