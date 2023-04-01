import { createContext, useEffect, useReducer } from "react";
import { useWebSockets } from "../../hooks";
import { WS_SERVER_URL } from "../../configs";
import { ContextProps, Esp32State, ReducerAction, TypeMsg, pins } from "./model";
import { createMsg } from "../../utils/createMsg";

const initialState = {
    pinState: {
      19: 0,
      18: 0,
      22: 0
    },
    sensorData: {
      gasLeak: 0,
      hum: 0,
      isMotionDetected: 0,
      temp: 0,
      distanceSensor: 0
    }
};

export const Esp32Ctx = createContext<Esp32State>(initialState);


function reducer(state: Esp32State, action: ReducerAction): Esp32State {
    const { type, payload } = action;
    switch(type) {
        case 'dataReceived':
            return { ...state, sensorData: payload };
        case 'pinChange': 
            return { ...state, sensorData: { ...state.sensorData, [payload.pin]: payload.value } };
        default: 
            return state
    }
}

export const Eps32Provider = ({ children }: ContextProps) => {
    const { msg, sendMsg } = useWebSockets({ wsUrl: WS_SERVER_URL });
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(msg?.type === TypeMsg.dataReceived) {
            dispatch({ type: TypeMsg.dataReceived, payload: msg.body })
        }

        if(msg?.type === TypeMsg.pinChange) {
            dispatch({ type: TypeMsg.pinChange, payload: { pin: msg.body.pin, value: msg.body.value } })
        }
    }, [msg]);

    useEffect(() => {
        pins.map(pin => pin.pin).forEach(currentPin => {
            const msg = createMsg("digitalRead", currentPin);
            sendMsg(msg);
        })
    }, [])

    return (
        <Esp32Ctx.Provider value={{ ...state, sendMsg }}>
            { children }
        </Esp32Ctx.Provider>
    );
};