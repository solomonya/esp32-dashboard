import { useContext } from 'react';
import styles from './temperature.module.css';
import { Esp32Ctx } from '../../container/esp32/esp32';
import TemperatureIcon from '../../assets/temperature.svg';
import HumidityIcon from '../../assets/humidity.svg';

const Temperature = (): React.ReactElement => {
  const { sensorData } = useContext(Esp32Ctx);
  const { temp, hum } = sensorData;

  return (
    <div className={styles.widget}>
      <div className={styles.container}>
        <img src={TemperatureIcon} alt="temperature icon" className={styles.icon} />
        <h1 className={styles.title}>Температура: {temp}°C</h1>
      </div>
      <div className={styles.container}>
        <img src={HumidityIcon} alt="humidity icon" className={styles.icon} />
        <h1 className={styles.title}>Влажность: {hum}%</h1>
      </div>
    </div>
  );
};


export { Temperature };