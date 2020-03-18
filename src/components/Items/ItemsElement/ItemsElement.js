import React from "react";
import classes from "./ItemsElement.module.css";
import { NavLink } from "react-router-dom";

const ItemsElement = props => {
  return (
    <NavLink className={classes.NavElement} to={props.link} exact={props.exact}>
      <div className={classes.ItemsElement}>
        <div style={{ height: "300px", lineHeight: "300px" }}>
          <img
            className={classes.Image1}
            src={"http://localhost:9000/images/" + props.img}
            alt={props.img}
          />
        </div>
        <div className={classes.Txt}>{props.name}</div>
        <div className={classes.Txt}>{props.price} BHT</div>
        <div className={classes.Desc}>
          <div style={{ height: "300px", lineHeight: "300px" }}>
            <img
              className={classes.Image2}
              src={"http://localhost:9000/images/" + props.img2}
              alt={props.img2}
            />
          </div>
          <div className={classes.Txt}>{props.name}</div>
          <div className={classes.Txt}>{props.price} BHT</div>
        </div>
      </div>
    </NavLink>
  );
};

export default ItemsElement;
