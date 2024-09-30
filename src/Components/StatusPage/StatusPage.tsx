import React from "react";
import "./StatusPage.css";
import DevicePane from "./DevicePane/DevicePane";
import { Device } from "../../classes";
import ContentPane from "./ContentPane/ContentPane";

const StatusPage: React.FC<{
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}> = ({ devices, setDevices }) => {
  return (
    <div className="statusPage">
      <div className="split left">
        <DevicePane devices={devices} setDevices={setDevices} />
      </div>
      <ContentPane />
    </div>
  );
};

export default StatusPage;
