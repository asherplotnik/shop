import React from "react";
import classes from "./ItemsElement.module.css";
import { NavLink } from "react-router-dom";

const ItemsElement = (props) => {
  let appear = classes.NavElement;
  if (!props.show) {
    appear = classes.Hide;
  }
  if (props.search === "") {
    if (props.keyP < props.start || props.keyP > props.end) {
      appear = classes.Hide;
    }
  }
  return (
    <NavLink className={appear} to={props.link} exact={props.exact}>
      <div className={classes.ItemsElement}>
        <div className={classes.Front}>
          <div style={{ height: "300px", lineHeight: "300px" }}>
            <img className={classes.Image1} src={props.img} alt={props.img} />
          </div>
          <div className={classes.TextWrap}>
            <div className={classes.Txt1}>{props.name}</div>
            <div className={classes.Txt2}>{props.price} ฿</div>
          </div>
        </div>
        <div className={classes.Desc}>
          <div style={{ height: "3001x", lineHeight: "300px" }}>
            <img className={classes.Image2} src={props.img2} alt={props.img2} />
          </div>
          <div className={classes.TextWrap}>
            <div className={classes.Txt1}>{props.name}</div>
            <div className={classes.Txt2}>{props.price} ฿</div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ItemsElement;
