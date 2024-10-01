import React from "react";
import Button from "../Button/Button";
import "../StatusPage/StatusPage.css";

const LightButtons = () => {
  return (
    <>
      <div className="col">
        <div className="text-center w-20 h-80">
          <Button
            styling="btn w-100 h-100 buttonText"
            onClicked={DimLights}
            children={<p className="buttonText">Start now</p>}
          />
        </div>
      </div>
      <div className="col">
        <div className="text-center w-20 h-80">
          <Button
            styling="btn w-100 h-100 buttonText"
            onClicked={PauseDim}
            children={<p className="buttonText">Pause</p>}
          />
        </div>
      </div>
    </>
  );
};

const DimLights = () => void {};
const PauseDim = () => void {};

export default LightButtons;
