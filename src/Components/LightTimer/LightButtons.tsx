import React from "react";
import Button from "../Button/Button";

const LightButtons = () => {
  return (
    <>
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
    </>
  );
};

const DimLights = () => void {};
const PauseDim = () => void {};

export default LightButtons;
