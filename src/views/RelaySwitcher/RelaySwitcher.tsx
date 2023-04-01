import { useContext, useState } from "react";
import { createMsg } from "../../utils/createMsg";
import styles from './relaySwitcher.module.css';
import { Esp32Ctx } from "../../container/esp32/esp32";


const pins = [
  { title: "Реле 1", pin: 18 },
  { title: "Реле 2", pin: 19 },
  { title: "Реле 3", pin: 22 }
];


const RelaySwitcher = (): React.ReactElement => {
  const [selectedPin, setSelectedPin] = useState<number>(18);
  const [pinValue, setPinValue] = useState(false);
  const { sendMsg } = useContext(Esp32Ctx); 

  const onSelectPin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pin = parseFloat(event.target.value);
    setSelectedPin(pin);
    setPinValue(false);
  }

  const onToggleRelay = () => {
    const newPinValue = !pinValue;
    const value = newPinValue ? 1 : 0;
    setPinValue(newPinValue);
    sendMsg(createMsg("digitalWrite", selectedPin, value));
  }

  return (
    <div>
        <h4 className={styles.title}>Управление Реле, Состояние: {pinValue ? "Включено" : "Выключено"}</h4>
        <div className={styles.container}>
          <select onChange={onSelectPin} className={styles.select}>
            {
              pins.map((pin) => (
                <option 
                  className={styles.option}
                  key={pin.pin} 
                  value={pin.pin} 
                >
                    {pin.title}
                </option>
              ))
            }
          </select>
          <input 
            type="checkbox" 
            checked={pinValue} 
            className={styles.checkbox} 
            onChange={onToggleRelay} 
            id={"switch"}
          />
          <label className={styles.label} htmlFor="switch" />
      </div>
    </div>
  );
};

export {
  RelaySwitcher
};