export interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
  userToCall: string;
  userCalling: string;
}
export interface Msg {
  from: string;
  to: string;
  msg: string;
}

type ReceiveMsgString = string;
export interface ServerToClientEvents {
  me: (id: string) => void;
  userConnectionDetails: (
    object: Omit<Call, "userToCall" | "userCalling">
  ) => void;
  receiveMsg: (string: ReceiveMsgString) => void;
  callEnded: () => void;
}

export interface ClientToServerEvents {
  close: () => void;
  answerCall: (
    object: Omit<Call, "isReceivingCall" | "userToCall" | "name">
  ) => void;
  callUser: (object: Omit<Call, "isReceivingCall" | "userCalling">) => void;
  sendMsg: (object: Msg) => void;
}
