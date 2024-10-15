import { useState } from "react";
import React from "react";
import Button from "../Button/Button";
import Modal from "./Modal";
import ClockPic from "./ClockPic";
interface Props {
  startHour: number;
  startMinute: number;
  stopHour: number;
  stopMinute: number;
}

const ClockPrompt = ({
  startHour,
  startMinute,
  stopHour,
  stopMinute,
}: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const setTime = (
    startHour: number,
    startMinute: number,
    stopHour: number,
    stopMinute: number
  ) => {
    return ClockPic(startHour, startMinute, stopHour, stopMinute);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div
      style={{
        height: "100%",
        textAlign: "center",
        display: "block",
        padding: 30,
        margin: "auto",
      }}
    >
      <Button
        styling="btn h-100 w-100"
        onClicked={() => {
          handleOpen();
        }}
        children={ClockPic(startHour, startMinute, stopHour, stopMinute)}
      />
      <Modal isOpen={open}>
        <div className="modalContainer">
          <img
            className="exitButton"
            src="src\assets\reject.png"
            alt="close"
            onClick={() => {
              handleClose();
            }}
          />
        </div>
        <form style={{ height: "50%", width: "50%", margin: "auto" }}>
          <input
            className="timeInput"
            style={{ fontSize: "150%" }}
            type="time"
            name="timeInput"
            value="22:00"
            size={10}
          ></input>
        </form>
      </Modal>
    </div>
  );
};

export default ClockPrompt;
