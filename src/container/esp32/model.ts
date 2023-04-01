export type MsgBodyType = "digitalRead" | "digitalWrite" | "pinMode";

export const TypeMsg = {
  cmd: 'cmd',
  dataReceived: 'dataReceived',
  pinChange: 'pinChange',
  output: 'output'
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

export interface PinData {
  pin: number;
  value: number;
}

export interface SensorData {
  gasLeak: number;
  hum: number;
  isMotionDetected: number;
  temp: number;
  distanceSensorValue: number;
};

export interface Esp32State {
  pinState: Record<number, number>;
  sensorData: SensorData;
  onUpdatePin: (newPinData: PinData) => void;
}

export const pins = [
  { title: "Реле 1", pin: 18 },
  { title: "Реле 2", pin: 19 },
  { title: "Реле 3", pin: 22 }
];

export interface ContextProps {
  children: React.ReactNode
}
