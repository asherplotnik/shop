import React from "react";
import classes from "./CollectionsElement.module.css";
import { NavLink } from "react-router-dom";

const CollectionsElement = (props) => {
  let show = classes.NavElement;
  if (props.name === "HIDDEN") {
    show = classes.Hide;
  }
  return (
    <NavLink className={show} to={props.link} exact={props.exact}>
      <div className={classes.CollectionsElement}>
        <div style={{ height: "300px", lineHeight: "300px" }}>
          <img
            className={classes.Image}
            // src={gc  + props.img}
            src={props.image}
            alt={props.image}
          />
        </div>
      </div>
      <div className={classes.Txt}>{props.name}</div>
    </NavLink>
  );
};

export default CollectionsElement;
