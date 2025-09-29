import { socket } from "../socket";


export function connectSocket(userId: string) {
    if (socket.connected) {
        console.log("⚡ socket already connected:");
        return;
    }
    console.log("socket not connected")
    socket.connect();
    socket.emit("join", userId);
}

export function socketDisconnect() {
    socket.off("notification");
    socket.disconnect();
}
