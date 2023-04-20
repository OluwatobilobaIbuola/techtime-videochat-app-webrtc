export interface Call {
  isConnectingCall: boolean;
  from: string;
  name: string;
  signal: any;
  userToCall: string;
}
export interface Msg {
  from: string;
  to: string;
  msg: string;
}

type ReceiveMsgString = string;

export interface ServerToClientEvents {
  me: (id: string) => void;
  callUser: (object: Omit<Call, "isReceivingCall" | "userToCall">) => void;
  callAccepted: (signal: any) => void;
  receiveMsg: (string: ReceiveMsgString) => void;
  callEnded: () => void;
}

export interface ClientToServerEvents {
  answerCall: (object: { signal: any; to: string }) => void;
  callUser: (object: Omit<Call, "isReceivingCall">) => void;
  sendMsg: (object: Msg) => void;
}
