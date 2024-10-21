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

        // TODO: These should also be global variables later
        const bedRoutineTime = 2    // 2 hours for lights to dim
        const wakeRoutineTime = 1; // 1 hours for lights to brighten
        
        devices.forEach((device) => {
            
            var timeDouble = timeToDouble(clock);
            var bedTimeDouble = timeToDouble(bedTimeDate);
            var wakeTimeDouble = timeToDouble(wakeTimeDate);

            // Device controls
            if (device instanceof Lamp) {
                let newBrightness = 0;
                
                newBrightness = lightBrightness(timeDouble, bedTimeDouble, wakeTimeDouble, bedRoutineTime, wakeRoutineTime);

                device.setBrightness(newBrightness);

                if (newBrightness == 0) {
                    device.powerOff();
                } else {
                    device.powerOn();
                }

            }
            if (device instanceof Ac) {
                let newTemperature = 0;

                newTemperature = temperatureCalculator(timeDouble, bedTimeDouble, wakeTimeDouble, bedRoutineTime, wakeRoutineTime);

                device.setTemperature(newTemperature);

            }
            if (device instanceof Blinds) {
                let bedRutineStart = bedTimeDouble - bedRoutineTime
                let wakeRutineStart = wakeTimeDouble - wakeRoutineTime

                if (bedRutineStart - 10 <= timeDouble && timeDouble <= bedRutineStart +10) {
                    device.openBlinds();
                } else if (wakeRutineStart - 10 <= timeDouble && timeDouble <= wakeRutineStart +10) {
                    device.closeBlinds();
                } 
            }

        });
    }


    function lightBrightness(t: number, b: number, w: number, bedRoutineTime: number, wakeRoutineTime: number) {
        var brightness = 0;

        if (0 <= t && t < 12) {
            brightness = (100 / wakeRoutineTime) * (t - w + wakeRoutineTime);
        } else if (12 <= t && t <= 24) {
            brightness = (100 / bedRoutineTime) * (b - t);
        } 
        
        brightness = clampAndRound(brightness, 0, 100);

        return brightness;
    }

    function temperatureCalculator(t: number, b: number, w: number, bedRoutineTime: number, wakeRoutineTime: number) {
        var temperature = 0;
        // TODO: Temperature settings, will be set to global variables later
        var minTemp = 18;
        var maxTemp = 22;
        var tempDiff = maxTemp - minTemp;
        
        if (0 <= t && t < 12) {
            temperature = minTemp + (tempDiff / wakeRoutineTime) * (t - w + wakeRoutineTime);
        } else if (12 <= t && t <= 24) {
            temperature = minTemp + (tempDiff / bedRoutineTime) * (b - t);
        }

        temperature = clampAndRound(temperature, 18, 22);

        return temperature;
    }

    function timeToDouble(time: Date){
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return hours + minutes / 60;
    }

    function clampAndRound(brightness: number, min: number, max: number) {
        return Math.round(Math.min(max, Math.max(min, brightness)));
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
