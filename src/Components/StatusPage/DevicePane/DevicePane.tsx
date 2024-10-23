import React from "react";
import "./DevicePane.css"
import { Device, Lamp, Ac, Blinds} from '../../../classes';
import DeviceDiv from "./DeviceDiv/DeviceDiv";

interface StatusDevice extends Device {
    status: string;
}

const DevicePane: React.FC<{className: String, devices: Device[], setDevices: React.Dispatch<React.SetStateAction<Device[]>> }> = ({className, devices, setDevices }) => { 
  
    let deviceConverter: {name:string, type: typeof Lamp | typeof Ac | typeof Blinds}[] = [
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
                                <DeviceDiv device={device} deviceType={deviceType} />
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