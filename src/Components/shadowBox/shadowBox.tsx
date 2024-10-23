import React from "react";
import "./shadowBox.css";

interface ShadowBoxProps {
    children: React.ReactNode;
    show?: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShadowBox: React.FC<ShadowBoxProps> = ({ children, show=false, setShow }) => {
    return (
        show &&
        <div className="shadowBox" onClick={(e) => { e.stopPropagation(); setShow(false); }}>
            {children}
        </div>
    );
};

export default ShadowBox;