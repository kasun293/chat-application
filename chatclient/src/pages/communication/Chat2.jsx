import { Box, Typography } from "@mui/material";
import ChatList from "../ChatList";
import { useEffect, useState } from "react";
import ChatPage2 from "./components/ChatPage2";
// import { MessageData } from "./conversation-data";
import NewChatToolTip from "./newChatTooltip/NewChatToolTip";
import { getConversationList } from "../../action/conversation/action";
import { useUser } from "../../context/auth/useAuthHook";
import { useWebSocket } from "../../context/webSocket/useWebSocketHook";
import { useLocation } from "react-router-dom";

const Chat2 = () => {
  const [conversationList, setConversationList] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { client, messages } = useWebSocket();
  const location = useLocation();

  useEffect(() => {
    const fetchConversations = async () => {
      const queryParams = new URLSearchParams(location.search);
      const conversationId = queryParams.get("id");
      setLoading(true);
      // mock fetch delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Fetch conversations logic here
      try {
        const response = await getConversationList();
        setConversationList(response?.dataList || []);
        if (conversationId) {
          const selectedConversation = response?.dataList?.find((conv) => conv?.id === Number(conversationId));
          setConversation(selectedConversation || null);
        } else {
          setConversation(response?.dataList[0] || null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [location.search]);

  const selectConversation = (groupId) => {
    const selectedGroup = conversationList.find(
      (group) => group.id === groupId,
    );
    if (selectedGroup) {
      setConversation(selectedGroup);
    }
  };

  return (
    <>
      <Box flexGrow={1} display={"flex"} flexDirection={"row"}>
        <Box
          id="chat-list-container"
          flexGrow={1}
          borderRadius={"0.6em"}
          bgcolor={"white"}
          p={2}
        >
          <Box
          // p={2}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                sx={{
                  // padding: 2,
                  // margin: 2,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontStyle: "Regular",
                  fontSize: "clamp(0.8em, 1.5vw, 2rem)",
                }}
              >
                Chats
              </Typography>
              <NewChatToolTip />
            </Box>
          </Box>
          <ChatList
            loading={loading}
            conversationList={conversationList}
            selectConversation={selectConversation}
            conversation={conversation}
            isSelected={conversation?.id}
          />
        </Box>
        <Box
          ml={2}
          borderRadius={"0.6em"}
          flexGrow={5}
          bgcolor={"white"}
          // spacing={2}
          display={"flex"}
          // backgroundColor={"lightgray"}
        >
          {!loading && !!user && (
            <ChatPage2
              conversation={conversation}
              user={user}
              client={client}
              messages={messages}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Chat2;
