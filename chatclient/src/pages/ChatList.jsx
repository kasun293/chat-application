import { Box, Skeleton } from "@mui/material";
import SingleConversation from "./communication/components/SingleConversation";
import PropTypes from "prop-types";

const ChatList = ({
  loading,
  conversationList,
  selectConversation,
  conversation,
}) => {
  return (
    <Box
      pt={3}
      sx={{
        overflowY: "auto",
        maxHeight: "80vh",
        width: "100%",
        alignItems: "center",
      }}
    >
      {loading === false ? (
        <>
          {conversationList.map((group) => (
            <SingleConversation
              key={group.id}
              conversation={group}
              handleConversation={() => selectConversation(group.id)}
              isSelected={conversation?.id === group.id}
            />
          ))}
        </>
      ) : (
        <>
          {[...Array(15)].map((_, index) => (
            <Box
              mb={1}
              key={index}
              width={"100%"}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Skeleton variant="circular" width={"6vh"} height={"5vh"} />
              <Skeleton
                sx={{ borderRadius: "0.5em" }}
                key={index}
                variant="rectangular"
                width="100%"
                height={"5vh"}
              />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

ChatList.propTypes = {
  conversationList: PropTypes.array.isRequired,
  selectConversation: PropTypes.func.isRequired,
  conversation: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default ChatList;
