import React, { FormEvent } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }: any) {
  const [msg, setMsg] = React.useState<string>("");
  const sendChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <div className="rounded-[16px] grid items-center grid-cols-[5%_90%] gap-x-4 bg-slate-100 px-2 py-8 sm:py-4">
      <div className="flex items-center">
        <div className="">
          <BsEmojiSmileFill className="text-primary cursor-pointer text-[24px]" />
        </div>
      </div>
      <form
        className="rounded-[32px] px-2 bg-white flex items-center overflow-auto chat__container"
        onSubmit={(event: FormEvent<HTMLFormElement>) => sendChat(event)}
      >
        <textarea
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="flex-1 h-[48px] rounded-[32px] bg-transparent text-black px-4 text-[18px] py-2 focus:outline-none"
        />
        <button type="submit" className="">
          <IoMdSend className="text-[20px] text-primary" />
        </button>
      </form>
    </div>
  );
}
