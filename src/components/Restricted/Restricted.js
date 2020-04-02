import React from "react";
import { Redirect } from "react-router-dom";
const restricted = () => {
  return (
    <React.Fragment>
      <h1 style={{ color: "teal", fontFamily: "arial" }}>RESTRICTED</h1>;
      <Redirect to="/" />
    </React.Fragment>
  );
};

export default restricted;
