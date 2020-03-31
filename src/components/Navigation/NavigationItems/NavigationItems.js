import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem show={true} link="/" exact>
      HOME
    </NavigationItem>
    <NavigationItem show={true} link="/collections" exact>
      COLLECTIONS
    </NavigationItem>
    <NavigationItem show={true} link="/trending" exact>
      TRENDING NOW
    </NavigationItem>
    <NavigationItem show={true} link="/about" exact>
      ABOUT US
    </NavigationItem>
    <NavigationItem show={props.showBackend} link="/backend" exact>
      BACK END
    </NavigationItem>
  </ul>
);

export default navigationItems;
