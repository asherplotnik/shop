import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      HOME
    </NavigationItem>
    <NavigationItem link="/collections" exact>
      COLLECTIONS
    </NavigationItem>
    <NavigationItem link="/trending" exact>
      TRENDING NOW
    </NavigationItem>
    <NavigationItem link="/about" exact>
      ABOUT US
    </NavigationItem>
  </ul>
);

export default navigationItems;
