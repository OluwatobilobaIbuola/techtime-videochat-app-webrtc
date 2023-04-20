import React, { createContext, useState, useRef, useEffect } from "react";
import {
  Call,
  ClientToServerEvents,
  ServerToClientEvents,
  SocketValueContextType,
} from "../types";
import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";
import { BASE_URL } from "../services/apiUrls";

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
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [name, setName] = useState("");
  const [call, setCall] = useState({} as Omit<Call, "userToCall">);
  const [me, setMe] = useState("");
  const [idToCall, setIdToCall] = useState("");

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", ({ signal, from, name: callerName }) => {
      setCall({
        isReceivingCall: true,
        from,
        name: callerName,
        signal,
      });
    });
  }, []);
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream!,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: stream! });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signal: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) connectionRef.current.destroy();
    // window.location.reload();
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
        callUser,
        leaveCall,
        answerCall,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};