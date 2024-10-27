import React from "react";
import "../SettingsPage/SettingsPage.css";
import ClockPrompt from "./ClockPrompt";
import { Time } from "../../Classes/Time";


const Clock = () => {
  return (
    <>
      <div
        className="h-60 text-white"
        children={<ClockPrompt />}
      />
    </>
  );
};

export default Clock;
