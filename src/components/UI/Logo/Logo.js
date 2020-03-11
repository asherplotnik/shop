import React from "react";
import Logo from "../../../assets/images/Logo.jpg";
import classes from "./Logo.module.css";
const logo = props => (
  <div className={classes.Logo}>
    <img src={Logo} alt="logo" />
  </div>
);

export default logo;
