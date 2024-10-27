import { useState } from "react";
import "../StatusPage/StatusPage.css";
import React from "react";
import Button from "../Button/Button";
import Modal from "./Modal";
import ClockPic from "./ClockPic";
import { TimeContext, SleepCycleTimesContext } from "../../Contexts";
import { Time } from "../../Classes/Time";

interface Props {
}

const ClockPrompt = ({  }: Props) => {
  let time = React.useContext(TimeContext);
  let sleepCycle = React.useContext(SleepCycleTimesContext);

  const [open, setOpen] = React.useState(false);
  const [svg, setSvg] = React.useState(ClockPic());

  const handleClose = () => {
    setOpen(false);
  };

  const setClock = () => {
    setSvg(ClockPic());
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
        <h2>When would you like to sleep?</h2>
        <form style={{ height: "50%", width: "70%", margin: "auto", marginTop: "2rem"}}>
          <input
            className="timeInput"
            style={{ fontSize: "150%"  }}
            type="time"
            name="timeInput"
            onChange={(e) => {
              let value: number[] = timeToNumber(e.target.value);
              e.target.setAttribute("value", e.target.value);
              let newTime: Time = new Time(value[0] + ":" + value[1]);
              sleepCycle.bedTime = newTime;
              setClock();
            }}
            size={10}
          ></input>
        </form>
      </Modal>
    </div>
  );
};

export default ClockPrompt;
