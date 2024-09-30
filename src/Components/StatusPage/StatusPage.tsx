import React from "react";
import "./StatusPage.css";
import DevicePane from "./DevicePane/DevicePane";
import { Device } from '../../classes';


const StatusPage: React.FC<{ devices: Device[], setDevices: React.Dispatch<React.SetStateAction<Device[]>> }> = ({ devices, setDevices }) =>  {
  
  return (
    <div className="statusPage">
      <div className="split left">
        <DevicePane devices={devices} setDevices={setDevices} />
      </div>
      <div className="split right">
        <div className="contentPane">
          fsja
        </div>
      </div>
    </div>
  );
};

export default StatusPage;