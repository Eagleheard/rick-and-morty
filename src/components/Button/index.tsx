import React from "react";

import "./styles.scss";

interface IButton {
  text: string;
  onClick: () => void;
  style: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

export const Button: React.FC<IButton> = ({
  text,
  onClick,
  style,
  disabled,
  type,
}) => {
  return (
    <button type={type} onClick={onClick} className={style} disabled={disabled}>
      {text}
    </button>
  );
};
