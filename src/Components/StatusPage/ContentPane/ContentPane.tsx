import React from "react";
import LightTimer from "../../LightTimer/LightTimer";
import Clock from "../../Clock/Clock";
import LightButtons from "../../LightTimer/LightButtons";

const ContentPane = () => {
  return (
    <>
      <div className="container p-3 mb-2">
        <div className="m-3 p-2 container col bg-black text-white">
          <LightTimer startHour={19} startMinute={8} />
          <Clock startHour={19} startMinute={8} stopMinute={20} stopHour={22} />
          <LightButtons />
        </div>
      </div>
    </>
  );
};

export default ContentPane;
