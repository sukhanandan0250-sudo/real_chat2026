import { io } from "socket.io-client";

// autoConnect: false — we manually connect after the user logs in
const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8000", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export default socket;
