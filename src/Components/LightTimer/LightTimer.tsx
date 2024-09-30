import React from "react";
import Clock from "../Clock/Clock";
import DimmingTimer from "./DimmingTimer";
import Button from "../Button/Button";
interface Props {
  startHour: number;
  startMinute: number;
}

const LightTimer = ({ startHour, startMinute }: Props) => {
  return (
    <>
      <h1
        className="p-2 m-3 bg-secondary text-white"
        children={DimmingTimer(startHour, startMinute)}
      ></h1>
    </>
  );
};

export default LightTimer;
