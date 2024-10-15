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
  const [svg, setSvg] = React.useState(ClockPic(startHour, startMinute));

  const handleClose = () => {
    setOpen(false);
  };

  const setClock = (startHour: number, startMinute: number) => {
    setSvg(ClockPic(startHour, startMinute));
  };

  const timeToNumber = (time: string) => {
    let numbers: string[] = time.split(":");
    let hour: number = Number(numbers[0]);
    let minute: number = Number(numbers[1]);
    return [hour, minute];
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div
      style={{
        height: "50%",
        width: "50%",
        textAlign: "center",
        display: "block",
        margin: "auto",
        marginTop: "10%",
      }}
      className="clock"
    >
      <Button
        styling="btn clock h-100 w-100"
        onClicked={() => {
          handleOpen();
        }}
        children={svg}
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
            onChange={(e) => {
              let value: number[] = timeToNumber(e.target.value);
              setClock(value[0], value[1]);
            }}
            size={10}
          ></input>
        </form>
      </Modal>
    </div>
  );
};

export default ClockPrompt;
