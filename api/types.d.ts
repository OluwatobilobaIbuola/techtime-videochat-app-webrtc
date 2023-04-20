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
