import io from "socket.io-client";
type MySocket = ReturnType<typeof io>;

const SOCKET_URL = "http://localhost:4004";
export const socket: MySocket = io(SOCKET_URL, {
  autoConnect: false,
});