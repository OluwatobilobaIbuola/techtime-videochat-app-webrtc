import React, { createContext, useState, useRef, useEffect } from "react";
import { Call, SocketValueContextType } from "../types";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { BASE_URL } from "../services/apiUrls";

export const SocketContext = createContext({} as SocketValueContextType);

const socket = io(BASE_URL!);
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
    socket.on("close", () => {
      setCallEnded(true);
      setCallAccepted(false);
      setCall({
        isReceivingCall: false,
        from: "",
        name: "",
        signal: "",
      });
      // if (connectionRef.current) connectionRef.current.destroy();
      window.location.reload();
    });
    if (connectionRef.current) {
      connectionRef.current.on("close", () => {
        setCallAccepted(false);
        setCallEnded(true);
        socket.emit("close", { to: call.from });
        setCall({
          isReceivingCall: false,
          from: "",
          name: "",
          signal: "",
        });
        // if (connectionRef.current) connectionRef.current.destroy();
        window.location.reload();
      });
    }
  }, []);
  const answerCall = () => {
    connectionRef.current = new Peer({
      initiator: false,
      trickle: false,
      stream: stream!,
    });
    connectionRef.current.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from, from: me });
    });
    connectionRef.current.signal(call.signal);
    connectionRef.current.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });
    setCallAccepted(true);
  };

  const callUser = (id: string) => {
    connectionRef.current = new Peer({
      initiator: true,
      trickle: false,
      stream: stream!,
    });
    connectionRef.current.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signal: data,
        from: me,
        name,
      });
    });
    socket.on("userConnectionDetails", ({ signal }) => {
      if (connectionRef.current) connectionRef.current.signal(signal);
      setCallAccepted(true);
    });
    connectionRef.current.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });
  };

  const leaveCall = () => {
    if (connectionRef.current) {
      socket.emit("close", { to: call.from });
      setCallEnded(true);
      setCallAccepted(false);
      setCall({
        isReceivingCall: false,
        from: "",
        name: "",
        signal: "",
      });
      window.location.reload();
      // if (connectionRef.current) connectionRef.current.destroy();
    }
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
