import React from "react";
import "./StatusPage.css";
import DevicePane from "./DevicePane/DevicePane";
import { Device } from "../../Classes/classes";
import ContentPane from "./ContentPane/ContentPane";
import { DeviceContext } from "../../Contexts";


const StatusPage: React.FC = () => {


  return (
    <>
      <div className="statusPage">
        <DevicePane
          className="split left"
        />
        <div className="split right">
          <ContentPane />
        </div>
      </div>
    </>
  );
};

export default StatusPage;
