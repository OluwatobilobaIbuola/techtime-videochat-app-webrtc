import React, { useContext, useRef } from "react";
import { camera, mic, phone } from "../assets/icons";
import { SocketContext } from "../context/context";

export default function Controls() {
  const cameraRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<HTMLDivElement>(null);
  const { leaveCall, stream } = useContext(SocketContext);
  let toggleCamera = async () => {
    let videoTrack = stream
      ?.getTracks()
      .find((track) => track.kind === "video");

    if (videoTrack?.enabled === true) {
      videoTrack.enabled = false;
      if (cameraRef.current)
        cameraRef.current.style.backgroundColor = "rgb(255, 80, 80)";
    } else if (videoTrack?.enabled === false) {
      videoTrack.enabled = true;
      if (cameraRef.current)
        cameraRef.current.style.backgroundColor = "#004DB3";
    }
  };

  let toggleMic = async () => {
    let audioTrack = stream
      ?.getTracks()
      .find((track) => track.kind === "audio");

    if (audioTrack?.enabled === true) {
      audioTrack.enabled = false;
      if (micRef.current)
        micRef.current.style.backgroundColor = "rgb(255, 80, 80)";
    } else if (audioTrack?.enabled === false) {
      audioTrack.enabled = true;
      if (micRef.current) micRef.current.style.backgroundColor = "#004DB3";
    }
  };
  return (
    <div className="absolute bottom-[20px] left-[50%] -translate-x-[50%] flex gap-4">
      <div
        ref={cameraRef}
        className="camera-btn bg-primary p-[20px] rounded-[50%] flex justify-center items-center cursor-pointer"
        onClick={toggleCamera}
      >
        <img
          src={camera}
          className="w-[20px] h-[20px] ss:w-[30px] ss:h-[30px]"
        />
      </div>

      <div
        ref={micRef}
        className="mic-btn bg-primary p-[20px] rounded-[50%] flex justify-center items-center cursor-pointer"
        onClick={toggleMic}
      >
        <img src={mic} className="w-[20px] h-[20px] ss:w-[30px] ss:h-[30px]" />
      </div>
      <div
        className="bg-red-400 p-[20px] rounded-[50%] flex justify-center items-center cursor-pointer"
        id="leave-btn"
        onClick={leaveCall}
      >
        <img
          src={phone}
          className="w-[20px] h-[20px] ss:w-[30px] ss:h-[30px]"
        />
      </div>
    </div>
  );
}
