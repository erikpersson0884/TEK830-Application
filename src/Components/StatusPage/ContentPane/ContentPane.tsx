import React, { useState } from "react";
import LightTimer from "../../LightTimer/LightTimer";
import Clock from "../../Clock/Clock";
import LightButtons from "../../LightTimer/LightButtons";
import { Time } from "../../../Classes/Time";


const ContentPane = () => {
  const [dimTime, setDimTime] = useState<Time>(new Time("22:00"));

  return (
    <>
      <div className="container text-white h-100">
          <LightTimer />
          <Clock updateTime={setDimTime} />
          <div className="m-auto row" style={{ height: "25%" }}>
            <LightButtons />
          </div>
      </div>
    </>
  );
};

export default ContentPane;
