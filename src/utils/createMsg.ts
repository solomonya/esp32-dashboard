import { MsgBodyType, MsgToSend } from "../hooks/useWebSockets";

export const createMsg = (bodyType: MsgBodyType, pin: number, value: number): MsgToSend => {
  return ({
    action: 'msg',
    type: 'cmd',
    body: {
      type: bodyType,
      pin,
      value
    }
  });
};