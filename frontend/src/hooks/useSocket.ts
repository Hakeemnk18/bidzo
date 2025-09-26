import { useEffect } from "react";
import { socket } from "../socket";

export const useSocket = (userId: string, onNotification: (data: any) => void) => {
  useEffect(() => {
    if (!userId) return;

    socket.connect(); // connect to server
    socket.emit("join", userId); // join user-specific room

    socket.on("notification", (data: any) => {
      console.log("New notification received:", data);
      onNotification(data); // update state in your component
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, [userId, onNotification]);
};
