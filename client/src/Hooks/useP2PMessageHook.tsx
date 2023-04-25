import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/context";

interface Messages {
  fromSelf: boolean;
  message: string;
}

export default function useP2PMessageHook() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [outGoingMessage, setOutGoingMessage] = useState<Messages | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<Messages | null>(null);
  const { socket, me, call, callAccepted } = useContext(SocketContext);

  const handleSendMsg = async (msg: string) => {
    if (callAccepted) {
      socket.emit("sendMsg", {
        to: call.from,
        from: me,
        msg,
      });
      setOutGoingMessage({ fromSelf: true, message: msg });
    }
  };

  useEffect(() => {
    socket.on("receiveMsg", (msg: string) => {
      setArrivalMessage({ fromSelf: false, message: msg });
    });
  }, [socket]);

  useEffect(() => {
    outGoingMessage && setMessages((prev) => [...prev, outGoingMessage]);
  }, [outGoingMessage]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  return { messages, handleSendMsg };
}
