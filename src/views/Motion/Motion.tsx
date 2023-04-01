import { useContext } from 'react';
import styles from './motion.module.css';
import classNames from 'classnames';
import { Esp32Ctx } from '../../container/esp32/esp32';

const MotionDetected = {
  NOT_MOTION: 'NOT_MOTION',
  MOTION_DETECTED: 'MOTION_DETECTED'
} as const;

type MotionDetectedKey = keyof typeof MotionDetected;

const MotionTitles: Record<MotionDetectedKey, string> = {
  [MotionDetected.MOTION_DETECTED]: 'Обнаружено движение',
  [MotionDetected.NOT_MOTION]: 'Движение отсутствует'
};

const MappedMotionDetected: Record<number, MotionDetectedKey> = {
  0: MotionDetected.NOT_MOTION,
  1: MotionDetected.MOTION_DETECTED
} as const;

const Motion = (): React.ReactElement => {
  const { sensorData } = useContext(Esp32Ctx);
  const mappedMotionDetected = MappedMotionDetected[sensorData.isMotionDetected];


  return (
    <div className={classNames({
      [styles.card]: true,
      [styles.detected]: mappedMotionDetected === MotionDetected.MOTION_DETECTED,
      [styles.notDetected]: mappedMotionDetected === MotionDetected.NOT_MOTION
    })}>
      <h1 className={styles.title}>
        {MotionTitles[mappedMotionDetected]}
      </h1>
    </div>
  );
  
};

export { Motion };