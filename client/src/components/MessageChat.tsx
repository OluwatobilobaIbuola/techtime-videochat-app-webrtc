import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import { SocketContext } from "../context/context";
interface Messages {
  fromSelf: boolean;
  message: string;
}
export default function MessageChat() {
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

  return (
    <div className="h-full flex items-center bg-black">
      <div className="px-4 gap-[16px] grid grid-rows-[75%_15%] flex-[25%] h-[80%]">
        <div
          className="px-4 bg-slate-300 rounded-[16px] py-8 flex flex-col gap-4 
      overflow-auto chat__container"
        >
          {messages?.map((message) => {
            return (
              <div key={uuidv4()}>
                <div
                  className={`flex items-center ${
                    message?.fromSelf ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message?.fromSelf
                        ? "bg-gray-200"
                        : "bg-gray-600 text-white"
                    } max-w-[60%] break-words py-2 px-4 text-[1rem] rounded-[16px]`}
                  >
                    <p>{message?.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}
