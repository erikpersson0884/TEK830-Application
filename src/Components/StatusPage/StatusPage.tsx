import React from "react";
import "./StatusPage.css";
import DevicePane from "./DevicePane/DevicePane";
import { Device } from "../../classes";
import ContentPane from "./ContentPane/ContentPane";
import ClockPrompt from "../Clock/ClockPrompt";

const StatusPage: React.FC<{
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}> = ({ devices, setDevices }) => {
  return (
    <>
      <div className="split right">
          <ContentPane />
        </div>
      <div className="statusPage">
        <DevicePane
          className=""
          devices={devices}
          setDevices={setDevices}
        />
        
      </div>
    </>
  );
};

export default StatusPage;
