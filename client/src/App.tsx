import MessageChat from "./components/MessageChat";
import VideoChat from "./components/VideoChat";
import "./styles/tailwind.css";

export default function App() {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="flex h-screen items-center">
        <VideoChat />
        <MessageChat />
      </div>
    </div>
  );
}
