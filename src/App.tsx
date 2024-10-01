import React from 'react'

import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'

import SettingsPage from './Components/SettingsPage/SettingsPage'
import Header from './Components/Header/Header'
import StatusPage from './Components/StatusPage/StatusPage'
import Footer from './Components/Footer/Footer'

import { useState } from 'react'
import { Device, Lamp, Ac, Blinds  } from './classes'
import initialDevices from './Controllers/IkeaAPI'

function App() {
    const [devices, setDevices] = useState<Device[]>(initialDevices);

    const clockSpeed = 100;
    const [clock, setClock] = useState(new Date("2021-10-10T20:00:00"));


    React.useEffect(() => {
        const intervalId = setInterval(() => {
            
            setClock(prevClock => new Date(prevClock.getTime() + 60000));

        }, clockSpeed);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    handleDevices();

    function handleDevices() {
        let bedTime: string = localStorage.getItem('bedTime') || '22:00';
        
        const [bedHour, bedMinute] = bedTime.split(':').map(Number);
        const bedTimeDate = new Date(clock);
        bedTimeDate.setHours(bedHour, bedMinute, 0, 0);

        const timeUntilBedtime = (bedTimeDate.getTime() - clock.getTime()) / 1000 / 60; // time in minutes

        const bedRoutineStartTime = 2*60; // 2 hours before bedtime
        
        devices.forEach((device) => {
                // if (timeUntilBedtime < bedRoutineStartTime) {
                    if (device instanceof Lamp) {
                        device.brightness = Math.min(100,Math.max(0,Math.round((100/bedRoutineStartTime)*timeUntilBedtime)))
                    }
                     if (device instanceof Ac && device.temperature > 18) {
                        //device.temperature =
                    }
                // }
        });
    }



    return (
        <>
            <BrowserRouter basename='/TEK830-Application/'> 
                <Header />
                {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                <Routes>

                    <Route path="/" element={
                        <StatusPage devices={devices} setDevices={setDevices} />
                    } />

                    <Route path="/settings" element={
                        <SettingsPage devices={devices} setDevices={setDevices} />
                    } />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
