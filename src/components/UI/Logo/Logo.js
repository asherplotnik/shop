import React from "react";
import logoImage from "../../../assets/images/Logo.jpg";
import classes from "./Logo.module.css";
const logo = (props) => (
  <div className={classes.Logo}>
    <img src={logoImage} alt="logo" />
  </div>
);

export default logo;
