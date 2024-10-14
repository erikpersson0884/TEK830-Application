import React from "react";
import LightTimer from "../../LightTimer/LightTimer";
import Clock from "../../Clock/Clock";
import LightButtons from "../../LightTimer/LightButtons";

const ContentPane = () => {
  return (
    <>
      <div className="container text-white h-100">
        <LightTimer startHour={19} startMinute={8} />
        <Clock startHour={19} startMinute={8} stopHour={22} stopMinute={20} />
        <div className="m-auto row" style={{ height: "25%" }}>
          <LightButtons />
        </div>
      </div>
    </>
  );
};

export default ContentPane;
