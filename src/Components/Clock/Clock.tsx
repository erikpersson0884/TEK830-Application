import React from "react";
import Button from "../Button/Button";
import ClockPic from "./ClockPic";
import "../SettingsPage/SettingsPage.css";
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
      className="h-50 clock text-white"
      children={
        <Button
          styling="btn h-100 w-100"
          onClicked={() => ""}
          children={ClockPic(startHour, startMinute, stopHour, stopMinute)}
        />
      }
    />
  );
};

export default Clock;
