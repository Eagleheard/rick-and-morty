import React from "react";

import { Button } from "../Button";

import "./styles.scss";

export const Header = () => {
  return (
    <header className="header">
      <Button text="Sign In" onClick={() => 1} style="button" />
    </header>
  );
};
