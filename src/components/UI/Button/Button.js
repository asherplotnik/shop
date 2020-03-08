import React from "react";
import classes from "./Button.module.css";
const button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    <div className={classes.ButtonDiv}>{props.children}</div>
  </button>
);

export default button;
