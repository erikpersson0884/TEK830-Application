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
      <Modal isOpen={open} onClose={handleClose}>
        <h1>Close</h1>
      </Modal>
    </div>
  );
};

export default ClockPrompt;
