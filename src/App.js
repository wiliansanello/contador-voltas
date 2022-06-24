import { useState, useEffect } from 'react'
import ShowLaps from './ShowLaps'
import ShowTime from './ShowTime'
import Button from './Button'
import './styles.css'

function App() {
  const [lapsNum, setLapsNum] = useState(0)
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let timer = null
    if (running) {
      timer = setInterval(() => {
        setTime(old => old + 1)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [running])

  const toggleRunning = () => {
    setRunning(!running)
  }

  const increment = () => {
    setLapsNum(lapsNum + 1)
  }
  const decrement = () => {
    if (lapsNum > 0) {
      setLapsNum(lapsNum - 1)
    }
  }

  const reset = () => {
    setLapsNum(0)
    setTime(0)
  }

  return (
    < div className="App" >
      <ShowLaps laps={lapsNum} />
      <Button text='+' className='bigger' onClick={increment} />
      <Button text='-' className='bigger' onClick={decrement} />
      {
        lapsNum > 0 &&
        <ShowTime time={Math.round(time / lapsNum)} />
      }
      <br />
      <Button onClick={toggleRunning}
        text={running ? 'Pausar' : 'Iniciar'}
      />
      <Button onClick={reset} text='Reiniciar' />
    </div >
  );
}

export default App;
