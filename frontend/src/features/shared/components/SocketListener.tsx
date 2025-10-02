import { useEffect } from "react"
import { socket } from "../../../socket"
import { toast } from "react-toastify"

const SocketListener = () => {

    
    // console.log("socket listener called")
    socket.on("connect", () => console.log("socket connected inside socket lister"));
    socket.on("disconnect", () => console.log("socket disconnected"));
    useEffect(() => {
        
        socket.on("notification", () => {
            console.log("inside on notification")
            toast("new Notification")
        });


        return () => {
            console.log("socket listener returned")
            socket.off("notification");
            socket.off("connect");
            socket.off("disconnect");
        };
    }, [])

    return null
}

export default SocketListener


