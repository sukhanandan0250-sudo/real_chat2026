import { io } from "socket.io-client";

const productionSocketUrl = "https://real-chat-backend2026.onrender.com";

const socketURL =
  process.env.REACT_APP_SOCKET_URL ||
  (process.env.NODE_ENV === "production" ? productionSocketUrl : "http://localhost:8000");

// autoConnect: false — we manually connect after the user logs in
const socket = io(socketURL, {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export default socket;
