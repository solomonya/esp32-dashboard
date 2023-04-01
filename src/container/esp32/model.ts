export type MsgBodyType = "digitalRead" | "digitalWrite" | "pinMode";

export const TypeMsg = {
  cmd: 'cmd',
  dataReceived: 'dataReceived',
  pinChange: 'pinChange'
} as const;

export type MsgType = keyof typeof TypeMsg;

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

export interface ReducerAction {
  type: string;
  payload: Record<string, any>;
}

export interface Esp32State {
  pinState: {
      19: number;
      18: number;
      22: number;
    };
    sensorData: {
      gasLeak: number;
      hum: number;
      isMotionDetected: number;
      temp: number;
      distanceSensor: number;
    };
}

export const pins = [
  { title: "Реле 1", pin: 18 },
  { title: "Реле 2", pin: 19 },
  { title: "Реле 3", pin: 22 }
];

export interface ContextProps {
  children: React.ReactNode
}