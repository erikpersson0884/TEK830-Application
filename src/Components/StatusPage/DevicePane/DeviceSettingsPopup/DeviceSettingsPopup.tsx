import React from "react";

import "./deviceSettingsPopup.css";

import { Device, Lamp, Ac } from "../../../../classes";


interface DeviceSettingsPopupProps {
    device: Device;
    closePopup: () => void;
}

const DeviceSettingsPopup: React.FC<DeviceSettingsPopupProps> = ({ device, closePopup }) => {
    const initialSliderValue = (device instanceof Lamp) ? (device as Lamp).brightness : 
        (device instanceof Ac) ? (device as Ac).temperature : 0;

    const [sliderValue, setSliderValue] = React.useState<number>(initialSliderValue);

    function handleSlierChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const newBrightness = parseInt(event.target.value);
        setSliderValue(newBrightness);
        console.log(newBrightness);

        if (device instanceof Lamp) (device as Lamp).setBrightness(newBrightness);
        else if (device instanceof Ac) (device as Ac).setTemperature(newBrightness);

        device.setFollowsSchedule(false);
    }

    return (
        <div className="deviceSettingsPopup" onClick={(e) => e.stopPropagation()}>
            <button className="closeButton noButtonFormatting" onClick={closePopup}>
                <img src="close.svg" alt="close" />
            </button>

            <header>
                <img className="deviceImage" src={device instanceof Lamp ? "lightbulb.svg" : device instanceof Ac ? "thermostat.svg" : "blinds.svg"} alt="device" />
                <h2 className="deviceName">{device.name}</h2>
            </header>

            
            {device instanceof Lamp ? <p>Brightness:</p> : 
            device instanceof Ac ? <p>Temperature:</p> : null}
            {device instanceof Lamp || device instanceof Ac ? (
                <input 
                    className="slider"
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderValue} 
                    onChange={(e) => handleSlierChange(e)} 
                />
            ) : null
            }

            {!device.getFollowsSchedule() &&
                <button onClick={() =>  device.toggleFollowsSchedule()}>Follow Schedule</button>
            }
        </div>
    );
};

export default DeviceSettingsPopup;