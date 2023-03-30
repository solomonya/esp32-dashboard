import styles from './motion.module.css';
import classNames from 'classnames';

const MotionDetected = {
  NOT_MOTION: 'NOT_MOTION',
  MOTION_DETECTED: 'MOTION_DETECTED'
} as const;


interface Props {
  isMotionDetected: 1 | 0;
}

const MotionTitles: Record<keyof typeof MotionDetected, string> = {
  [MotionDetected.MOTION_DETECTED]: 'Обнаружено движение',
  [MotionDetected.NOT_MOTION]: 'Движение отсутствует'
};

const MappedMotionDetected = {
  0: MotionDetected.NOT_MOTION,
  1: MotionDetected.MOTION_DETECTED
} as const;

const Motion = ({ isMotionDetected }: Props): React.ReactElement => {
  const mappedMotionDetected = MappedMotionDetected[isMotionDetected];


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