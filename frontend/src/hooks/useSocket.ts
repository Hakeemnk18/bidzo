import { useEffect } from "react";
import { socket } from "../socket";

export const useSocket = (userId: string, onNotification: (data: any) => void) => {
  useEffect(() => {
    if (!userId) return;

    socket.connect(); 
    socket.emit("join", userId); 

    socket.on("notification", (data: any) => {
      console.log("New notification received:", data);
      onNotification(data); 
    });

    return () => {
      console.log("return statement exceute")
      socket.off("notification");
      socket.disconnect();
    };
  }, [userId, onNotification]);
};