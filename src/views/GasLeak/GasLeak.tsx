import { useContext } from "react";
import { Esp32Ctx } from "../../container/esp32/esp32";
import styles from './gasLeak.module.css';

const GasLeak = (): React.ReactElement => {
  const { sensorData } = useContext(Esp32Ctx);
  const { gasLeak }  = sensorData;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Утечка газа: {gasLeak}
      </h1>
    </div>
  );
};

export { GasLeak };