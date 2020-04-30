import React from "react";
import classes from "./Logo.module.css";
const logo = (props) => (
  <div className={classes.Logo}>
    <img src={process.env.PUBLIC_URL + "static/images/Logo.jpg"} alt="logo" />
  </div>
);

export default logo;
