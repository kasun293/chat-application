import { useEffect, useState } from "react";
import { useUser } from "../auth/useAuthHook";
import { useAuth } from "../../hooks/useAuth";
import { WebSocketContext } from "./webSocketContext";
import SockJS from "sockjs-client";
import { BASE_URL } from "../../api";
import { Client } from "@stomp/stompjs";

const WebSocketProvider = (props) => {
    
  const {user} = useUser();
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageMap, setMessageMap] = useState(new Map());
  console.log("messageMap", messageMap);
  const {token} = useAuth();
  
  useEffect(() => {
    if (!user?.id || !token) return;
      setMessages([]);
      const newClient = new Client({
        webSocketFactory: () => new SockJS(BASE_URL + "ws-endpoint"),
        connectHeaders: {
      Authorization: `Bearer ${token}`
    },
  
        onConnect: () => {
            newClient.subscribe(`/topic/${user?.id}`, (message) => {
              const newMessage = JSON.parse(message.body);
              setMessages((prevMessages) => [newMessage, ...prevMessages]);
              setMessageMap((prevMap) => {
                const updatedMap = new Map(prevMap);
                updatedMap.set(newMessage?.conversationId, newMessage);
                return updatedMap;
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
    }, [user?.id, token]);

    const value = {
        client,
        messages,
        messageMap,
    }

    return (<WebSocketContext.Provider value={value} {...props} />);
}

export default WebSocketProvider;