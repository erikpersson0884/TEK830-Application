import React from "react";
import "./DevicePane.css"
import { Device, Lamp, Ac, Blinds} from '../../../classes';

const DevicePane: React.FC<{ devices: Device[], setDevices: React.Dispatch<React.SetStateAction<Device[]>> }> = ({ devices, setDevices }) => { 
  
  let deviceConverter = [
    {name: "Lights", type: Lamp},
    {name: "Temperature", type: Ac},
    {name: "Blinds", type: Blinds},
  ]
  

  return (
    <div className="devicePane">
      <ul>
        {deviceConverter.map((deviceType) => (
          <div className="deviceDiv" key={deviceType.name}>
            <h3>{deviceType.name}</h3>
            {devices
              .filter((device) => device instanceof deviceType.type)
              .map((device) => (
          <li key={device.name}>{device.name}</li>
              ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DevicePane;