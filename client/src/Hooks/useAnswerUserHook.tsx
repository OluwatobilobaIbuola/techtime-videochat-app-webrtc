import { SocketContext } from "../context/context";
import { useContext } from "react";
import Peer from "simple-peer";

export default function useAnswerUserHook() {
  const { peerRef, stream, socket, me, setCallAccepted, userVideo, call } =
    useContext(SocketContext);
  const answerCall = () => {
    peerRef.current = new Peer({
      initiator: false,
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
    peerRef.current.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        userCalling: call.from,
        from: me,
      });
    });
    peerRef.current.signal(call.signal);
    peerRef.current.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });
    setCallAccepted(true);
  };
  return { answerCall };
}
