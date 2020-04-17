import React from "react";
import { Redirect } from "react-router-dom";
import classes from "./Restricted.module.css";
const restricted = () => {
  return (
    <div className={classes.Trans}>
      <h1 style={{ color: "teal", fontFamily: "arial" }}>RESTRICTED</h1>;
      <Redirect to="/" />
    </div>
  );
};

export default restricted;
