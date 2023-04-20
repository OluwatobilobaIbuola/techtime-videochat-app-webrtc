import Lobby from "./components/Lobby";
import MessageChat from "./components/MessageChat";
import VideoChat from "./components/VideoChat";
import { SocketContext } from "./context/context";
import "./styles/tailwind.css";
import { useContext } from "react";

export default function App() {
  const { callAccepted } = useContext(SocketContext);
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
