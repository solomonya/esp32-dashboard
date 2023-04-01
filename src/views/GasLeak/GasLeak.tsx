import { useContext } from "react";
import { Esp32Ctx } from "../../container/esp32/esp32";
import styles from './gasLeak.module.css';
import GasIcon from '../../assets/gas.svg';

const GasLeak = (): React.ReactElement => {
  const { sensorData } = useContext(Esp32Ctx);
  const { gasLeak }  = sensorData;
  return (
    <div className={styles.container}>
      <img className={styles.icon} src={GasIcon} alt="gas icon" />
      <h1 className={styles.title}>
        Утечка газа: {gasLeak} ppm
      </h1>
    </div>
  );
};

export { GasLeak };