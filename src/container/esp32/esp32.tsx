import { createContext, useCallback, useEffect, useReducer } from "react";
import { useWebSockets } from "../../hooks";
import { WS_SERVER_URL } from "../../configs";
import { ContextProps, Esp32State, ReducerAction, TypeMsg, pins, MsgToSend, PinData, SensorData } from "./model";
import { createMsg } from "../../utils/createMsg";

const initialState: Esp32State = {
    pinState: {
      18: 0,
      19: 0,
      22: 0
    },
    sensorData: {
      gasLeak: 0,
      hum: 0,
      isMotionDetected: 0,
      temp: 0,
      distanceSensorValue: 0
    },
    onUpdatePin: (newPinData: PinData) => console.log(newPinData)
};

export const Esp32Ctx = createContext<Esp32State>(initialState);


function reducer(state: Esp32State, action: ReducerAction): Esp32State {
    const { type, payload } = action;
    switch(type) {
        case TypeMsg.dataReceived:
            return { ...state, sensorData: payload as SensorData };
        case TypeMsg.pinChange: 
            return { ...state, pinState: { ...state.pinState, [payload.pin]: payload.value } };
        default: 
            return state
    }
}

export const Eps32Provider = ({ children }: ContextProps) => {
    const { msg, sendMsg } = useWebSockets({ wsUrl: WS_SERVER_URL });
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(msg?.type === TypeMsg.dataReceived) {
            dispatch({ type: TypeMsg.dataReceived, payload: msg.body as SensorData })
        }

        if(msg?.type === TypeMsg.output) {
            dispatch({ type: TypeMsg.pinChange, payload: { pin: msg.body.pin, value: msg.body.value } })
        }
    }, [msg]);

    useEffect(() => {
        pins.map(pin => pin.pin).forEach(currentPin => {
            const msg = createMsg("digitalRead", currentPin);
            sendMsg(msg);
        })
    }, [])

    const onUpdatePin = useCallback((newPinData: PinData) => {
        dispatch({ type: TypeMsg.pinChange, payload: { pin: newPinData.pin, value: newPinData.value } });
        sendMsg(createMsg("digitalWrite", newPinData.pin, newPinData.value));
    }, []);


    return (
        <Esp32Ctx.Provider value={{ ...state, onUpdatePin }}>
            { children }
        </Esp32Ctx.Provider>
    );
};