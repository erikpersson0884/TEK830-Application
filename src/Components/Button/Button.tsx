import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  styling: string;
  onClicked: () => void;
}

const Button = ({ children, styling = "", onClicked }: Props) => {
  return <button className={styling} onClick={onClicked} children={children} />;
};

export default Button;