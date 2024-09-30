import React from "react";
import Clock from "./Clock";
import DimmingTimer from "./DimmingTimer";
import Button from "../Button/Button";

const LightTimer = () => {
  return (
    <>
      <div className="container p-3 mb-2">
        <div className="m-3 p-2 container col bg-black text-white">
          <h1
            className="p-2 m-3 bg-secondary text-white"
            children={DimmingTimer(19, 8)}
          ></h1>
          <div
            className="p-2 m-3 bg-secondary text-white"
            children={
              <Button
                styling="btn btn-secondary"
                onClicked={() => SetTime()}
                children={Clock(19, 8, 22, 20)}
              />
            }
          />
          <div className="p-1 m-3 bg-secondary text-white row">
            <div className="col-sm h-50">
              <Button
                styling="btn btn-secondary"
                onClicked={DimLights}
                children={<h2>Start now</h2>}
              />
            </div>
            <div className="col-sm h-50">
              <Button
                styling="btn btn-secondary align-middle"
                onClicked={PauseDim}
                children={<h2>Pause</h2>}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DimLights = () => void {};
const PauseDim = () => void {};
const SetTime = () => void {};

export default LightTimer;
