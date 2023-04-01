import { useContext } from 'react';
import styles from './distanceSensor.module.css'
import { Esp32Ctx } from '../../container/esp32/esp32';
import DistanceIcon from '../../assets/distance.svg';

const DistanceSensor = (): React.ReactElement => {
  const { sensorData } = useContext(Esp32Ctx);
  const { distanceSensorValue } = sensorData;

  return (
    <div className={styles.container}>
      <img src={DistanceIcon} alt="distance icon" className={styles.icon} />
      <h1 className={styles.title}>Датчик расстояния: {distanceSensorValue} мм.</h1>
    </div>
  );
};

export { DistanceSensor };