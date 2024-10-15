import React from "react";
import "../SettingsPage/SettingsPage.css";
import ClockPrompt from "./ClockPrompt";
import { Time } from "../StatusPage/ContentPane/ContentPane";
interface Props {
  updateTime: (time: Time) => void;
}

const Clock = ({ updateTime }: Props) => {
  return (
    <>
      <div
        className="h-60 text-white"
        children={<ClockPrompt updateTime={updateTime} />}
      />
    </>
  );
};

export default Clock;
