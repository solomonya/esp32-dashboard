import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { WS_SERVER_URL } from './configs';
import { useWebSockets } from './hooks';
import { Motion, RelaySwitcher } from './views';

function App() {
  const [count, setCount] = useState(0);

  const { receivedMsgData, sendMsg } = useWebSockets({ wsUrl: WS_SERVER_URL });

  console.log(receivedMsgData);

  return (
    <div className="App">
      <RelaySwitcher sendMsg={sendMsg} />
      <Motion isMotionDetected={receivedMsgData?.body.isMotionDetected ?? 0} />
    </div>
  )
}

export default App
