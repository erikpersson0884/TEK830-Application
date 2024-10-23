import React from "react";
import { TimeContext, SleepCycleTimesContext } from "../../Contexts";

const LightTimer = () => {
    let time = React.useContext(TimeContext);
    let sleepCycle = React.useContext(SleepCycleTimesContext);


    let hour: number = time.hours < 12? sleepCycle.wakeTime.asDouble() - sleepCycle.wakeDimmingTimeLength.asDouble() : sleepCycle.bedTime.asDouble() - sleepCycle.bedDimmingTimeLength.asDouble();

    let minute: number = time.hours < 12? 
      (sleepCycle.wakeTime.minutes - sleepCycle.wakeDimmingTimeLength.minutes) 
    : 
      (sleepCycle.bedTime.minutes - sleepCycle.bedDimmingTimeLength.minutes);


    let hourTx: string = hour.toString();
    let minuteTx: string;
    if (minute < 10 && minute >= 0) {
      minuteTx = "0" + minute.toString();
    } else {
      minuteTx = minute.toString();
    }

    return (
      <>
        <h1
          className="h-20 text-white text-center m-auto"
          children={
            <div>
              Dimming starts at {hourTx}:{minuteTx}
            </div>
          }
        ></h1>
      </>
    );
};

export default LightTimer;
