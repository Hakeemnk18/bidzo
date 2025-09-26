import { useEffect, useState, createContext, type ReactElement } from "react";
import { socket } from "../socket";
import type { ReactNode } from "react";

interface INotification {
  message: string;
}

interface SocketProviderProps {
  children: ReactNode;
}


export function connectSocket(userId: string) {
  socket.connect();
  socket.emit("join", userId);
}

export function socketDisconnect() {
  socket.off("notification"); 
  socket.disconnect();
}


export const SocketContext = createContext<INotification[]>([]);

export function SocketProvider({ children }: SocketProviderProps) {
  const [notifications, setNotifications] = useState<INotification[]>([
    { message: 'Your plan has been upgraded to Pro.'},

  ]);

  useEffect(() => {
    
    console.log("inside notification use effect")
    socket.on("notification", (data: INotification) => {
      console.log("inside on notification")
      setNotifications((prev) => [...prev, data]);
    });

    
    return () => {
      console.log("return statement excecuted")
      socket.off("notification");
    };
  }, []);

  return (
    <SocketContext.Provider value={notifications}>
      {children}
    </SocketContext.Provider>
  );
}