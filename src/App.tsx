import './App.css'
import { Custom } from './components/custom'
import { Button } from './components/ui/button'
import * as styles from './style'

function App() {
  return (
    <>
      <div className={styles.h1}>
        <Button>Click me</Button>
        <Custom />
        <p className='text-green-300'>Hello from App.tsx</p>
      </div>
    </>
  )
}

export default App
