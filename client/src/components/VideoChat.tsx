import { useContext } from "react";
import { SocketContext } from "../context/context";
import Controls from "./Controls";

export default function VideoChat() {
  const { callAccepted, myVideo, userVideo, callEnded, stream } =
    useContext(SocketContext);

  return (
    <div className="h-full relative flex-[75%]">
      {stream && (
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          className={`${
            callAccepted &&
            !callEnded &&
            `fixed top-[20px] left-[20px] ss:h-[170px] ss:w-[300px] h-[80px] w-[120px]
             rounded-[5px] border-[2px] border-primary z-[999] shadow-[3px_3px_15px_-1px_rgba(0,0,0,0.77)]`
          } bg-black w-full h-full object-cover`}
        />
      )}
      {callAccepted && !callEnded ? (
        <video
          playsInline
          ref={userVideo}
          autoPlay
          className="bg-black w-full h-full object-cover"
        />
      ) : null}
      <Controls />
    </div>
  );
}
