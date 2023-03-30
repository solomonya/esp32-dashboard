import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  wsUrl: string;
};

export type MsgBodyType = "digitalRead" | "digitalWrite" | "pinMode";

export type MsgType = 'cmd' | 'dataReceived';

export const TypeMsg = {
  CMD: 'cmd',
  DATA_RECEIVED: 'dataReceived'
} as const;

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
    value: number;
  }
}

const useWebSockets = ({ wsUrl }: Props) => {
  const wsRef = useRef<null | WebSocket>(null);
  const [receivedMsgData, setReceivedMsgData] = useState<null | ReceivedMsgData>(null);

  const onMsgReceived = (event: MessageEvent<string>) => {
    const receivedData = JSON.parse(event.data) as ReceivedMsgData;
    if(receivedData.type === TypeMsg.DATA_RECEIVED) {
      setReceivedMsgData(receivedData);
    }
  };

  const sendMsg = useCallback((msg: MsgToSend) => {
    const stringifiedMsg = JSON.stringify(msg);
    wsRef.current?.send(stringifiedMsg);
  }, []);

  useEffect(() => {
    let ws: WebSocket | null = null;
    
    if(!wsRef.current) {
      const ws = new WebSocket(wsUrl);
      ws?.addEventListener("message", onMsgReceived);
      wsRef.current = ws;
    }

    return () => {
      ws?.close();
    };
  }, []);

  return { receivedMsgData, sendMsg };
};

export { useWebSockets };
