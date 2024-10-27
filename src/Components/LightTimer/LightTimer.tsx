import React from "react";
import { TimeContext, SleepCycleTimesContext } from "../../Contexts";
import { Time } from "../../Classes/Time";

const LightTimer = () => {
    let time = React.useContext(TimeContext);
    let sleepCycle = React.useContext(SleepCycleTimesContext);




    let display: "timeToWakeDim" | "timeToBedDim" | "dimming";
    if (
        time.asDouble() > sleepCycle.wakeTime.asDouble() - sleepCycle.wakeDimmingTimeLength.asDouble() && 
        time.asDouble() < sleepCycle.wakeTime.asDouble() ||
        time.asDouble() > sleepCycle.bedTime.asDouble() - sleepCycle.bedDimmingTimeLength.asDouble() && 
        time.asDouble() < sleepCycle.bedTime.asDouble()
    ) display = "dimming";
    else if (
        time.asDouble() < (sleepCycle.wakeTime.asDouble() - sleepCycle.wakeDimmingTimeLength.asDouble()) ||
        time.asDouble() > sleepCycle.bedTime.asDouble()
    ) display = "timeToWakeDim"; 
    else display = "timeToBedDim";

    let dimmingStartNumber: number;

    if (display === "timeToWakeDim") {
        dimmingStartNumber = sleepCycle.wakeTime.asDouble() - sleepCycle.wakeDimmingTimeLength.asDouble();
    } else {
        dimmingStartNumber = sleepCycle.bedTime.asDouble() - sleepCycle.bedDimmingTimeLength.asDouble();
    } 

    const dimmingStartTime = new Time(dimmingStartNumber);

    return (
        <>
            <h1
                className="h-20 text-white text-center m-auto"
                children={
                  display === "dimming"? 
                    <div>
                        Routine on until {time.asDouble() < sleepCycle.wakeTime.asDouble() ? sleepCycle.wakeTime.asString() : sleepCycle.bedTime.asString()}
                    </div>
                  :
                    <div>
                        Sleep routine starts at {dimmingStartTime.asString()}
                    </div>
                }
            ></h1>
        </>
    );
};

export default LightTimer;
