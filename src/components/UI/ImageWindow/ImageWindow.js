import React from "react";
import classes from "./ImageWindow.module.css";
const ImageWindow = (props) => {
  let myClass = classes.Hide;
  if (props.show) {
    myClass = classes.Show;
  }
  return (
    <div className={myClass}>
      <img src={props.image} alt="" />
    </div>
  );
};

export default ImageWindow;
