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

export interface SocketValueContextType {
  callAccepted: boolean;
  callEnded: boolean;
  stream: MediaStream | undefined;
  name: string;
  setName(value: string): void;
  call: any;
  myVideo: React.RefObject<HTMLVideoElement>;
  userVideo: React.RefObject<HTMLVideoElement>;
  me: string;
  idToCall: string;
  setIdToCall(value: string): void;
  callUser(id: string): void;
  leaveCall(): void;
  answerCall(): void;
  socket: any;
}
