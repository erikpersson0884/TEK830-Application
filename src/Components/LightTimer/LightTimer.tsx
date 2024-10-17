import React from "react";
import { useTimeContext } from "./Contexts";

const LightTimer = () => {
  let time = useTimeContext();
  let hour: number = time.hour - 1;
  let minute: number = time.minute;

  if (hour > 23 || hour < 0) {
    throw new Error("Invalid hour selected");
  } else if (minute > 59 || minute < 0) {
    throw new Error("Invalid minute selected");
  }
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
