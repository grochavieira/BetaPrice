import React from "react";

import "./styles.scss";

export const CustomButton = ({ name, onAction, classes }) => {
  return <button className={classes}>{name}</button>;
};

export default CustomButton;
