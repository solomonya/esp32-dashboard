import { useContext } from 'react';
import styles from './distanceSensor.module.css'
import { Esp32Ctx } from '../../container/esp32/esp32';

const DistanceSensor = (): React.ReactElement => {
  const { sensorData } = useContext(Esp32Ctx);
  const { distanceSensor } = sensorData;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Датчик расстояния: {distanceSensor}</h1>
    </div>
  );
};

export { DistanceSensor };