import React, { useState } from "react";
import LightTimer from "../../LightTimer/LightTimer";
import Clock from "../../Clock/Clock";
import LightButtons from "../../LightTimer/LightButtons";
import { DimContext } from "../../LightTimer/Contexts";

export interface Time {
  hour: number;
  minute: number;
}

const ContentPane = () => {
  const [dimTime, setDimTime] = useState<Time>({
    hour: 22,
    minute: 0,
  });

  return (
    <>
      <div className="container text-white h-100">
        <DimContext.Provider value={dimTime}>
          <LightTimer />
          <Clock updateTime={setDimTime} />
          <div className="m-auto row" style={{ height: "25%" }}>
            <LightButtons />
          </div>
        </DimContext.Provider>
      </div>
    </>
  );
};

export default ContentPane;
