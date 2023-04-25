import Lobby from "./components/Lobby";
import MessageChat from "./components/MessageChat";
import VideoChat from "./components/VideoChat";
import { SocketContext } from "./context/context";
import "./styles/tailwind.css";
import { useContext, useEffect } from "react";

export default function App() {
  const { callAccepted, socket } = useContext(SocketContext);
  useEffect(() => {
    const leaveCallListener = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      socket.disconnect();
    };
    window.addEventListener("beforeunload", leaveCallListener);
    return () => {
      window.removeEventListener("beforeunload", leaveCallListener);
    };
  }, []);
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="flex h-screen items-center">
        <VideoChat />
        <MessageChat />
      </div>
      {!callAccepted && <Lobby />}
    </div>
  );
}
