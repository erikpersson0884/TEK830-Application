import React from 'react'

import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'

import SettingsPage from './Components/SettingsPage/SettingsPage'
import Header from './Components/Header/Header'
import StatusPage from './Components/StatusPage/StatusPage'

import { Lamp, Ac, Blinds  } from './Classes/Device'
import "bootstrap/dist/css/bootstrap.css";
import { TimeContext, DeviceContext , SleepCycleTimesContext } from './Contexts'


function App() {
    const clock = React.useContext(TimeContext);
    const devices = React.useContext(DeviceContext);
    const sleepCycleTimes = React.useContext(SleepCycleTimesContext);

    handleDevices();

    function handleDevices() {

        const bedTimeDouble: number = sleepCycleTimes.bedTime.asDouble();
        const wakeTimeDouble: number = sleepCycleTimes.wakeTime.asDouble();
        const clockDouble: number = clock.asDouble();
        const bedDimmingTimeDouble = sleepCycleTimes.bedDimmingTimeLength.asDouble();
        const wakeDimmingTimeDouble = sleepCycleTimes.wakeDimmingTimeLength.asDouble();


        const timeUntilBedtime = bedTimeDouble - clockDouble;

        
        devices.forEach((device) => {
            
            // Device controls
            if (device instanceof Lamp) {
                let newBrightness = 0;
                
                newBrightness = lightBrightness(clockDouble, bedTimeDouble, wakeTimeDouble, bedDimmingTimeDouble, wakeDimmingTimeDouble);

                device.setBrightness(newBrightness);

                if (newBrightness == 0) {
                    device.powerOff();
                } else {
                    device.powerOn();
                }

            }
            if (device instanceof Ac) {
                let newTemperature = 0;

                newTemperature = temperatureCalculator(clockDouble, bedTimeDouble, wakeTimeDouble, bedDimmingTimeDouble, wakeDimmingTimeDouble);

                device.setTemperature(newTemperature);

            }
            if (device instanceof Blinds) {
                let bedRutineStart = bedTimeDouble - bedDimmingTimeDouble
                let wakeRutineStart = wakeTimeDouble - wakeDimmingTimeDouble

                if (bedRutineStart - 10 <= clockDouble && clockDouble <= bedRutineStart +10) {
                    device.openBlinds();
                } else if (wakeRutineStart - 10 <= clockDouble && clockDouble <= wakeRutineStart +10) {
                    device.closeBlinds();
                } 
            }

        });
    }


    function lightBrightness(t: number, b: number, w: number, bedRoutine: number, wakeRoutine: number) {
        var brightness = 0;

        if (0 <= t && t < 12) {
            brightness = (100 / wakeRoutine) * (t - w + wakeRoutine);
        } else if (12 <= t && t <= 24) {
            brightness = (100 / bedRoutine) * (b - t);
        } 
        
        brightness = clampAndRound(brightness, 0, 100);

        return brightness;
    }

    function temperatureCalculator(t: number, b: number, w: number, bedRoutine: number, wakeRoutine: number) {
        var temperature = 0;
        // TODO: Temperature settings, will be set to global variables later
        var minTemp = 18;
        var maxTemp = 22;
        var tempDiff = maxTemp - minTemp;
        
        if (0 <= t && t < 12) {
            temperature = minTemp + (tempDiff / wakeRoutine) * (t - w + wakeRoutine);
        } else if (12 <= t && t <= 24) {
            temperature = minTemp + (tempDiff / bedRoutine) * (b - t);
        }

        temperature = clampAndRound(temperature, 18, 22);

        return temperature;
    }

    function clampAndRound(brightness: number, min: number, max: number) {
        return Math.round(Math.min(max, Math.max(min, brightness)));
    }

    return (
            <BrowserRouter basename='/TEK830-Application/'> 
                <Header />
                {clock.asString()}
                <Routes>

                    <Route path="/" element={
                        <StatusPage />
                    } />

                    <Route path="/settings" element={
                        <SettingsPage />
                    } />

                </Routes>
            </BrowserRouter>
    )
}

export default App;
