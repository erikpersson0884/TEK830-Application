import React, { useState, useEffect } from "react";
import './SettingsPage.css';
import { Device } from '../../Classes/Device';
import { DeviceContext, SleepCycleTimesContext } from "../../Contexts";
import { Time } from "../../Classes/Time";

const SettingsPage: React.FC = () => {

    const sleepCycle = React.useContext(SleepCycleTimesContext);
    const devices = React.useContext(DeviceContext);

    const [bedTime, setBedTime] = useState<Time>(sleepCycle.bedTime);
    const [wakeTime, setWakeTime] = useState<Time>(sleepCycle.wakeTime);

    useEffect(() => {
        canelSleepGoalsChange();
    }, [sleepCycle.bedTime, sleepCycle.wakeTime]);

    const handleBedTimeChange = (event) => {
        const newTime = new Time(event.target.value);
        setBedTime(newTime);
    };

    const handleWakeTimeChange = (event) => {
        const newTime = new Time(event.target.value);
        setWakeTime(newTime);
    };

    const canelSleepGoalsChange = () => {
        setBedTime(sleepCycle.bedTime);
        setWakeTime(sleepCycle.wakeTime);
    }

    const saveSleepCycle = () => {
        sleepCycle.setBedTime(bedTime);
        sleepCycle.setWakeTime(wakeTime);
    }


    const toggleDeviceInclusion = (event, device: Device) => {
        device.isIncluded = event.target.checked;
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
                    <label htmlFor="wakeUpGoals">I want to wake up at: </label>
                    <input 
                        type="time" 
                        id="wakeUpGoals" 
                        name="wakeUpGoals" 
                        value={wakeTime.asString()} 
                        onChange={handleWakeTimeChange} 
                    />
                </div>

                <div className="goal">
                    <label htmlFor="sleepGoals">I want to go to sleep at: </label>
                    <input 
                        type="time" 
                        id="sleepGoals" 
                        name="sleepGoals" 
                        value={bedTime.asString()} 
                        onChange={handleBedTimeChange} 
                    />
                </div>

                {(bedTime !== sleepCycle.bedTime ||  wakeTime !== sleepCycle.wakeTime) &&
                    <div className="actionButtons">
                        <button className="saveButton" onClick={saveSleepCycle}>Save</button>
                        <button className="saveButton" onClick={canelSleepGoalsChange}>Canel</button>
                    </div>
                }
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
