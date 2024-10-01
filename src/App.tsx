import React from 'react'

import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'

import SettingsPage from './Components/SettingsPage/SettingsPage'
import Header from './Components/Header/Header'
import StatusPage from './Components/StatusPage/StatusPage'

import { useState } from 'react'
import { Device, Lamp, Ac, Blinds  } from './classes'
import initialDevices from './Controllers/IkeaAPI'
import "bootstrap/dist/css/bootstrap.css";

function App() {
    const [devices, setDevices] = useState<Device[]>(initialDevices);

    const clockSpeed = 100;
    const [clock, setClock] = useState(new Date("2021-10-10T04:00:00"));


    React.useEffect(() => {
        const intervalId = setInterval(() => {
            
            setClock(prevClock => new Date(prevClock.getTime() + 60000));

        }, clockSpeed);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    handleDevices();

    function handleDevices() {
        let bedTime: string = localStorage.getItem('bedTime') || '22:00';
        let wakeTime: string = localStorage.getItem('wakeUpTime') || '06:00';

        // TIme for bedtime
        const [bedHour, bedMinute] = bedTime.split(':').map(Number);
        const bedTimeDate = new Date(clock);
        bedTimeDate.setHours(bedHour, bedMinute, 0, 0);

        //Time for wake up
        const [wakeHour, wakeMinute] = wakeTime.split(':').map(Number);
        const wakeTimeDate = new Date(clock);
        wakeTimeDate.setHours(wakeHour, wakeMinute, 0, 0);

        const timeUntilBedtime = (bedTimeDate.getTime() - clock.getTime()) / 1000 / 60; // time in minutes

        const bedRoutineTime = 2*60; // 2 hours before bedtime
        const wakeRoutineTime = 60; // 1 hours for lights to brighten
        
        devices.forEach((device) => {
            
            // Bedtime routine
            if (device instanceof Lamp) {
                let newBrightness = 0;
                
                console.log((clock.getTime() - wakeTimeDate.getTime())/1000/60, wakeRoutineTime);

                if (bedTimeDate.getHours() - bedRoutineTime <= clock.getHours() && clock.getHours() <= bedTimeDate.getHours()) {
                    newBrightness = clampAndRoundBrightness((100/bedRoutineTime)*timeUntilBedtime);
                } else if (wakeTimeDate.getHours() - wakeRoutineTime <= clock.getHours() && clock.getHours() <= wakeTimeDate.getHours()) {
                    newBrightness = clampAndRoundBrightness((100/wakeRoutineTime)*((clock.getTime() - wakeTimeDate.getTime())/1000/60 + wakeRoutineTime));
                }

                device.setBrightness(newBrightness);
            }
            if (device instanceof Ac && device.temperature > 18) {
                // const newTemperature = Math.max(18,Math.round((18/bedRoutineTime)*timeUntilBedtime));

                // device.setTemperature(newTemperature);
            }
            if (device instanceof Blinds && timeUntilBedtime < 30) {
                device.closeBlinds();
            }

            // Morning routine
 


        });
    }


    function clampAndRoundBrightness(brightness: number) {
        return Math.round(Math.min(100, Math.max(0, brightness)));
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

export default App;
