import { useContext, useState } from "react";
import { SocketContext } from "../context/context";
import CopyToClipboard from "react-copy-to-clipboard";
import { phone } from "../assets/icons";
import useCallUserHook from "../Hooks/useCallUserHook";
import useAnswerUserHook from "../Hooks/useAnswerUserHook";

export default function Lobby() {
  const { name, callAccepted, setName, call, me, setIdToCall, idToCall } =
    useContext(SocketContext);
  const { callUser } = useCallUserHook();
  const { answerCall } = useAnswerUserHook();
  const [isCopied, setIsCopied] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 z-[999] flex items-center justify-center bg-black">
      <div className="w-full max-w-[400px] flex flex-col gap-2">
        <input
          id="name"
          placeholder="Type name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 rounded-[4px] border border-primary outline-none h-[46px] w-full"
        />
        <div className="relative h-[46px] w-full">
          <input
            className="pl-2 w-full h-full rounded-[4px] overflow-hidden border border-primary outline-none"
            placeholder="Paste ID"
            id="id_number"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />

          <button
            className="bg-primary text-white text-[14px] font-[500] px-2 w-[98px] absolute right-0 top-0 bottom-0"
            onClick={() => {
              setIsCalling(true);
              callUser(idToCall);
            }}
          >
            {idToCall && isCalling ? "Calling" : "Call"}
          </button>
        </div>
        <CopyToClipboard text={me}>
          <button
            onClick={() => setIsCopied(true)}
            className="bg-primary h-[46px]  rounded-[2px] text-white text-[14px] font-[500] px-2 w-full "
          >
            {isCopied ? "Copied" : "Copy Connection ID"}
          </button>
        </CopyToClipboard>
      </div>
      {call.isReceivingCall && !callAccepted ? (
        <div
          className="absolute py-4 px-8 rounded-[8px] bg-white text-black right-[20px] flex flex-col items-center
          justify-center gap-8 top-[20px] h-[300px]"
        >
          <h1 className="text-black">{call.name} is calling...</h1>
          <div
            className="bg-[green] p-[20px] rounded-[50%] flex justify-center items-center cursor-pointer"
            id="leave-btn"
          >
            <img
              alt="phone"
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
