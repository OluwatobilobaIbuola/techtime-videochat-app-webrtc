import Peer from "simple-peer";
import { Socket } from "socket.io-client";

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

export interface SocketValueContextType {
  callAccepted: boolean;
  callEnded: boolean;
  stream: MediaStream | undefined;
  name: string;
  setName(value: string): void;
  call: Omit<Call, "userToCall" | "userCalling">;
  myVideo: React.RefObject<HTMLVideoElement>;
  userVideo: React.RefObject<HTMLVideoElement>;
  me: string;
  idToCall: string;
  setIdToCall(value: string): void;
  leaveCall(): void;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  setCallAccepted(value: boolean): void;
  peerRef: React.MutableRefObject<Peer.Instance | undefined>;
}
