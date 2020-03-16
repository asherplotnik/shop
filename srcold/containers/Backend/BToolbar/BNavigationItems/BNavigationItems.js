import React from "react";
import classes from "./BNavigationItems.module.css";
import NavigationItem from "../../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem";
const bNavigationItems = props => (
  <ul className={classes.BNavigationItems}>
    <NavigationItem link="/backend" exact>
      HOME
    </NavigationItem>
    <NavigationItem link="/backend/collections" exact>
      COLLECTIONS
    </NavigationItem>
    <NavigationItem link="/backend/items" exact>
      ITEMS
    </NavigationItem>
    <NavigationItem link="/backend/stock" exact>
      STOCK
    </NavigationItem>
    <NavigationItem link="/backend/users" exact>
      USERS
    </NavigationItem>
  </ul>
);

export default bNavigationItems;
