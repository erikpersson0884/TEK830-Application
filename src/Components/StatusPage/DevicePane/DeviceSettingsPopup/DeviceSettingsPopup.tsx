import React from "react";

import "./deviceSettingsPopup.css";

import { Device, Lamp, Ac } from "../../../../classes";


interface DeviceSettingsPopupProps {
    device: Device;
    closePopup: () => void;
}

const DeviceSettingsPopup: React.FC<DeviceSettingsPopupProps> = ({ device, closePopup }) => {
    const initialSliderValue = 
        (device instanceof Lamp) ? (device as Lamp).brightness : 
        (device instanceof Ac) ? (device as Ac).temperature : 0;

    const [sliderValue, setSliderValue] = React.useState<number>(initialSliderValue);

    if (device instanceof Lamp) {
        React.useEffect(() => {
            if (device.followsSchedule) setSliderValue(device.brightness);
        }, [device.followsSchedule, device.brightness]);

    } else if (device instanceof Ac) {
        React.useEffect(() => {
            if (device.followsSchedule) setSliderValue(device.temperature);
        }), [device.followsSchedule, device.temperature];
    }


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

            {device instanceof Lamp ?
                <div className="option">
                    <p>Brightness:</p>

                    <div className="inputDiv">
                        <div className="colorIndicator"></div>
                            <input 
                                className="slider"
                                type="range" 
                                min="0" 
                                max="100" 
                                value={sliderValue} 
                                onChange={(e) => handleSlierChange(e)} 
                            />
                        <div className="colorIndicator" style={{backgroundColor: device.color}} onClick={() => document.getElementById(`lampInput-${device.id}`)?.click()}></div>
                        <input id={`lampInput-${device.id}`} className="lampColorInput" type="color" onChange={(e) => (device as Lamp).setColor(e.target.value)} />
                    </div>
                </div>
            
            :

            device instanceof Ac ? 
                <div className="option">
                    <p>Brightness:</p>

                    <div className="inputDiv">
                        <p>{device.minTemperature}°C</p>
                        <input 
                            className="slider"
                            type="range" 
                            min={device.minTemperature}
                            max={device.maxTemperature}
                            value={sliderValue} 
                            onChange={(e) => handleSlierChange(e)} 
                        />
                        <p>{device.maxTemperature}°C</p>
                    </div>
                </div>
                : 
                null

            }


            <div style={{width: "100%"}}>
                 
            <button 
                onClick={() => device.toggleFollowsSchedule()} 
                style={{ float: device.followsSchedule ? "left" : "right" }}
            >
                {device.followsSchedule ? "Unfollow Schedule" : "Follow Schedule" }
            </button>
            </div>

        </div>
    );
};

export default DeviceSettingsPopup;