import { useState } from 'react'
import './App.css'
import LightTimer from './Components/LightTimer/LightTimer'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <LightTimer/>
        </>
    )
}

export default App
