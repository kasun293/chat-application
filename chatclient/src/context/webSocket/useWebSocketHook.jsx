import { useContext } from "react";
import { WebSocketContext } from "./webSocketContext";

export const useWebSocket = () => useContext(WebSocketContext);