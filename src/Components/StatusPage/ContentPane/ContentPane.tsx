import React from "react";
import LightTimer from "../../LightTimer/LightTimer";
import Clock from "../../Clock/Clock";
import LightButtons from "../../LightTimer/LightButtons";

const ContentPane = () => {
  return (
    <>
      <div className="container pr-0 text-white h-100">
        <LightTimer startHour={19} startMinute={8} />
        <Clock startHour={19} startMinute={8} stopMinute={20} stopHour={22} />
        <div className="h-25 m-auto row ">
          <LightButtons />
        </div>
      </div>
    </>
  );
};

export default ContentPane;
