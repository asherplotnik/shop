import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { dic } from "../../../assets/helper";
const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem show={true} link="/" exact>
        {dic.home[props.lang]}
      </NavigationItem>
      <NavigationItem show={true} link="/collections">
        {dic.collections[props.lang]}
      </NavigationItem>
      <NavigationItem show={true} link="/trending">
        {dic.trending[props.lang]}
      </NavigationItem>
      <NavigationItem show={true} link="/about">
        {dic.aboutUs[props.lang]}
      </NavigationItem>
      <NavigationItem show={props.showAccount} link="/profile">
        {dic.aboutYou[props.lang]}
      </NavigationItem>
      <NavigationItem
        bStyle={{ backgroundColor: "rgb(235, 232, 232)" }}
        show={props.showBackend}
        link="/backend/home"
        exact
      >
        {dic.backend[props.lang]}
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
