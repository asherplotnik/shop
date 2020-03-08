import React from "react";
import classes from "./ItemsElement.module.css";
import { NavLink } from "react-router-dom";

const ItemsElement = props => {
  return (
    <NavLink className={classes.NavElement} to={props.link} exact={props.exact}>
      <div className={classes.ItemsElement}>
        <img className={classes.Image} src={props.img} alt={props.img} />
        <div className={classes.Desc}>
          <div className={classes.InnerDesc}>{props.desc}</div>
        </div>
      </div>
      <div className={classes.Txt}>{props.name}</div>
      <div className={classes.Txt}>{props.price} BHT</div>
    </NavLink>
  );
};

export default ItemsElement;
