import React from 'react';
import { Lamp, Ac, Blinds, Device } from '../../../../classes';
import ShadowBox from '../../../ShadowBox/ShadowBox';
import DeviceSettingsPopup from '../deviceSettingsPopup/deviceSettingsPopup';

interface DeviceProps {
    device: Device;
    deviceType: {
        name: string;
        type: typeof Device;
    };
}

const DeviceDiv: React.FC<DeviceProps> = ({ device, deviceType }) => {

    const [showSettingsPopup, setShowSettingsPopup] = React.useState(false);

    return (
        <>
            <ShadowBox show={showSettingsPopup} setShow={setShowSettingsPopup} >
                <DeviceSettingsPopup device={device} closePopup={() => setShowSettingsPopup(false)} />
            </ShadowBox>

            <li 
                key={device.name} 
                className={`${deviceType.name.toLocaleLowerCase()} device`}  
                onClick={() => setShowSettingsPopup(true)}
            >
                <div 
                    className="deviceImage"
                    style={{
                        ...(device instanceof Lamp ? { backgroundColor: device.color, backgroundImage: "url(lightbulb.svg)"} : {}),
                        ...(device instanceof Ac ? { backgroundImage: "url(thermostat.svg)"} : {}),
                        ...(device instanceof Blinds ? { backgroundImage: "url(blinds.svg)"} : {}),
                    }}
                ></div>
                <div className="deviceInfo">
                    <p>{device.name}</p>
                    <p>{device.getIsPoweredOn() ? "Is On" : "Is Off"}</p>
                    {device instanceof Lamp ? <p>Brightness: {device.brightness}</p> : null}
                    {device instanceof Ac ? <p>Temperature: {device.temperature}°C</p> : null}
                </div>
            </li>
        </>
    )
}

export default DeviceDiv;