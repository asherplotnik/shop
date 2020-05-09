import React from "react";
import classes from "./Logo.module.css";
import { gc } from "../../../assets/helper";
const logo = (props) => (
  <div className={classes.Logo}>
    <img src={gc + "Logo.jpg"} alt="logo" />
  </div>
);

export default logo;
