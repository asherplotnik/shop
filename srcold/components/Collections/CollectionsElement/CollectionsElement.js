import React from "react";
import classes from "./CollectionsElement.module.css";
import { NavLink } from "react-router-dom";

const CollectionsElement = props => {
  return (
    <NavLink className={classes.NavElement} to={props.link} exact={props.exact}>
      <div className={classes.CollectionsElement}>
        <div style={{ height: "300px", lineHeight: "300px" }}>
          <img className={classes.Image} src={props.img} alt={props.img} />
        </div>
      </div>
      <div className={classes.Txt}>{props.name}</div>
    </NavLink>
  );
};

export default CollectionsElement;
