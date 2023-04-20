import { useContext, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SocketContext } from "../context/context";
import Controls from "./Controls";
import { phone } from "../assests/icons";

export default function VideoChat() {
  const {
    name,
    callAccepted,
    myVideo,
    setName,
    userVideo,
    callEnded,
    stream,
    call,
    callUser,
    answerCall,
    me,
    setIdToCall,
    idToCall,
  } = useContext(SocketContext);

  return (
    <div className="h-full relative flex-[75%]">
      {/* {stream && (
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          className={`${
            callAccepted &&
            "fixed top-[20px] left-[20px] ss:h-[170px] ss:w-[300px] h-[80px] w-[120px] rounded-[5px] border-[2px] border-primary z-[999] shadow-[3px_3px_15px_-1px_rgba(0,0,0,0.77)]"
          } bg-black w-full h-full object-cover`}
        />
      )} */}
      {callAccepted && !callEnded ? (
        <video
          playsInline
          ref={userVideo}
          autoPlay
          className="bg-black w-full h-full object-cover"
        />
      ) : null}

      <Controls />
      {!callAccepted ? (
        <div className="absolute bottom-[20px] left-[20px] ss:max-w-[500px] flex flex-col gap-2">
          <input
            id="name"
            placeholder="Type name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2 w-full rounded-[2px] border border-primary outline-none h-[46px] max-w-full"
          />
          <div className="relative h-[46px] max-w-full">
            <input
              className="pl-2 w-full h-full rounded-[2px] overflow-hidden border border-primary outline-none"
              placeholder="Type ID to call"
              id="id_number"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
            />

            <button
              className="bg-primary text-white text-[14px] font-[500] px-2 max-w-[123px] absolute right-0 top-0 bottom-0"
              onClick={() => callUser(idToCall)}
            >
              Call
            </button>
          </div>

          <CopyToClipboard text={me}>
            <button className="bg-primary rounded-[2px] text-white text-[14px] font-[500] px-2 max-w-full ">
              Copy ID
            </button>
          </CopyToClipboard>
        </div>
      ) : null}
      {call.isReceivingCall && !callAccepted ? (
        <div
          className="absolute py-4 px-8 rounded-[8px] bg-white text-black right-[20px] flex flex-col items-center
           justify-center gap-8 top-[20px] h-[350px]"
        >
          <h1 className="text-black">{call.name} is calling...</h1>
          <div
            className="bg-[green] p-[20px] rounded-[50%] flex justify-center items-center cursor-pointer"
            id="leave-btn"
          >
            <img
              src={phone}
              className="w-[20px] h-[20px] ss:w-[30px] ss:h-[30px]"
              onClick={answerCall}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
