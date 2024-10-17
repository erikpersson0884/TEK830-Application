import React from "react";
import "../SettingsPage/SettingsPage.css";

const ClockPic = (startHour: number, startMinute: number) => {
  let stopHour: number = startHour - 2;
  let stopMinute: number = startMinute;
  let startAngle: number = getAngle(startHour, startMinute);
  let endAngle: number = getAngle(stopHour, stopMinute);
  if (startAngle < 0 && endAngle > 0) {
    endAngle = endAngle - 2 * Math.PI;
  }
  let centerX: number = 32;
  let centerY: number = 32;
  let radius: number = 30;
  return (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="800px"
      height="800px"
      viewBox="0 0 64 64"
      enable-background="new 0 0 64 64"
      xml:space="preserve"
      className="m-auto w-75 h-75"
    >
      <g>
        <circle fill="#231F20" cx={32} cy={32} r={31} />
        <circle fill="#ffffff" cx={32} cy={32} r={27} />
        <path
          fill="#231F20"
          d="M32,0C14.327,0,0,14.327,0,32s14.327,32,32,32s32-14.327,32-32S49.673,0,32,0z M32,62
		C15.431,62,2,48.568,2,32C2,15.431,15.431,2,32,2s30,13.431,30,30C62,48.568,48.569,62,32,62z"
        />
        <circle fill="#231F20" cx="32" cy="32" r="1" />
        <path
          fill="#edf50a"
          fillOpacity={0.5}
          d={[
            "M",
            centerX,
            centerY,
            "L",
            centerX + Math.cos(endAngle) * radius,
            centerY - Math.sin(endAngle) * radius,
            "A",
            radius,
            radius,
            0,
            0,
            1,
            centerX + Math.cos(startAngle) * radius,
            centerY - Math.sin(startAngle) * radius,
            "L",
            centerX,
            centerY,
          ].join(" ")}
        />
        <path
          fill="#231F20"
          d="M36.931,32.688C36.962,32.461,37,32.236,37,32c0-1.631-0.792-3.064-2-3.978V14c0-1.657-1.343-3-3-3
		s-3,1.343-3,3v14.022c-1.208,0.913-2,2.347-2,3.978c0,2.762,2.238,5,5,5c0.235,0,0.461-0.038,0.688-0.069l8.505,8.505
		c1.172,1.172,3.07,1.171,4.242-0.001s1.172-3.07,0-4.242L36.931,32.688z M31,14c0-0.553,0.447-1,1-1s1,0.447,1,1v13.101
		C32.677,27.035,32.343,27,32,27s-0.677,0.035-1,0.101V14z M29,32c0-1.657,1.343-3,3-3s3,1.343,3,3s-1.343,3-3,3S29,33.657,29,32z
		 M44.021,44.021c-0.391,0.392-1.023,0.392-1.414,0.001l-7.853-7.853c0.562-0.372,1.043-0.853,1.415-1.415l7.852,7.853
		C44.411,42.997,44.411,43.63,44.021,44.021z"
        />
      </g>
    </svg>
  );
};

// Takes the time and returns the angle of the hour hand
const getAngle = (hour: number, minute: number) => {
  let hourEffect = (-hour % 12) * 30 + 90;
  let minuteEffect = (-minute % 60) * 0.5;
  return ((hourEffect + minuteEffect) * Math.PI) / 180;
};

export default ClockPic;
