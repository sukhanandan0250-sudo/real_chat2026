import { io } from "socket.io-client";

// In production (Vercel), socket connects to same domain via rewrites.
// In local dev, explicitly point to the backend port.
const socketURL =
  process.env.REACT_APP_SOCKET_URL ||
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:8000");

// autoConnect: false — we manually connect after the user logs in
const socket = io(socketURL, {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export default socket;
