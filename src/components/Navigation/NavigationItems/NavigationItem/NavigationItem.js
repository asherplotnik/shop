import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";
const navigationItem = props => (
  <li className={props.show ? classes.NavigationItem : classes.Hide}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
