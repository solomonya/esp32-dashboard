import { useCallback, useEffect, useRef, useState } from "react";
import { MsgType } from "../container/esp32/model";

interface Props {
  wsUrl: string;
};

export type MsgBodyType = "digitalRead" | "digitalWrite" | "pinMode";

interface ReceivedMsgData {
  action: "msg", 
  body: {
   gasLeak: number;
   hum: number;
   isMotionDetected: 0 | 1;
   temp: number;
  },
  type: MsgType
}

export interface MsgToSend {
  action: "msg";
  type: "cmd";
  body: {
    type: MsgBodyType;
    pin: number;
    value?: number;
  }
}



const useWebSockets = ({ wsUrl }: Props) => {
  const wsRef = useRef<null | WebSocket>(null);
  const [msg, setMsg] = useState<null | ReceivedMsgData>(null);
  const [messagesToSent, setMessagesToSent] = useState<string[]>([]);
  const [readyState, setReadyState] = useState<boolean>(false);

  const onMsgReceived = (event: MessageEvent<string>) => {
    const receivedData = JSON.parse(event.data) as ReceivedMsgData;
      setMsg(receivedData);
  };

  const sendMsg = useCallback((msg: MsgToSend) => {
    const stringifiedMsg = JSON.stringify(msg);
    setMessagesToSent((msgs) => [...msgs, stringifiedMsg]);
  }, []);

  useEffect(() => {
    let ws: WebSocket;
    
    if(!wsRef.current) {
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      ws.onopen = () => setReadyState(true);
      ws?.addEventListener("message", onMsgReceived);
    }

    return () => {
      if(readyState) ws.close();
    };
  }, []);

  useEffect(() => {
    if(readyState && messagesToSent.length > 0) {
      messagesToSent.forEach(msg => {
        wsRef.current?.send(msg);
      });
      setMessagesToSent([]);
    }
  }, [readyState, messagesToSent.length])

  return { msg, sendMsg };
};

export { useWebSockets };
