import React from "react";
import "./StatusPage.css";
import DevicePane from "./DevicePane/DevicePane";
import { Device } from "../../Classes/Device";
import ContentPane from "./ContentPane/ContentPane";
import { DeviceContext } from "../../Contexts";


const StatusPage: React.FC = () => {


  return (
    <>
      <div className="split right">
          <ContentPane />
        </div>
      <div className="statusPage">
        <DevicePane
          className="split left"
        />
      </div>
    </>
  );
};

export default StatusPage;
