import React from "react";

const DimmingTimer = (hour: number, minute: number) => {
  if (hour > 23 || hour < 0) {
    throw new Error("Invalid hour selected");
  } else if (minute > 59 || minute < 0) {
    throw new Error("Invalid minute selected");
  }
  let hourTx: string = hour.toString();
  let minuteTx: string;
  if (minute < 10 || minute >= 0) {
    minuteTx = "0" + minute.toString();
  } else {
    minuteTx = minute.toString();
  }
  return (
    <div>
      Dimming starts at {hourTx}:{minuteTx}
    </div>
  );
};

export default DimmingTimer;
