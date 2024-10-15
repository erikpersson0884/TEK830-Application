import React from "react";
import Button from "../Button/Button";
import ClockPic from "./ClockPic";
import "../SettingsPage/SettingsPage.css";
import { useState } from "react";
import ClockPrompt from "./ClockPrompt";
interface Props {
  startHour: number;
  startMinute: number;
}

const Clock = ({ startHour = 0, startMinute = 0 }: Props) => {
  var modal = document.getElementById("clockModal");
  const [show, setShow] = useState(false);

  const handleClose = () => useState(false);
  const handleShow = () => useState(true);
  return (
    <>
      <div
        className="h-60 text-white"
        children={
          <ClockPrompt startHour={startHour} startMinute={startMinute} />
        }
      />
    </>
  );
};

export default Clock;
