import React, { createContext, useState, useRef } from "react";
import {
  Call,
  ClientToServerEvents,
  ServerToClientEvents,
  SocketValueContextType,
} from "../types";
import Peer from "simple-peer";
import { BASE_URL } from "../services/apiUrls";
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";

export const SocketContext = createContext({} as SocketValueContextType);

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  BASE_URL!
);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [name, setName] = useState("");
  const [me, setMe] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [call, setCall] = useState(
    {} as Omit<Call, "userToCall" | "userCalling">
  );

  console.log("call", call);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });
    socket.on("me", (id: string) => {
      setMe(id);
    });
    socket.on(
      "userConnectionDetails",
      ({ signal, from, name: callerName, isReceivingCall }) => {
        setCall({
          isReceivingCall: isReceivingCall,
          from,
          name: callerName,
          signal,
        });
      }
    );
    socket.on("callEnded", () => {
      setCallEnded(true);
      setCallAccepted(false);
      setCall({
        isReceivingCall: false,
        from: "",
        name: "",
        signal: "",
      });
      window.location.reload();
    });
    if (peerRef.current) {
      peerRef.current.on("close", () => {
        socket.emit("close");
        setCallAccepted(false);
        setCallEnded(true);
        setCall({
          isReceivingCall: false,
          from: "",
          name: "",
          signal: "",
        });
        window.location.reload();
      });
    }
  }, []);
  const leaveCall = () => {
    socket.emit("close");
    setCallEnded(true);
    setCallAccepted(false);
    setCall({
      isReceivingCall: false,
      from: "",
      name: "",
      signal: "",
    });
    if (peerRef.current) {
      peerRef.current.removeStream(stream!);
    }
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        idToCall,
        setIdToCall,
        leaveCall,
        socket,
        setCallAccepted,
        peerRef,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
