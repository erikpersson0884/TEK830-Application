import React from "react";
import Button from "../Button/Button";
import ClockPic from "./ClockPic";
interface Props {
  startHour: number;
  startMinute: number;
  stopHour: number;
  stopMinute: number;
}

const Clock = ({
  startHour = 0,
  startMinute = 0,
  stopHour = 0,
  stopMinute = 0,
}: Props) => {
  return (
    <div
      className="p-2 m-3 bg-secondary text-white"
      children={
        <Button
          styling="btn btn-secondary"
          onClicked={() => ""}
          children={ClockPic(startHour, startMinute, stopHour, stopMinute)}
        />
      }
    />
  );
};

export default Clock;
