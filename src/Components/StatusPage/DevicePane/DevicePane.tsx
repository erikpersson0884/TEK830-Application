import React from "react";
import "./DevicePane.css"
import { Device, Lamp, Ac, Blinds} from '../../../classes';

interface StatusDevice extends Device {
    status: string;
}

const DevicePane: React.FC<{className: String, devices: Device[], setDevices: React.Dispatch<React.SetStateAction<Device[]>> }> = ({className, devices, setDevices }) => { 
  
    let deviceConverter = [
        {name: "Lights", type: Lamp},
        {name: "Temperature", type: Ac},
        {name: "Blinds", type: Blinds},
    ]
  

    return (
      <div className={`devicePane ${className}`}>
          <ul>
              {deviceConverter.map((deviceType) => (
                <div className="deviceDiv" key={deviceType.name}>
                    <h3>{deviceType.name}</h3>
                    <ul className="deviceList">
                        {devices.filter((device) => device instanceof deviceType.type).map((device) => (

                            device.isIncluded ?(
                                <li 
                                    key={device.name} 
                                    className={`${deviceType.name.toLocaleLowerCase()} device`}  
                                    
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
                                        {device instanceof Blinds ? <p>{device.isOpen ? "Open" : "Closed"}</p> : null}
                                    </div>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </div>
              ))}
          </ul>
      </div>
    );
};

export default DevicePane;