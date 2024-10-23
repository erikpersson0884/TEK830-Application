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

    const clockSpeed = 10;
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
                
                newBrightness = lightBrightness(clock, bedTimeDate, wakeTimeDate, bedRoutineTime, wakeRoutineTime);

                device.setBrightness(newBrightness);

                if (newBrightness == 0) {
                    device.powerOff();
                } else {
                    device.powerOn();
                }

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


    function lightBrightness(time: Date, bedTime: Date, wakeTime: Date, bedRoutineTime: number, wakeRoutineTime: number) {
    var brightness = 0;
    var t = timeToDouble(time);
    var b = timeToDouble(bedTime);
    var w = timeToDouble(wakeTime);
    var bedRoutineTime_hours = bedRoutineTime / 60;
    var wakeRoutineTime_hours = wakeRoutineTime / 60;

    if (0 <= t && t < 12) {
        brightness = (100 / wakeRoutineTime_hours) * (t - w + wakeRoutineTime_hours);
    } else if (12 <= t && t <= 24) {
        brightness = (100 / bedRoutineTime_hours) * (b - t);
    } 
    
    brightness = clampAndRoundBrightness(brightness);

    return brightness;
    }

    function timeToDouble(time: Date){
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return hours + minutes / 60;
    }

    function clampAndRoundBrightness(brightness: number) {
        return Math.round(Math.min(100, Math.max(0, brightness)));
    }

    return (
        <div className='mobileSize'>
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
        </div>
    )
}

export default App;
