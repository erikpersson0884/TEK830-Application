import { useState } from "react";
import "../StatusPage/StatusPage.css";
import React from "react";
import Button from "../Button/Button";
import Modal from "./Modal";
import ClockPic from "./ClockPic";
interface Props {
  startHour: number;
  startMinute: number;
}

const ClockPrompt = ({ startHour, startMinute }: Props) => {
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
    return ClockPic(startHour, startMinute);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div
      style={{
        height: "75%",
        width: "75%",
        textAlign: "center",
        display: "block",
        margin: "auto",
      }}
      className="clock"
    >
      <Button
        styling="btn clock h-100 w-100"
        onClicked={() => {
          handleOpen();
        }}
        children={ClockPic(startHour, startMinute)}
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
