import React, { useState } from "react";
import './SettingsPage.css';
import { Device } from '../../classes';

const SettingsPage: React.FC<{ devices: Device[], setDevices: React.Dispatch<React.SetStateAction<Device[]>> }> = ({ devices, setDevices }) => {

    function toggleDeviceInclusion(event, deviceToToggle: Device) {
        const updatedDevices: Device[] = devices.map(device => 
            device.name === deviceToToggle.name ? { ...device, isIncluded: event.target.checked } : device
        );
        setDevices(updatedDevices);
    };

    let [bedTime, setBedTime] = useState(localStorage.getItem('bedTime')? localStorage.getItem('bedTime') : '22:00');
    const handleBedTimeChange = (event) => {
        setBedTime(event.target.value);
        localStorage.setItem('bedTime', event.target.value);
    };

    let [wakeUpTime, setWakeUpTime] = useState(localStorage.getItem('wakeUpTime')? localStorage.getItem('wakeUpTime') : '06:00');
    const handleWakeUpTimeChange = (event) => {
        setWakeUpTime(event.target.value);
        localStorage.setItem('wakeUpTime', event.target.value);
    };

    const groupedDevices = devices.reduce((acc, device) => {
        if (!acc[device.place]) {
            acc[device.place] = [];
        }
        acc[device.place].push(device);
        return acc;
    }, {});

    return (
        <div className="settingsPage">
            <div className="sleepGoalsDiv">
                <h1>My Sleep Goals</h1>
                <div className="goal">
                    <label htmlFor="sleepGoals">I want to go to sleep at: </label>
                    <input type="time" id="sleepGoals" name="sleepGoals" onChange={handleBedTimeChange} value={bedTime}/>
                </div>

                <div className="goal">
                    <label htmlFor="wakeUpGoals">I want to wake up at: </label>
                    <input type="time" id="wakeUpGoals" name="wakeUpGoals" onChange={handleWakeUpTimeChange} value={wakeUpTime} />
                </div>
            </div>

            <div className="includedDevicesDiv">
                <h1>Included Devices</h1>
                {Object.keys(groupedDevices).map((place) => (
                    <div key={place} className="place">
                        <h2 className="includedDevicesPlaceTitle">{place}</h2>
                        {groupedDevices[place].map((device) => 
                            <div className="device" key={device.name}>
                                <label htmlFor={`device-${device.name}`}>{device.name}</label>
                                <input 
                                    id={`device-${device.name}`}
                                    type="checkbox" 
                                    checked={device.isIncluded} 
                                    onChange={(event) => toggleDeviceInclusion(event, device)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;
