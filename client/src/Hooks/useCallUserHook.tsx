import { useContext } from "react";
import { SocketContext } from "../context/context";
import Peer from "simple-peer";

export default function useCallUserHook() {
  const { peerRef, stream, socket, me, setCallAccepted, userVideo, name } =
    useContext(SocketContext);

  const callUser = (id: string) => {
    peerRef.current = new Peer({
      initiator: true,
      trickle: false,
      stream: stream!,
      config: {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
            ],
          },
        ],
      },
    });
    if (id === "") return;
    peerRef.current.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signal: data,
        from: me,
        name,
      });
    });
    socket.on("userConnectionDetails", ({ signal }) => {
      if (peerRef.current) peerRef.current.signal(signal);
      setCallAccepted(true);
    });
    peerRef.current.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });
  };
  return { callUser };
}
