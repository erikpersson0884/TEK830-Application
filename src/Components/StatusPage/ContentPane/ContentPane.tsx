import React from "react";
import LightTimer from "../../LightTimer/LightTimer";
import Clock from "../../Clock/Clock";
import LightButtons from "../../LightTimer/LightButtons";

const ContentPane = () => {
  return (
    <>
      <div className="container text-white h-100">
        <LightTimer startHour={22} startMinute={0} />
        <Clock startHour={22} startMinute={0} />
        <div className="m-auto row" style={{ height: "25%" }}>
          <LightButtons />
        </div>
      </div>
    </>
  );
};

export default ContentPane;
