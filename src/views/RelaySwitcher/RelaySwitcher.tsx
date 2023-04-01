import { useContext, useEffect, useState } from "react";
import styles from './relaySwitcher.module.css';
import { Esp32Ctx } from "../../container/esp32/esp32";
import classNames from "classnames";
import { pins } from "../../container/esp32/model";


const RelaySwitcher = (): React.ReactElement => {
  const { pinState, onUpdatePin } = useContext(Esp32Ctx); 
  const [selectedPin, setSelectedPin] = useState<number>(18);
  
  const pinValue = pinState[selectedPin] > 0;
  
  const onSelectPin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pin = parseFloat(event.target.value);
    setSelectedPin(pin);
  }

  const onToggleRelay = () => {
    const newPinValue = !pinValue;
    const value = newPinValue ? 1 : 0;
    onUpdatePin({ pin: selectedPin, value });
  }

  const pinValueClassName = classNames({
    [styles.title_on]: pinValue,
    [styles.title_off]: !pinValue,
  });



  return (
    <div className={styles.widget}>
        <h4 className={styles.title}>Управление Реле</h4>
        <h4 className={classNames([styles.title, styles.title_bold])}>
          Состояние: <span className={pinValueClassName}>{pinValue ? "Включено" : "Выключено"}</span>
        </h4>
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