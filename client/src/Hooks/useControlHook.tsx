import { useRef } from "react";
import { useContext } from "react";
import { SocketContext } from "../context/context";

export default function useControlHook() {
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

  return { cameraRef, micRef, toggleCamera, toggleMic, leaveCall };
}
