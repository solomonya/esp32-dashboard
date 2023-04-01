import { Eps32Provider } from './container/esp32/esp32';
import { DistanceSensor, GasLeak, Motion, RelaySwitcher, Temperature } from './views';
import styles from './app.module.css';


function App() {
  return (
    <Eps32Provider>
       <main className={styles.wrapper}>
          <section className={styles.section}>
            <h1 className={styles.title}>ESP32 Дашборд</h1>
            <RelaySwitcher />
            <div className={styles.app}>
              <Motion />
              <Temperature />
              <GasLeak />
              <DistanceSensor />
            </div>
          </section>
       </main>
    </Eps32Provider>
   
  )
}

export default App
